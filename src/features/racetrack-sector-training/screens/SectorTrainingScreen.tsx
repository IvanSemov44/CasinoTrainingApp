import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Haptics from 'expo-haptics';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import { useSettings } from '@contexts/SettingsContext';
import { RacetrackLayout } from '../../racetrack/components';
import { SectorType, SectorValidationResult, SectorMode, TrainingStats } from '../types';
import { RacetrackSectorStackParamList } from '../navigation';
import {
  validateSectorSelection,
  getRandomWinningNumber,
  getSectorForNumber,
  getSectorDisplayName,
} from '../utils/validation';


const SECTOR_LABELS: Record<SectorMode, string> = {
  voisins:   'Voisins du Zéro',
  tier:      'Tiers du Cylindre',
  orphelins: 'Orphelins',
  zero:      'Jeu Zéro',
  random:    'All Sectors',
};

const SECTOR_COLORS: Record<SectorMode, string> = {
  voisins:   '#3b82f6',
  tier:      '#ef4444',
  orphelins: '#f59e0b',
  zero:      '#8b5cf6',
  random:    '#10b981',
};

type Props = StackScreenProps<RacetrackSectorStackParamList, 'SectorTraining'>;

export default function SectorTrainingScreen({ route }: Props) {
  const { colors } = useTheme();
  const { soundEnabled, hapticEnabled } = useSettings();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const initialMode = route.params?.mode || 'random';
  const [selectedMode] = useState<SectorMode>(initialMode);
  const [currentWinningNumber, setCurrentWinningNumber] = useState<number>(0);
  const [selectedSector, setSelectedSector] = useState<SectorType | null>(null);
  const [result, setResult] = useState<SectorValidationResult | null>(null);
  const [stats, setStats] = useState<TrainingStats>({ correct: 0, total: 0 });

  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // useWindowDimensions updates reactively after the portrait lock fires.
  // Racetrack aspect ratio is height/width ≈ 0.318 (very wide & flat).
  // In portrait mode, rotate racetrack 90° so it's tall and narrow.
  const { width: winW } = useWindowDimensions();
  const portraitW = Math.min(winW, useWindowDimensions().height);
  // When rotated 90°, use portrait width for racetrack
  const racetrackSize = portraitW;

  // Play pleasant game sounds
  const playSoundEffect = useCallback((type: 'success' | 'error') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      if (type === 'success') {
        // Success: pleasant ding sound (two tones)
        const playTone = (freq: number, startTime: number, duration: number) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.2, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
          osc.start(startTime);
          osc.stop(startTime + duration);
        };

        const now = audioContext.currentTime;
        playTone(523, now, 0.1); // C5 (523 Hz)
        playTone(659, now + 0.1, 0.15); // E5 (659 Hz) - pleasant chord
      } else {
        // Error: soft warning buzz
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(300, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.15, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.3);
      }
    } catch {
      // Web Audio API not available
    }
  }, []);

  const generateNewNumber = useCallback(() => {
    let newNumber: number;
    do {
      newNumber = getRandomWinningNumber();
    } while (selectedMode !== 'random' && getSectorForNumber(newNumber) !== selectedMode);

    setCurrentWinningNumber(newNumber);
    setSelectedSector(null);
    setResult(null);
    setShowCorrectFeedback(false);
    setIsProcessing(false);
  }, [selectedMode]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } catch {
        // Screen orientation API not available (e.g., on web browsers)
      }
    };
    lockOrientation();

    return () => {
      const unlockOrientation = async () => {
        try {
          await ScreenOrientation.unlockAsync();
        } catch {
          // Screen orientation API not available
        }
      };
      unlockOrientation();
    };
  }, []);

  useEffect(() => {
    generateNewNumber();
  }, [generateNewNumber]);

  const handleSectorPress = useCallback(async (sector: string) => {
    // Debounce: prevent multiple rapid clicks
    if (isProcessing) return;

    const sectorType = sector as SectorType;
    setSelectedSector(sectorType);
    setIsProcessing(true); // Lock immediately to prevent double-clicks

    const validationResult = validateSectorSelection(currentWinningNumber, sectorType);
    setResult(validationResult);

    setStats(prev => ({
      correct: prev.correct + (validationResult.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    // Haptic and sound feedback
    if (validationResult.isCorrect) {
      if (hapticEnabled) {
        try {
          // Success: strong success pattern
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch {
          // Haptics may not be available
        }
      }

      if (soundEnabled) {
        // Play success sound
        playSoundEffect('success');
      }

      setShowCorrectFeedback(true);
      setIsProcessing(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        generateNewNumber();
      }, 1000);
    } else {
      if (hapticEnabled) {
        try {
          // Wrong: warning pattern (longer vibration)
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        } catch {
          // Haptics may not be available
        }
      }

      if (soundEnabled) {
        // Play error sound
        playSoundEffect('error');
      }
    }
  }, [currentWinningNumber, isProcessing, hapticEnabled, soundEnabled, playSoundEffect, generateNewNumber]);

  const handleNext = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    generateNewNumber();
  };

  const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const modeColor = SECTOR_COLORS[selectedMode];
  const accuracyColor =
    stats.total === 0
      ? colors.text.muted
      : percentage >= 80
      ? colors.status.success
      : percentage >= 60
      ? colors.text.gold
      : colors.status.error;

  const correctSectorName = result ? getSectorDisplayName(result.correctSector) : '';

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, paddingRight: insets.right, flexDirection: 'row' }]}>
      {/* ── Side Bar (Rotated) ── */}
      <View style={[styles.topBar, { transform: [{ rotate: '-90deg' }], position: 'absolute', left: 0, top: '50%', zIndex: 10 }]}>
        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreText}>{stats.correct}/{stats.total}</Text>
          <Text style={styles.scoreLabel}>score</Text>
        </View>
        <View style={styles.targetDisplay}>
          <Text style={styles.targetSmallLabel}>FIND</Text>
          <View style={styles.targetSmallCircle}>
            <Text style={styles.targetSmallNumber}>{currentWinningNumber}</Text>
          </View>
        </View>
      </View>

      {/* ── Racetrack (Hero - Full Screen) ── */}
      <View style={styles.racetrackArea}>
        <RacetrackLayout
          width={racetrackSize}
          onSectionPress={handleSectorPress}
        />
      </View>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
      flexDirection: 'column',
      padding: 0,
      gap: 0,
    },

    // ── Top Bar (Minimal) ──────────────────────────────
    topBar: {
      flexDirection: 'row',
      backgroundColor: colors.background.secondary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
      gap: 12,
    },
    scoreDisplay: {
      alignItems: 'center',
      flex: 0.4,
    },
    scoreText: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.text.gold,
    },
    scoreLabel: {
      fontSize: 10,
      color: colors.text.muted,
      marginTop: 2,
    },
    targetDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flex: 0.6,
    },
    targetSmallLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.text.muted,
      letterSpacing: 1,
    },
    targetSmallCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.text.gold,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border.gold,
    },
    targetSmallNumber: {
      fontSize: 22,
      fontWeight: '900',
      color: colors.background.primary,
    },

    // ── Sidebar (deprecated, kept for compat) ──────────────────────────────
    sidebarContainer: {
      width: 172,
      backgroundColor: colors.background.secondary,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
      overflow: 'hidden',
    },
    sidebarHorizontal: {
      width: '100%',
      height: 0,
      maxHeight: 0,
      display: 'none' as any,
    },
    sidebarContent: {
      padding: 12,
      paddingBottom: 24,
    },
    modeBadge: {
      alignSelf: 'center',
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 20,
      borderWidth: 1,
      marginBottom: 10,
    },
    modeBadgeText: {
      fontSize: 9,
      fontWeight: '700',
      letterSpacing: 0.8,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 6,
      marginBottom: 14,
    },
    statPill: {
      flex: 1,
      backgroundColor: colors.background.primary,
      borderRadius: 10,
      paddingVertical: 7,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.text.gold,
    },
    statLabel: {
      fontSize: 9,
      color: colors.text.muted,
      marginTop: 1,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    // ── Target number ──────────────────────────
    targetSection: {
      alignItems: 'center',
      marginBottom: 12,
    },
    targetLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.text.muted,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    targetCircle: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: colors.text.gold,
      borderWidth: 3,
      borderColor: colors.border.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    targetNumber: {
      fontSize: 34,
      fontWeight: '900',
      color: colors.background.primary,
    },

    // ── Instruction ────────────────────────────
    instruction: {
      fontSize: 12,
      color: colors.text.secondary,
      textAlign: 'center',
      marginBottom: 10,
      lineHeight: 17,
    },
    instructionAccent: {
      fontWeight: '700',
      color: colors.text.gold,
    },

    // ── Feedback card ──────────────────────────
    feedbackCard: {
      borderRadius: 10,
      padding: 10,
      borderWidth: 1.5,
    },
    feedbackOk: {
      backgroundColor: colors.status.successAlt,
      borderColor: colors.status.success,
    },
    feedbackErr: {
      backgroundColor: colors.status.errorAlt,
      borderColor: colors.status.error,
    },
    feedbackTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 2,
    },
    feedbackBody: {
      fontSize: 11,
      color: colors.text.secondary,
    },

    spacer: { flex: 1 },

    // ── Next / Skip button ─────────────────────
    nextBtn: {
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border.primary,
      backgroundColor: colors.background.primary,
    },
    nextBtnReady: {
      backgroundColor: colors.text.gold,
      borderColor: colors.text.gold,
    },
    nextBtnText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.secondary,
    },
    nextBtnTextReady: {
      color: colors.background.primary,
    },

    // ── Racetrack ──────────────────────────────
    racetrackArea: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ rotate: '90deg' }],
    },
  });
}

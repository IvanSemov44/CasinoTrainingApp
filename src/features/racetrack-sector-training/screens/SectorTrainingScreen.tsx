import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Haptics from 'expo-haptics';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import { useSettings } from '@contexts/SettingsContext';
import { RacetrackLayout } from '../../racetrack/components';
import { SectorType, SectorMode, TrainingStats } from '../types';
import { RacetrackSectorStackParamList } from '../navigation';
import {
  validateSectorSelection,
  getRandomWinningNumber,
  getSectorForNumber,
} from '../utils/validation';

type Props = StackScreenProps<RacetrackSectorStackParamList, 'SectorTraining'>;

export default function SectorTrainingScreen({ route }: Props) {
  const { colors } = useTheme();
  const { soundEnabled, hapticEnabled } = useSettings();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const initialMode = route.params?.mode || 'random';
  const [selectedMode] = useState<SectorMode>(initialMode);
  const [currentWinningNumber, setCurrentWinningNumber] = useState<number>(0);
  const [stats, setStats] = useState<TrainingStats>({ correct: 0, total: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { width: winW, height: winH } = useWindowDimensions();
  const racetrackSize = Math.min(winW, winH);

  const playSoundEffect = useCallback((type: 'success' | 'error') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (type === 'success') {
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
        playTone(523, now, 0.1);        // C5
        playTone(659, now + 0.1, 0.15); // E5
      } else {
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
        // Screen orientation API not available
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
    if (isProcessing) return;
    setIsProcessing(true);

    const validationResult = validateSectorSelection(currentWinningNumber, sector as SectorType);

    setStats(prev => ({
      correct: prev.correct + (validationResult.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (validationResult.isCorrect) {
      if (hapticEnabled) {
        try { await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); } catch { /* not available */ }
      }
      if (soundEnabled) playSoundEffect('success');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => generateNewNumber(), 1000);
    } else {
      if (hapticEnabled) {
        try { await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); } catch { /* not available */ }
      }
      if (soundEnabled) playSoundEffect('error');
      setIsProcessing(false);
    }
  }, [currentWinningNumber, isProcessing, hapticEnabled, soundEnabled, playSoundEffect, generateNewNumber]);

  const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const accuracyColor =
    stats.total === 0      ? colors.text.muted
    : percentage >= 80     ? colors.status.success
    : percentage >= 60     ? colors.text.gold
    :                        colors.status.error;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, paddingRight: insets.right }]}>
      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreText}>{stats.correct}/{stats.total}</Text>
          <Text style={[styles.scoreLabel, { color: accuracyColor }]}>{percentage}%</Text>
        </View>
        <View style={styles.targetDisplay}>
          <Text style={styles.targetSmallLabel}>FIND</Text>
          <View style={styles.targetSmallCircle}>
            <Text style={styles.targetSmallNumber}>{currentWinningNumber}</Text>
          </View>
        </View>
      </View>

      {/* ── Racetrack ── */}
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
    },

    // ── Top Bar ──────────────────────────────
    topBar: {
      flexDirection: 'row',
      backgroundColor: colors.background.secondary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    scoreDisplay: {
      alignItems: 'center',
      gap: 2,
    },
    scoreText: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.text.gold,
    },
    scoreLabel: {
      fontSize: 11,
      fontWeight: '600',
      marginTop: 1,
    },
    targetDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    targetSmallLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.text.muted,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    targetSmallCircle: {
      width: 54,
      height: 54,
      borderRadius: 27,
      backgroundColor: colors.text.gold,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border.gold,
    },
    targetSmallNumber: {
      fontSize: 24,
      fontWeight: '900',
      color: colors.background.primary,
    },

    // ── Racetrack ────────────────────────────
    racetrackArea: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ rotate: '90deg' }],
    },
  });
}

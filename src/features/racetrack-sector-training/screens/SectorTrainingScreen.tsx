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

function playTone(ctx: AudioContext, freq: number, startTime: number, duration: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.2, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

export default function SectorTrainingScreen({ route }: Props) {
  const { colors } = useTheme();
  const { soundEnabled, hapticEnabled } = useSettings();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const selectedMode: SectorMode = route.params?.mode ?? 'random';
  const [currentWinningNumber, setCurrentWinningNumber] = useState<number>(0);
  const [stats, setStats] = useState<TrainingStats>({ correct: 0, total: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { height: winH } = useWindowDimensions();
  const racetrackSize = winH - insets.top - insets.bottom - 56 - 40;

  const playSoundEffect = useCallback((type: 'success' | 'error') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;
      if (type === 'success') {
        playTone(ctx, 523, now, 0.1);
        playTone(ctx, 659, now + 0.1, 0.15);
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch { /* Web Audio API not available */ }
  }, []);

  const generateNewNumber = useCallback(() => {
    let n: number;
    do { n = getRandomWinningNumber(); }
    while (selectedMode !== 'random' && getSectorForNumber(n) !== selectedMode);
    setCurrentWinningNumber(n);
    setIsProcessing(false);
  }, [selectedMode]);

  useEffect(() => {
    generateNewNumber();
  }, [generateNewNumber]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT).catch(() => { /* not available */ });
    return () => { ScreenOrientation.unlockAsync().catch(() => { /* not available */ }); };
  }, []);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const handleSectorPress = useCallback(async (sector: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const { isCorrect } = validateSectorSelection(currentWinningNumber, sector as SectorType);
    setStats(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));

    if (isCorrect) {
      if (hapticEnabled) { try { await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); } catch { /* not available */ } }
      if (soundEnabled) playSoundEffect('success');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => generateNewNumber(), 1000);
    } else {
      if (hapticEnabled) { try { await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); } catch { /* not available */ } }
      if (soundEnabled) playSoundEffect('error');
      setIsProcessing(false);
    }
  }, [currentWinningNumber, isProcessing, hapticEnabled, soundEnabled, playSoundEffect, generateNewNumber]);

  const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const accuracyColor =
    stats.total === 0  ? colors.text.muted
    : percentage >= 80 ? colors.status.success
    : percentage >= 60 ? colors.text.gold
    :                    colors.status.error;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, paddingRight: insets.right }]}>
      <View style={styles.racetrackArea}>
        <RacetrackLayout width={racetrackSize} onSectionPress={handleSectorPress} />
      </View>

      <View style={styles.topBar}>
        <View style={styles.scoreDisplay}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreText}>{stats.correct}/{stats.total}</Text>
            <Text style={[styles.scoreLabel, { color: accuracyColor }]}>{percentage}%</Text>
          </View>
          <View style={styles.accuracyBarBg}>
            <View style={[styles.accuracyBar, { width: `${percentage}%`, backgroundColor: accuracyColor }]} />
          </View>
        </View>
        <View style={styles.targetDisplay}>
          <View style={styles.targetSmallCircle}>
            <Text style={styles.targetSmallNumber}>{currentWinningNumber}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    topBar: {
      flexDirection: 'column',
      backgroundColor: colors.background.secondary,
      paddingHorizontal: 6,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 12,
      borderLeftWidth: 1.5,
      borderLeftColor: colors.border.gold,
      width: 54,
    },
    scoreDisplay: {
      alignItems: 'center',
      gap: 4,
      flexDirection: 'column',
      transform: [{ rotate: '90deg' }],
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    scoreRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    scoreText: {
      fontSize: 14,
      fontWeight: '900',
      color: colors.text.gold,
      letterSpacing: 0.3,
    },
    scoreLabel: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.3,
    },
    accuracyBarBg: {
      width: 60,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: colors.background.tertiary,
      overflow: 'hidden',
    },
    accuracyBar: {
      height: 3,
      borderRadius: 1.5,
    },
    targetDisplay: {
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ rotate: '90deg' }],
    },
    targetSmallLabel: {
      fontSize: 6,
      fontWeight: '700',
      color: colors.text.muted,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    targetSmallCircle: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.text.gold,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2.5,
      borderColor: colors.border.gold,
      shadowColor: colors.text.gold,
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 4,
    },
    targetSmallNumber: {
      fontSize: 16,
      fontWeight: '900',
      color: colors.background.primary,
    },
    racetrackArea: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ rotate: '90deg' }],
    },
  });
}

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@contexts/ThemeContext';
import { useSettings } from '@contexts/SettingsContext';
import { RacetrackLayout } from '../../../racetrack/components';
import { SectorType, SectorMode, TrainingStats } from '../../types';
import {
  validateSectorSelection,
  getRandomWinningNumber,
  getSectorForNumber,
} from '../../utils/validation';
import { SectorTrainingHeader } from '../../components/SectorTrainingHeader';
import type { SectorTrainingScreenProps } from './SectorTrainingScreen.types';

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

export default function SectorTrainingScreen({ route }: SectorTrainingScreenProps) {
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
      const windowWithAudio = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
      const AudioContextClass = windowWithAudio.AudioContext || windowWithAudio.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
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
    stats.total === 0 ? colors.text.muted
    : percentage >= 80 ? colors.status.success
    : percentage >= 60 ? colors.text.gold
    :                     colors.status.error;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, paddingRight: insets.right }]}>
      <View style={styles.racetrackArea}>
        <RacetrackLayout width={racetrackSize} onSectionPress={handleSectorPress} />
      </View>
      <SectorTrainingHeader
        correct={stats.correct}
        total={stats.total}
        percentage={percentage}
        accuracyColor={accuracyColor}
        currentWinningNumber={currentWinningNumber}
      />
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
    racetrackArea: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ rotate: '90deg' }],
    },
  });
}

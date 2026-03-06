import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useTheme } from '@contexts/ThemeContext';
import { RacetrackLayout } from '../../../racetrack/components';
import { PositionValidationResult, PositionMode, TrainingStats } from '../../types';
import {
  validatePositionSelection,
  getRandomWinningNumber,
  getWheelPosition,
} from '../../utils/validation';
import type { PositionTrainingScreenProps } from './PositionTrainingScreen.types';
import { PositionTrainingSidebar } from '../../components/PositionTrainingSidebar';

export default function PositionTrainingScreen({ route }: PositionTrainingScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const initialMode: PositionMode = route.params?.mode || 'random';
  const [currentWinningNumber, setCurrentWinningNumber] = useState<number>(0);
  const [, setSelectedNumber] = useState<number | null>(null);
  const [result, setResult] = useState<PositionValidationResult | null>(null);
  const [stats, setStats] = useState<TrainingStats>({ correct: 0, total: 0 });

  const [, setShowCorrectFeedback] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // useWindowDimensions updates reactively after the landscape lock fires.
  // Math.max/min ensures we always work in landscape terms regardless of
  // which orientation the component first rendered in.
  const { width: winW, height: winH } = useWindowDimensions();
  const landscapeW = Math.max(winW, winH);
  // Racetrack aspect ratio is height/width = 280/880 ≈ 0.318 (very wide & flat).
  // Use full available width after sidebar; height will be ~31% of that, always fits.
  const SIDEBAR_TOTAL = 208; // sidebar(172) + gap(12) + left+right padding(24)
  const racetrackSize = landscapeW - SIDEBAR_TOTAL - 8;

  const generateNewNumber = useCallback(() => {
    const newNumber = getRandomWinningNumber();
    setCurrentWinningNumber(newNumber);
    setSelectedNumber(null);
    setResult(null);
    setShowCorrectFeedback(false);
    setIsProcessing(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
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
  }, [generateNewNumber, initialMode]);

  const handleNumberPress = (numberStr: string) => {
    if (isProcessing) return;

    const tappedNumber = parseInt(numberStr, 10);
    setSelectedNumber(tappedNumber);

    const validationResult = validatePositionSelection(currentWinningNumber, tappedNumber);
    setResult(validationResult);

    setStats(prev => ({
      correct: prev.correct + (validationResult.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (validationResult.isCorrect) {
      setShowCorrectFeedback(true);
      setIsProcessing(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        generateNewNumber();
      }, 1000);
    }
  };

  const handleNext = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    generateNewNumber();
  };

  const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const wheelPosition = getWheelPosition(currentWinningNumber);
  const accuracyColor =
    stats.total === 0
      ? colors.text.muted
      : percentage >= 80
      ? colors.status.success
      : percentage >= 60
      ? colors.text.gold
      : colors.status.error;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, paddingRight: insets.right }]}>
      <PositionTrainingSidebar
        stats={stats}
        currentWinningNumber={currentWinningNumber}
        result={result}
        isProcessing={isProcessing}
        wheelPosition={wheelPosition}
        accuracyColor={accuracyColor}
        percentage={percentage}
        onSkip={handleNext}
      />

      <View style={styles.racetrackArea}>
        <RacetrackLayout
          width={racetrackSize}
          onNumberPress={handleNumberPress}
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
      flexDirection: 'row',
      padding: 12,
      gap: 12,
    },
    racetrackArea: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
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

const MODE_LABELS: Record<PositionMode, string> = {
  single: 'SINGLE',
  random: 'RANDOM',
};

export default function PositionTrainingScreen({ route }: PositionTrainingScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const initialMode = route.params?.mode || 'random';
  const [selectedMode] = useState<PositionMode>(initialMode);
  const [currentWinningNumber, setCurrentWinningNumber] = useState<number>(0);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [result, setResult] = useState<PositionValidationResult | null>(null);
  const [stats, setStats] = useState<TrainingStats>({ correct: 0, total: 0 });

  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
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
  }, [generateNewNumber]);

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
      {/* ── Left Sidebar HUD ── */}
      <View style={styles.sidebarContainer}>
        <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false} scrollEventThrottle={16}>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <Text style={styles.statValue}>{stats.correct}/{stats.total}</Text>
            <Text style={styles.statLabel}>score</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={[styles.statValue, { color: accuracyColor }]}>{percentage}%</Text>
            <Text style={styles.statLabel}>accuracy</Text>
          </View>
        </View>

        {/* Target number */}
        <View style={styles.targetSection}>
          <Text style={styles.targetLabel}>FIND NUMBER</Text>
          <View style={styles.targetCircle}>
            <Text style={styles.targetNumber}>{currentWinningNumber}</Text>
          </View>
        </View>

        {/* Instruction */}
        <Text style={styles.instruction}>
          Tap <Text style={styles.instructionAccent}>{currentWinningNumber}</Text> on the racetrack
        </Text>

        {/* Feedback card */}
        {result && (
          <View style={[styles.feedbackCard, result.isCorrect ? styles.feedbackOk : styles.feedbackErr]}>
            <Text style={styles.feedbackTitle}>
              {result.isCorrect ? '✓  Correct!' : '✗  Try again'}
            </Text>
            <Text style={styles.feedbackBody}>
              {result.isCorrect
                ? `Found at position ${wheelPosition + 1}`
                : `That was ${result.userNumber}`}
            </Text>
          </View>
        )}

        <View style={styles.spacer} />

        {/* Skip button - only show when not processing */}
        {!isProcessing && (
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.nextBtnText}>
              Skip  ›
            </Text>
          </TouchableOpacity>
        )}

        </ScrollView>
      </View>

      {/* ── Racetrack ── */}
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
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
      flexDirection: 'row',
      padding: 12,
      gap: 12,
    },

    // ── Sidebar ──────────────────────────────
    sidebarContainer: {
      width: 172,
      backgroundColor: colors.background.secondary,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
      overflow: 'hidden',
    },
    sidebarContent: {
      padding: 12,
      paddingBottom: 24,
    },
    modeBadge: {
      alignSelf: 'center',
      paddingHorizontal: 12,
      paddingVertical: 3,
      borderRadius: 20,
      borderWidth: 1,
      marginBottom: 10,
    },
    modeBadgeText: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 1.2,
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
      letterSpacing: 1.5,
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
      marginBottom: 5,
    },
    targetNumber: {
      fontSize: 34,
      fontWeight: '900',
      color: colors.background.primary,
    },
    targetHint: {
      fontSize: 11,
      color: colors.text.muted,
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
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  /* eslint-enable react-native/no-unused-styles */
}

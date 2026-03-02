import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import PokerTable from '../components/PokerTable';
import PotCalculationInput from '../components/PotCalculationInput';
import ActionLog from '../components/ActionLog';
import { generateHand } from '../utils/handGenerator';
import { DIFFICULTY_INFO } from '../constants/gameScenarios';
import type { PLOStackParamList } from '../navigation';
import type { GeneratedHand } from '../types';
import { getRandomElement } from '@utils/randomUtils';

const BLIND_LEVELS = [2, 5, 10] as const;
const DEALING_DURATION_MS = 1200;

type Phase = 'asking' | 'feedback' | 'dealing';
type PLOGameTrainingScreenProps = StackScreenProps<PLOStackParamList, 'PLOGameTraining'>;

function freshHand(difficulty: Parameters<typeof generateHand>[0]): GeneratedHand {
  return generateHand(difficulty, getRandomElement([...BLIND_LEVELS]));
}

/** Points earned for the Nth correct answer in a row: 1, 2, 4, 8, … */
function streakMultiplier(streakAfterAnswer: number): number {
  return Math.pow(2, streakAfterAnswer - 1);
}

export default function PLOGameTrainingScreen({ route }: PLOGameTrainingScreenProps) {
  const { difficulty } = route.params;
  const difficultyInfo = DIFFICULTY_INFO[difficulty];

  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [hand, setHand] = useState<GeneratedHand>(() => freshHand(difficulty));
  const [handKey, setHandKey] = useState(0);
  const [momentIndex, setMomentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('asking');
  const [userAnswer, setUserAnswer] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [streak, setStreak] = useState(0);

  const dealingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase === 'dealing') {
      dealingTimer.current = setTimeout(() => {
        setHand(freshHand(difficulty));
        setMomentIndex(0);
        setHandKey(k => k + 1);
        setUserAnswer(0);
        setPhase('asking');
      }, DEALING_DURATION_MS);
    }
    return () => { if (dealingTimer.current) clearTimeout(dealingTimer.current); };
  }, [phase, difficulty]);

  const moment = hand.askMoments[momentIndex];

  const handleCheck = useCallback(() => {
    const correct = userAnswer === moment.correctAnswer;
    setIsCorrect(correct);
    setSessionTotal(t => t + 1);
    if (correct) {
      const newStreak = streak + 1;
      const earned = streakMultiplier(newStreak);
      setStreak(newStreak);
      setSessionCorrect(c => c + 1);
      setSessionPoints(p => p + earned);
    } else {
      setStreak(0);
    }
    setPhase('feedback');
  }, [userAnswer, moment.correctAnswer, streak]);

  const handleContinue = useCallback(() => {
    const hasNext = momentIndex + 1 < hand.askMoments.length;
    if (hasNext) {
      setMomentIndex(i => i + 1);
      setUserAnswer(0);
      setPhase('asking');
    } else {
      setPhase('dealing');
    }
  }, [momentIndex, hand.askMoments.length]);

  const isLastMoment = momentIndex + 1 >= hand.askMoments.length;
  const headerContext = `$${hand.blindLevel}/$${hand.blindLevel} · ${moment.street.toUpperCase()}`;
  const accuracy = sessionTotal > 0
    ? Math.round((sessionCorrect / sessionTotal) * 100) : null;

  // Points earned on the last correct answer (computable from current streak)
  const lastEarned = isCorrect ? streakMultiplier(streak) : 0;
  // Multiplier for the NEXT correct answer
  const upcomingMultiplier = Math.pow(2, streak);

  // ── Dealing overlay ─────────────────────────────────────────────────────────
  if (phase === 'dealing') {
    return (
      <View style={styles.dealingContainer}>
        <Text style={styles.dealingIcon}>🃏</Text>
        <Text style={styles.dealingText}>Dealing new hand...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.contextBadge}>
          <Text style={styles.difficultyIcon}>{difficultyInfo.icon}</Text>
          <Text style={styles.contextText}>{headerContext}</Text>
        </View>
        <View style={styles.rightBadges}>
          {streak >= 1 && (
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 ×{upcomingMultiplier}</Text>
            </View>
          )}
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>{sessionPoints} pts</Text>
            {accuracy !== null && (
              <Text style={styles.accuracyText}>{sessionCorrect}/{sessionTotal} · {accuracy}%</Text>
            )}
          </View>
        </View>
      </View>

      {/* Poker table */}
      <View style={styles.tableWrapper}>
        <PokerTable
          players={moment.players}
          potAmount={moment.centerPot}
          communityCards={moment.communityCards}
        />
      </View>

      {/* Action log */}
      <ActionLog
        lines={moment.actionLog}
        requesterName={moment.requesterName}
      />

      {/* Input or feedback */}
      {phase === 'asking' ? (
        <>
          <PotCalculationInput
            key={`${handKey}-${momentIndex}`}
            onSubmit={setUserAnswer}
            disabled={false}
          />
          <TouchableOpacity
            style={[styles.checkButton, userAnswer === 0 && styles.disabledButton]}
            onPress={handleCheck}
            disabled={userAnswer === 0}
          >
            <Text style={styles.checkButtonText}>Check Answer</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={[styles.resultCard, isCorrect ? styles.correctCard : styles.incorrectCard]}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </Text>
              {isCorrect && (
                <Text style={styles.earnedPoints}>+{lastEarned} pt{lastEarned !== 1 ? 's' : ''}</Text>
              )}
            </View>

            <View style={styles.answerRow}>
              <Text style={styles.answerLabel}>Your answer:</Text>
              <Text style={styles.answerValue}>${userAnswer}</Text>
            </View>

            {!isCorrect && (
              <View style={styles.answerRow}>
                <Text style={styles.answerLabel}>Correct answer:</Text>
                <Text style={[styles.answerValue, styles.correctHighlight]}>
                  ${moment.correctAnswer}
                </Text>
              </View>
            )}

            <View style={styles.explanationBox}>
              <Text style={styles.explanationText}>{moment.explanation}</Text>
            </View>

            {isCorrect && streak >= 2 && (
              <Text style={styles.streakNote}>
                🔥 {streak} in a row! Next correct = ×{upcomingMultiplier}
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>
              {isLastMoment
                ? 'New Hand →'
                : `Continue  (${momentIndex + 1}/${hand.askMoments.length})`}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    dealingContainer: {
      flex: 1,
      backgroundColor: colors.background.primary,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
    },
    dealingIcon: { fontSize: 56 },
    dealingText: {
      color: colors.text.gold,
      fontSize: 22,
      fontWeight: '700',
      letterSpacing: 1,
    },

    container: { flex: 1, backgroundColor: colors.background.primary },
    content: { padding: 24 },

    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    contextBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.secondary,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
    },
    difficultyIcon: { fontSize: 16, marginRight: 6 },
    contextText: { color: colors.text.primary, fontSize: 13, fontWeight: '600' },

    rightBadges: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    streakBadge: {
      backgroundColor: '#2a1800',
      borderRadius: 16,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#FF6B00',
    },
    streakText: { fontSize: 15, fontWeight: '800', color: '#FF6B00' },

    scoreBadge: { alignItems: 'flex-end' },
    scoreText: { color: colors.text.gold, fontSize: 18, fontWeight: '700' },
    accuracyText: { color: colors.text.secondary, fontSize: 11 },

    tableWrapper: { marginBottom: 16 },

    checkButton: {
      backgroundColor: colors.status.success,
      borderRadius: 12,
      padding: 18,
      alignItems: 'center',
      marginTop: 16,
    },
    disabledButton: { backgroundColor: colors.background.tertiary, opacity: 0.5 },
    checkButtonText: { fontSize: 18, fontWeight: '700', color: '#FFF' },

    continueButton: {
      backgroundColor: colors.text.gold,
      borderRadius: 12,
      padding: 18,
      alignItems: 'center',
      marginTop: 16,
    },
    continueButtonText: { fontSize: 18, fontWeight: '700', color: colors.background.dark },

    resultCard: { borderRadius: 12, padding: 20, marginTop: 8 },
    correctCard: {
      backgroundColor: colors.status.successAlt,
      borderWidth: 2,
      borderColor: colors.status.success,
    },
    incorrectCard: {
      backgroundColor: colors.status.errorAlt,
      borderWidth: 2,
      borderColor: colors.status.error,
    },

    resultHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    resultTitle: { fontSize: 24, fontWeight: '700', color: colors.text.primary },
    earnedPoints: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.text.gold,
    },

    answerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    answerLabel: { fontSize: 15, color: colors.text.secondary, fontWeight: '500' },
    answerValue: { fontSize: 17, color: colors.text.primary, fontWeight: '700' },
    correctHighlight: { color: colors.status.success },

    explanationBox: {
      marginTop: 14,
      backgroundColor: colors.background.darkGray,
      borderRadius: 8,
      padding: 14,
    },
    explanationText: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 20,
      fontFamily: 'monospace',
    },

    streakNote: {
      marginTop: 12,
      textAlign: 'center',
      color: '#FF6B00',
      fontSize: 13,
      fontWeight: '700',
    },
  });
}

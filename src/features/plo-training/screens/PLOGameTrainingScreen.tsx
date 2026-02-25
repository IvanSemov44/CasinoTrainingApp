import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
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

export default function PLOGameTrainingScreen({ route }: PLOGameTrainingScreenProps) {
  const { difficulty } = route.params;
  const difficultyInfo = DIFFICULTY_INFO[difficulty];

  const [hand, setHand] = useState<GeneratedHand>(() => freshHand(difficulty));
  const [handKey, setHandKey] = useState(0);
  const [momentIndex, setMomentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('asking');
  const [userAnswer, setUserAnswer] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [streak, setStreak] = useState(0);

  const dealingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When dealing phase starts, generate new hand after delay
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
    return () => {
      if (dealingTimer.current) clearTimeout(dealingTimer.current);
    };
  }, [phase, difficulty]);

  const moment = hand.askMoments[momentIndex];

  const handleCheck = useCallback(() => {
    const correct = userAnswer === moment.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setSessionCorrect(c => c + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    setSessionTotal(t => t + 1);
    setPhase('feedback');
  }, [userAnswer, moment.correctAnswer]);

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
    ? Math.round((sessionCorrect / sessionTotal) * 100)
    : null;

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
          {streak >= 2 && (
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 {streak}</Text>
            </View>
          )}
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>{sessionCorrect}/{sessionTotal}</Text>
            {accuracy !== null && (
              <Text style={styles.accuracyText}>{accuracy}%</Text>
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
            <Text style={styles.resultTitle}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </Text>

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

const styles = StyleSheet.create({
  // ── Dealing screen ───────────────────────────────────────────────────────────
  dealingContainer: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  dealingIcon: {
    fontSize: 56,
  },
  dealingText: {
    color: COLORS.text.gold,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // ── Main screen ──────────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  content: {
    padding: SPACING.lg,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  contextBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  difficultyIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  contextText: {
    color: COLORS.text.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  rightBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  streakBadge: {
    backgroundColor: '#2a1800',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FF6B00',
  },
  streakText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FF6B00',
  },
  scoreBadge: {
    alignItems: 'flex-end',
  },
  scoreText: {
    color: COLORS.text.gold,
    fontSize: 18,
    fontWeight: '700',
  },
  accuracyText: {
    color: COLORS.text.secondary,
    fontSize: 11,
  },
  tableWrapper: {
    marginBottom: SPACING.md,
  },

  // ── Buttons ──────────────────────────────────────────────────────────────────
  checkButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#555',
    opacity: 0.5,
  },
  checkButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  continueButton: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a0a0a',
  },

  // ── Result card ──────────────────────────────────────────────────────────────
  resultCard: {
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
  },
  correctCard: {
    backgroundColor: '#1a3a1a',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  incorrectCard: {
    backgroundColor: '#3a1a1a',
    borderWidth: 2,
    borderColor: '#f44336',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 14,
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  answerLabel: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  answerValue: {
    fontSize: 17,
    color: '#FFF',
    fontWeight: '700',
  },
  correctHighlight: {
    color: '#4CAF50',
  },
  explanationBox: {
    marginTop: 14,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 14,
  },
  explanationText: {
    fontSize: 13,
    color: '#ddd',
    lineHeight: 20,
    fontFamily: 'monospace',
  },
});

import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import RouletteLayout from '@components/roulette/RouletteLayout';
import SkeletonLoader from '@components/SkeletonLoader';
import ExerciseStats from './ExerciseStats';
import HintSection from './HintSection';
import NumberPad from './NumberPad';
import FeedbackCard from './FeedbackCard';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../constants/theme';

// TODO: There are two conflicting BetType definitions that need consolidation:
// - src/types/roulette.types.ts uses an enum (BetType.STRAIGHT, BetType.SPLIT, etc.)
// - src/features/roulette-training/types/exercise.types.ts uses string literals ('STRAIGHT' | 'SPLIT' | etc.)
// This causes type incompatibility. For now, using flexible type to accept both.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlexiblePlacedBet = any;

interface ExerciseLayoutProps {
  score: number;
  attempts: number;
  showHint: boolean;
  onToggleHint: () => void;
  hintContent: ReactNode;
  placedBets: FlexiblePlacedBet[];
  answerLabel: string;
  userAnswer: string;
  onAnswerChange: (text: string) => void;
  showFeedback: boolean;
  onCheckAnswer: () => void;
  isCorrect: boolean;
  correctAnswer: number;
  explanation?: string;
  onNextQuestion: () => void;
  cellSize?: number;
  maxColumns?: number;
  isLoading?: boolean;
}

export default function ExerciseLayout({
  score,
  attempts,
  showHint,
  onToggleHint,
  hintContent,
  placedBets,
  answerLabel,
  userAnswer,
  onAnswerChange,
  showFeedback,
  onCheckAnswer,
  isCorrect,
  correctAnswer,
  explanation,
  onNextQuestion,
  cellSize = 55,
  maxColumns = 4,
  isLoading = false,
}: ExerciseLayoutProps) {
  return (
    <ScrollView style={styles.container}>
      <ExerciseStats score={score} attempts={attempts} />

      <HintSection isOpen={showHint} onToggle={onToggleHint}>
        {hintContent}
      </HintSection>

      <View style={styles.layoutContainer}>
        <Text style={styles.layoutLabel}>Visual Reference:</Text>
        {isLoading ? (
          <View style={styles.layoutSkeletonContainer}>
            <SkeletonLoader width="100%" height={120} borderRadius={BORDERS.radius.sm} />
          </View>
        ) : (
          <ScrollView 
            horizontal 
            style={styles.layoutScrollView}
            contentContainerStyle={styles.layoutWrapper}
          >
            <RouletteLayout
              onNumberPress={() => {}}
              placedBets={placedBets}
              cellSize={cellSize}
              showOutsideBets={false}
              showColumnBets={false}
              maxColumns={maxColumns}
            />
          </ScrollView>
        )}
      </View>

      <View style={styles.answerSection}>
        <Text style={styles.answerLabel}>{answerLabel}</Text>
        {isLoading ? (
          <SkeletonLoader width="100%" height={60} borderRadius={BORDERS.radius.md} />
        ) : (
          <TextInput
            style={styles.input}
            value={userAnswer}
            onChangeText={onAnswerChange}
            keyboardType="numeric"
            placeholder="Enter total payout"
            placeholderTextColor="#999"
            editable={!showFeedback}
            showSoftInputOnFocus={false}
          />
        )}

        {isLoading ? (
          <View style={styles.skeletonNumberPad}>
            <SkeletonLoader width="100%" height={180} borderRadius={BORDERS.radius.md} />
          </View>
        ) : !showFeedback && (
          <NumberPad
            onNumberPress={(num) => onAnswerChange(userAnswer + num)}
            onClear={() => onAnswerChange('')}
            onBackspace={() => onAnswerChange(userAnswer.slice(0, -1))}
            disabled={showFeedback}
          />
        )}

        {isLoading ? (
          <SkeletonLoader width="100%" height={58} borderRadius={BORDERS.radius.md} />
        ) : !showFeedback ? (
          <TouchableOpacity
            style={styles.checkButton}
            onPress={onCheckAnswer}
            disabled={!userAnswer}
          >
            <Text style={styles.checkButtonText}>✓ Check Answer</Text>
          </TouchableOpacity>
        ) : (
          <FeedbackCard
            isCorrect={isCorrect}
            correctAnswer={correctAnswer}
            explanation={!isCorrect ? explanation : undefined}
            onNextQuestion={onNextQuestion}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  layoutContainer: {
    margin: SPACING.md,
    marginTop: 0,
  },
  layoutLabel: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.gold,
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },
  layoutScrollView: {
    backgroundColor: COLORS.background.dark,
    borderRadius: BORDERS.radius.sm,
  },
  layoutWrapper: {
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: SPACING.sm,
  },
  layoutSkeletonContainer: {
    backgroundColor: COLORS.background.dark,
    borderRadius: BORDERS.radius.sm,
    padding: SPACING.sm,
  },
  answerSection: {
    margin: SPACING.md,
    marginTop: 0,
  },
  answerLabel: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text.gold,
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.background.secondary,
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.border.primary,
    borderRadius: BORDERS.radius.md,
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.xxl,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  skeletonNumberPad: {
    marginBottom: SPACING.md,
  },
  checkButton: {
    backgroundColor: COLORS.status.success,
    padding: SPACING.lg,
    borderRadius: BORDERS.radius.md,
    alignItems: 'center',
  },
  checkButtonText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: 'bold',
  },
});

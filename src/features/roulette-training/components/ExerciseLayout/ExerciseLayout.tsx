import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import RouletteLayout from '@components/roulette/RouletteLayout';
import SkeletonLoader from '@components/SkeletonLoader';
import ExerciseStats from '../ExerciseStats';
import HintSection from '../HintSection';
import NumberPad from '@components/NumberPad';
import FeedbackCard from '../FeedbackCard';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import type { ExerciseLayoutProps } from './ExerciseLayout.types';

/**
 * Main layout component for exercise screens
 * Orchestrates roulette visualization, input handling, and feedback display
 */
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
  const styles = useThemedStyles(makeStyles);

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
            <SkeletonLoader width="100%" height={120} borderRadius={8} />
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
          <SkeletonLoader width="100%" height={60} borderRadius={10} />
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
            <SkeletonLoader width="100%" height={180} borderRadius={10} />
          </View>
        ) : (
          !showFeedback && (
            <NumberPad
              onNumberPress={num => onAnswerChange(userAnswer + num)}
              onClear={() => onAnswerChange('')}
              onBackspace={() => onAnswerChange(userAnswer.slice(0, -1))}
              disabled={showFeedback}
            />
          )
        )}

        {isLoading ? (
          <SkeletonLoader width="100%" height={58} borderRadius={10} />
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

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    layoutContainer: {
      margin: 16,
      marginTop: 0,
    },
    layoutLabel: {
      fontSize: 16,
      color: colors.text.gold,
      marginBottom: 8,
      fontWeight: '600',
    },
    layoutScrollView: {
      backgroundColor: colors.background.darkGray,
      borderRadius: 8,
    },
    layoutWrapper: {
      alignItems: 'center',
      paddingVertical: 0,
      paddingHorizontal: 8,
    },
    layoutSkeletonContainer: {
      backgroundColor: colors.background.darkGray,
      borderRadius: 8,
      padding: 8,
    },
    answerSection: {
      margin: 16,
      marginTop: 0,
    },
    answerLabel: {
      fontSize: 18,
      color: colors.text.gold,
      marginBottom: 8,
      fontWeight: '600',
    },
    input: {
      backgroundColor: colors.background.secondary,
      borderWidth: 2,
      borderColor: colors.border.primary,
      borderRadius: 10,
      padding: 16,
      fontSize: 24,
      color: colors.text.primary,
      textAlign: 'center',
      marginBottom: 16,
    },
    skeletonNumberPad: {
      marginBottom: 16,
    },
    checkButton: {
      backgroundColor: colors.status.success,
      padding: 24,
      borderRadius: 10,
      alignItems: 'center',
    },
    checkButtonText: {
      color: colors.text.primary,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
}

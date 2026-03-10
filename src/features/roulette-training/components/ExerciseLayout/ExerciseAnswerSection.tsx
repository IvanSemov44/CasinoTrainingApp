import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import SkeletonLoader from '@components/SkeletonLoader';
import NumberPad from '@components/NumberPad';
import FeedbackCard from '../FeedbackCard';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

interface ExerciseAnswerSectionProps {
  answerLabel: string;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  showFeedback: boolean;
  isLoading: boolean;
  onCheckAnswer: () => void;
  isCorrect: boolean;
  correctAnswer: number;
  explanation?: string;
  onNextQuestion: () => void;
}

export default function ExerciseAnswerSection({
  answerLabel,
  userAnswer,
  onAnswerChange,
  showFeedback,
  isLoading,
  onCheckAnswer,
  isCorrect,
  correctAnswer,
  explanation,
  onNextQuestion,
}: ExerciseAnswerSectionProps) {
  const styles = useThemedStyles(makeStyles);

  return (
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
          placeholderTextColor={styles.placeholderColor.color}
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
        <TouchableOpacity style={styles.checkButton} onPress={onCheckAnswer} disabled={!userAnswer}>
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
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
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
    placeholderColor: {
      color: colors.text.muted,
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

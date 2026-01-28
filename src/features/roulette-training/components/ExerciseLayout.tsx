import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import RouletteLayout from '@components/roulette/RouletteLayout';
import ExerciseStats from './ExerciseStats';
import HintSection from './HintSection';
import NumberPad from './NumberPad';
import FeedbackCard from './FeedbackCard';
import { COLORS } from '../constants/theme';

interface ExerciseLayoutProps {
  score: number;
  attempts: number;
  showHint: boolean;
  onToggleHint: () => void;
  hintContent: ReactNode;
  placedBets: any[];
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
}: ExerciseLayoutProps) {
  return (
    <ScrollView style={styles.container}>
      <ExerciseStats score={score} attempts={attempts} />

      <HintSection isOpen={showHint} onToggle={onToggleHint}>
        {hintContent}
      </HintSection>

      <View style={styles.layoutContainer}>
        <Text style={styles.layoutLabel}>Visual Reference:</Text>
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
      </View>

      <View style={styles.answerSection}>
        <Text style={styles.answerLabel}>{answerLabel}</Text>
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

        {!showFeedback && (
          <NumberPad
            onNumberPress={(num) => onAnswerChange(userAnswer + num)}
            onClear={() => onAnswerChange('')}
            onBackspace={() => onAnswerChange(userAnswer.slice(0, -1))}
            disabled={showFeedback}
          />
        )}

        {!showFeedback ? (
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
    margin: 15,
    marginTop: 0,
  },
  layoutLabel: {
    fontSize: 16,
    color: COLORS.text.gold,
    marginBottom: 10,
    fontWeight: '600',
  },
  layoutScrollView: {
    backgroundColor: COLORS.background.dark,
    borderRadius: 8,
  },
  layoutWrapper: {
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  answerSection: {
    margin: 15,
    marginTop: 0,
  },
  answerLabel: {
    fontSize: 18,
    color: COLORS.text.gold,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.background.secondary,
    borderWidth: 2,
    borderColor: COLORS.border.primary,
    borderRadius: 10,
    padding: 15,
    fontSize: 24,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 15,
  },
  checkButton: {
    backgroundColor: COLORS.status.success,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkButtonText: {
    color: COLORS.text.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

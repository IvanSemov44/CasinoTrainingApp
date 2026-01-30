import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GameStateDisplay from '../components/GameStateDisplay';
import PotCalculationInput from '../components/PotCalculationInput';
import { PotRequest, PotValidationResult } from '../types';
import { generateRandomPotRequest, validatePotAnswer } from '../utils/plo.utils';

export default function PLOPotCalculationScreen({ navigation }: any) {
  const [currentRequest, setCurrentRequest] = useState<PotRequest>(generateRandomPotRequest());
  const [validationResult, setValidationResult] = useState<PotValidationResult | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSubmit = (amount: number) => {
    const result = validatePotAnswer(currentRequest, amount);
    setValidationResult(result);
    setShowAnswer(true);

    // Update score
    setScore(prev => ({
      correct: prev.correct + (result.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    setCurrentRequest(generateRandomPotRequest());
    setValidationResult(null);
    setShowAnswer(false);
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{score.correct}/{score.total}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{accuracy}%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        {/* Game State */}
        <GameStateDisplay request={currentRequest} />

        {/* Input */}
        {!showAnswer && (
          <PotCalculationInput onSubmit={handleSubmit} disabled={showAnswer} />
        )}

        {/* Result Feedback */}
        {validationResult && showAnswer && (
          <View style={styles.resultContainer}>
            <View style={[
              styles.resultCard,
              validationResult.isCorrect ? styles.correctCard : styles.incorrectCard
            ]}>
              <Text style={styles.resultTitle}>
                {validationResult.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </Text>
              
              <View style={styles.answerRow}>
                <Text style={styles.answerLabel}>Your Answer:</Text>
                <Text style={styles.answerValue}>${validationResult.userAnswer}</Text>
              </View>
              
              {!validationResult.isCorrect && (
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>Correct Answer:</Text>
                  <Text style={[styles.answerValue, styles.correctAnswer]}>
                    ${validationResult.correctAnswer}
                  </Text>
                </View>
              )}
              
              <View style={styles.explanationBox}>
                <Text style={styles.explanationText}>{validationResult.explanation}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>Next Scenario</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 15,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  answerLabel: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  answerValue: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  correctAnswer: {
    color: '#4CAF50',
  },
  explanationBox: {
    marginTop: 15,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
  },
  explanationText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a0a0a',
  },
});

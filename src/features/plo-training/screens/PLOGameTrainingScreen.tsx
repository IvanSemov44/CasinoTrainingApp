import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import PokerTable from '../components/PokerTable';
import PotCalculationInput from '../components/PotCalculationInput';
import { GAME_SCENARIOS } from '../constants/gameScenarios';
import type { NavigationProp } from '../../../types/navigation.types';

export default function PLOGameTrainingScreen({ navigation }: { navigation: NavigationProp<'PLOGameTraining'> }) {
  const [userAnswer, setUserAnswer] = useState<number>(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  const currentScenario = GAME_SCENARIOS[currentScenarioIndex] || GAME_SCENARIOS[0];
  const [players, setPlayers] = useState(currentScenario.players);
  const correctAnswer = currentScenario.correctAnswer;

  const handleSubmit = (amount: number) => {
    setUserAnswer(amount);
  };

  const handleCheck = () => {
    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    setIsChecked(true);
  };

  const handleNext = () => {
    const nextIndex = (currentScenarioIndex + 1) % GAME_SCENARIOS.length;
    setCurrentScenarioIndex(nextIndex);
    setPlayers(GAME_SCENARIOS[nextIndex].players);
    setUserAnswer(0);
    setIsChecked(false);
    setIsCorrect(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.tableWrapper}>
        <PokerTable 
          players={players} 
          potAmount={GAME_SCENARIOS[currentScenarioIndex].potAmount}
          communityCards={GAME_SCENARIOS[currentScenarioIndex].communityCards}
        />
      </View>

      {!isChecked ? (
        <>
          <PotCalculationInput onSubmit={handleSubmit} disabled={false} />
          
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
          <View style={[
            styles.resultCard,
            isCorrect ? styles.correctCard : styles.incorrectCard
          ]}>
            <Text style={styles.resultTitle}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </Text>
            
            <View style={styles.answerRow}>
              <Text style={styles.answerLabel}>Your Answer:</Text>
              <Text style={styles.answerValue}>${userAnswer}</Text>
            </View>
            
            {!isCorrect && (
              <View style={styles.answerRow}>
                <Text style={styles.answerLabel}>Correct Answer:</Text>
                <Text style={[styles.answerValue, styles.correctAnswer]}>
                  ${correctAnswer}
                </Text>
              </View>
            )}
            
            <View style={styles.explanationBox}>
              <Text style={styles.explanationText}>
                {currentScenario.explanation}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              Next Scenario ({currentScenarioIndex + 1}/{GAME_SCENARIOS.length})
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  tableWrapper: {
    marginTop: SPACING.md,
    marginBottom: 20,
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#666',
    opacity: 0.5,
  },
  checkButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resultCard: {
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
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
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a0a0a',
  },
});

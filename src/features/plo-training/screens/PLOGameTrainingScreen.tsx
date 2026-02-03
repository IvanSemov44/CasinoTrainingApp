import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import PokerTable from '../components/PokerTable';
import PotCalculationInput from '../components/PotCalculationInput';

// One hand from preflop through flop showing pot calculation
const scenarios = [
  {
    // Question 1: Preflop - UTG asks pot after blinds
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, isRequesting: true },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 2 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, betAmount: 1 },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true },
    ],
    potAmount: 0,
    communityCards: 0,
    correctAnswer: 7,
    explanation: 'Preflop:\nDead Money: $1 (SB)\nLast Action: $2 (BB)\nPot = $1 + 3×$2 = $7'
  },
  {
    // Question 2: UTG raises to $7, MP asks pot
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false, isRequesting: true },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, betAmount: 7 },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 2 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, betAmount: 1 },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true },
    ],
    potAmount: 0,
    communityCards: 0,
    correctAnswer: 24,
    explanation: 'Preflop:\nDead Money: $3 (SB $1 + BB $2)\nLast Action: $7 (UTG)\nPot = $3 + 3×$7 = $24'
  },
  {
    // Question 3: Preflop ends - MP raised to $24, CO/D/SB fold, BB and UTG call. Pot = $73 goes to center
    // FLOP: BB bets $50, UTG asks pot
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false, isFolded: true },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, isRequesting: true },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 50 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, isFolded: true },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true, isFolded: true },
    ],
    potAmount: 73,
    communityCards: 3,
    correctAnswer: 223,
    explanation: 'FLOP: BB bets $50\nPot in center: $73 (from preflop: SB $1 + MP $24 + UTG $24 + BB $24)\nLast Action: $50 (BB bet)\nPot = $73 + 3×$50 = $223'
  },
  {
    // Question 4: UTG raises to $223, MP folds, BB asks pot
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false, isFolded: true },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false, isFolded: true },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, betAmount: 223 },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 50, isRequesting: true },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, isFolded: true },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true, isFolded: true },
    ],
    potAmount: 73,
    communityCards: 3,
    correctAnswer: 742,
    explanation: 'FLOP: UTG raises to $223\nPot in center: $123 ($73 preflop + BB $50)\nLast Action: $223 (UTG raise)\nBB has $50 in front\nPot = $123 + 3×$223 - $50 = $742'
  },
  {
    // Question 5: BB raises $742, UTG calls $519 more. Flop betting ends. Pot = $73 + $223 + $742 + $519 = $1,557 goes to center
    // TURN: BB bets $120, UTG asks pot
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false, isFolded: true },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false, isFolded: true },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, isRequesting: true },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 120 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, isFolded: true },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true, isFolded: true },
    ],
    potAmount: 1557,
    communityCards: 4,
    correctAnswer: 1917,
    explanation: 'TURN: BB bets $120\nPot in center: $1,557 ($73 preflop + $223 UTG + $742 BB + $519 UTG call on flop)\nLast Action: $120 (BB bet)\nPot = $1,557 + 3×$120 = $1,917'
  }
];

export default function PLOGameTrainingScreen({ navigation }: any) {
  const [userAnswer, setUserAnswer] = useState<number>(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  const currentScenario = scenarios[currentScenarioIndex] || scenarios[0];
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
    const nextIndex = (currentScenarioIndex + 1) % scenarios.length;
    setCurrentScenarioIndex(nextIndex);
    setPlayers(scenarios[nextIndex].players);
    setUserAnswer(0);
    setIsChecked(false);
    setIsCorrect(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.tableWrapper}>
        <PokerTable 
          players={players} 
          potAmount={scenarios[currentScenarioIndex].potAmount}
          communityCards={scenarios[currentScenarioIndex].communityCards}
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
              Next Scenario ({currentScenarioIndex + 1}/{scenarios.length})
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

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { RouletteNumber } from '../types/roulette.types';
import RouletteLayout from '../components/roulette/RouletteLayout';
import ExerciseStats from '../components/exercises/ExerciseStats';
import HintSection from '../components/exercises/HintSection';
import NumberPad from '../components/exercises/NumberPad';
import FeedbackCard from '../components/exercises/FeedbackCard';

export default function CornerCalculationScreen({ navigation }: any) {
  const [cornerNumbers, setCornerNumbers] = useState<RouletteNumber[]>([]);
  const [chipsOnCorner, setChipsOnCorner] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    // Pick a random corner from numbers 0-12
    // Corners are 4 numbers forming a square
    // Layout: Row 1: 1,4,7,10 | Row 2: 2,5,8,11 | Row 3: 3,6,9,12
    const possibleCorners: [RouletteNumber, RouletteNumber, RouletteNumber, RouletteNumber][] = [
      [0, 1, 2, 3],  // First corner
      [1, 2, 4, 5],
      [2, 3, 5, 6],
      [4, 5, 7, 8],
      [5, 6, 8, 9],
      [7, 8, 10, 11],
      [8, 9, 11, 12],
    ];

    const randomCorner = possibleCorners[Math.floor(Math.random() * possibleCorners.length)];
    const randomChips = Math.floor(Math.random() * 5) + 1;

    setCornerNumbers(randomCorner);
    setChipsOnCorner(randomChips);
    setUserAnswer('');
    setShowFeedback(false);
  };

  const calculateCorrectAnswer = () => {
    // Corner bet payout is 8:1
    // Payout = chips * 8 (winnings only)
    return chipsOnCorner * 8;
  };

  const handleCheckAnswer = () => {
    const correctAnswer = calculateCorrectAnswer();
    const userAnswerNum = parseInt(userAnswer);

    if (isNaN(userAnswerNum)) {
      Alert.alert('Invalid Input', 'Please enter a valid number');
      return;
    }

    const correct = userAnswerNum === correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setAttempts(attempts + 1);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    generateNewQuestion();
  };

  // Create mock placed bets to visualize the chips on the layout
  const mockPlacedBets = [{
    id: 'display',
    type: 'CORNER' as any,
    numbers: cornerNumbers,
    amount: chipsOnCorner,
    payout: 8,
    timestamp: Date.now(),
  }];

  return (
    <ScrollView style={styles.container}>
      <ExerciseStats score={score} attempts={attempts} />

      <HintSection isOpen={showHint} onToggle={() => setShowHint(!showHint)}>
        • A corner bet covers 4 numbers forming a square{'\n'}
        • Corner bet pays 8:1{'\n'}
        • Payout = chips × 8 (winnings only){'\n'}
        • Example: 5 chips → 5 × 8 = 40{'\n'}
        {'\n'}
        Corner <Text style={styles.highlightNumber}>{cornerNumbers[0]}-{cornerNumbers[1]}-{cornerNumbers[2]}-{cornerNumbers[3]}</Text> has{' '}
        <Text style={styles.highlightChips}>{chipsOnCorner}</Text>{' '}
        {chipsOnCorner === 1 ? 'chip' : 'chips'} on it.
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
            placedBets={mockPlacedBets}
            cellSize={55}
            showOutsideBets={false}
            showColumnBets={false}
            maxColumns={4}
          />
        </ScrollView>
      </View>

      <View style={styles.answerSection}>
        <Text style={styles.answerLabel}>Your Answer:</Text>
        <TextInput
          style={styles.input}
          value={userAnswer}
          onChangeText={setUserAnswer}
          keyboardType="numeric"
          placeholder="Enter total payout"
          placeholderTextColor="#999"
          editable={!showFeedback}
          showSoftInputOnFocus={false}
        />

        {!showFeedback && (
          <NumberPad
            onNumberPress={(num) => setUserAnswer(prev => prev + num)}
            onClear={() => setUserAnswer('')}
            onBackspace={() => setUserAnswer(prev => prev.slice(0, -1))}
            disabled={showFeedback}
          />
        )}

        {!showFeedback ? (
          <TouchableOpacity
            style={styles.checkButton}
            onPress={handleCheckAnswer}
          >
            <Text style={styles.checkButtonText}>✓ Check Answer</Text>
          </TouchableOpacity>
        ) : (
          <FeedbackCard
            isCorrect={isCorrect}
            correctAnswer={calculateCorrectAnswer()}
            explanation={!isCorrect ? `${chipsOnCorner} × 8 = ${calculateCorrectAnswer()}` : undefined}
            onNextQuestion={handleNextQuestion}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2f1f',
  },
  highlightNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  highlightChips: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  layoutContainer: {
    margin: 15,
    marginTop: 0,
  },
  layoutLabel: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 10,
    fontWeight: '600',
  },
  layoutScrollView: {
    backgroundColor: '#000',
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
    color: '#FFD700',
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1a5f3f',
    borderWidth: 2,
    borderColor: '#2a7f4f',
    borderRadius: 10,
    padding: 15,
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

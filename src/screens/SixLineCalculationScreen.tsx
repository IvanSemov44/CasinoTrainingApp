import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { RouletteNumber } from '../types/roulette.types';
import RouletteLayout from '../components/roulette/RouletteLayout';
import ExerciseStats from '../components/exercises/ExerciseStats';
import HintSection from '../components/exercises/HintSection';
import NumberPad from '../components/exercises/NumberPad';
import FeedbackCard from '../components/exercises/FeedbackCard';

export default function SixLineCalculationScreen({ navigation }: any) {
  const [lineNumbers, setLineNumbers] = useState<RouletteNumber[]>([]);
  const [chipsOnLine, setChipsOnLine] = useState(1);
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
    // Pick a random six line (double street) from numbers 1-12
    // Six lines are 6 numbers - two adjacent streets
    const possibleLines: RouletteNumber[][] = [
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 7, 8, 9],
      [7, 8, 9, 10, 11, 12],
    ];

    const randomLine = possibleLines[Math.floor(Math.random() * possibleLines.length)];
    const randomChips = Math.floor(Math.random() * 5) + 1;

    setLineNumbers(randomLine);
    setChipsOnLine(randomChips);
    setUserAnswer('');
    setShowFeedback(false);
  };

  const calculateCorrectAnswer = () => {
    // Six line bet payout is 5:1
    // Payout = chips * 5 (winnings only)
    return chipsOnLine * 5;
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
    type: 'LINE' as any,
    numbers: lineNumbers,
    amount: chipsOnLine,
    payout: 5,
    timestamp: Date.now(),
  }];

  return (
    <ScrollView style={styles.container}>
      <ExerciseStats score={score} attempts={attempts} />

      <HintSection isOpen={showHint} onToggle={() => setShowHint(!showHint)}>
        • A six line bet covers 6 numbers (two adjacent streets){'\n'}
        • Six line bet pays 5:1{'\n'}
        • Payout = chips × 5 (winnings only){'\n'}
        • Example: 4 chips → 4 × 5 = 20{'\n'}
        {'\n'}
        Six Line <Text style={styles.highlightNumber}>{lineNumbers[0]}-{lineNumbers[1]}-{lineNumbers[2]}-{lineNumbers[3]}-{lineNumbers[4]}-{lineNumbers[5]}</Text> has{' '}
        <Text style={styles.highlightChips}>{chipsOnLine}</Text>{' '}
        {chipsOnLine === 1 ? 'chip' : 'chips'} on it.
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
            explanation={!isCorrect ? `${chipsOnLine} × 5 = ${calculateCorrectAnswer()}` : undefined}
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

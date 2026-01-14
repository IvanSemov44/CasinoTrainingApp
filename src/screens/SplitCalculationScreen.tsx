import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { RouletteNumber } from '../types/roulette.types';
import RouletteLayout from '../components/roulette/RouletteLayout';
import ExerciseStats from '../components/exercises/ExerciseStats';
import HintSection from '../components/exercises/HintSection';
import NumberPad from '../components/exercises/NumberPad';
import FeedbackCard from '../components/exercises/FeedbackCard';

export default function SplitCalculationScreen({ navigation }: any) {
  const [splitNumbers, setSplitNumbers] = useState<RouletteNumber[]>([]);
  const [chipsOnSplit, setChipsOnSplit] = useState(1);
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
    // Pick a random split from numbers 0-12
    // Roulette layout: Row 1 (bottom): 1,4,7,10 | Row 2 (middle): 2,5,8,11 | Row 3 (top): 3,6,9,12
    const possibleSplits: [RouletteNumber, RouletteNumber][] = [];

    // Vertical splits (consecutive numbers in same column)
    // Column 1: 1-2, 2-3 | Column 2: 4-5, 5-6 | Column 3: 7-8, 8-9 | Column 4: 10-11, 11-12
    for (let i = 1; i <= 11; i++) {
      if (i % 3 !== 0) { // Skip 3, 6, 9, 12 (can't split with number above them within our range)
        possibleSplits.push([i as RouletteNumber, (i + 1) as RouletteNumber]);
      }
    }

    // Horizontal splits (numbers that differ by 3 in same row)
    // Row 1: 1-4, 4-7, 7-10 | Row 2: 2-5, 5-8, 8-11 | Row 3: 3-6, 6-9, 9-12
    for (let i = 1; i <= 9; i++) {
      possibleSplits.push([i as RouletteNumber, (i + 3) as RouletteNumber]);
    }

    // Splits with 0 (0-1, 0-2, 0-3)
    possibleSplits.push([0 as RouletteNumber, 1 as RouletteNumber]);
    possibleSplits.push([0 as RouletteNumber, 2 as RouletteNumber]);
    possibleSplits.push([0 as RouletteNumber, 3 as RouletteNumber]);

    const randomSplit = possibleSplits[Math.floor(Math.random() * possibleSplits.length)];
    const randomChips = Math.floor(Math.random() * 5) + 1;

    setSplitNumbers(randomSplit);
    setChipsOnSplit(randomChips);
    setUserAnswer('');
    setShowFeedback(false);
  };

  const calculateCorrectAnswer = () => {
    // Split bet payout is 17:1
    // Payout = chips * 17 (winnings only)
    return chipsOnSplit * 17;
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
    type: 'SPLIT' as any,
    numbers: splitNumbers,
    amount: chipsOnSplit,
    payout: 17,
    timestamp: Date.now(),
  }];

  return (
    <ScrollView style={styles.container}>
      <ExerciseStats score={score} attempts={attempts} />

      <HintSection isOpen={showHint} onToggle={() => setShowHint(!showHint)}>
        • A split bet covers 2 adjacent numbers{'\n'}
        • Split bet pays 17:1{'\n'}
        • Payout = chips × 17 (winnings only){'\n'}
        • Example: 3 chips → 3 × 17 = 51{'\n'}
        {'\n'}
        Split <Text style={styles.highlightNumber}>{splitNumbers[0]}-{splitNumbers[1]}</Text> has{' '}
        <Text style={styles.highlightChips}>{chipsOnSplit}</Text>{' '}
        {chipsOnSplit === 1 ? 'chip' : 'chips'} on it.
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
            explanation={!isCorrect ? `${chipsOnSplit} × 17 = ${calculateCorrectAnswer()}` : undefined}
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

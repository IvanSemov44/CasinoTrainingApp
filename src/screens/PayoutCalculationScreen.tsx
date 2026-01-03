import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { RouletteNumber } from '../types/roulette.types';
import RouletteLayout from '../components/roulette/RouletteLayout';
import ExerciseStats from '../components/exercises/ExerciseStats';
import HintSection from '../components/exercises/HintSection';
import NumberPad from '../components/exercises/NumberPad';
import FeedbackCard from '../components/exercises/FeedbackCard';

export default function PayoutCalculationScreen({ navigation }: any) {
  const [targetNumber, setTargetNumber] = useState<RouletteNumber>(0);
  const [chipsOnNumber, setChipsOnNumber] = useState(1);
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
    // Pick random number 0-12 (only numbers shown in layout)
    const randomNum = Math.floor(Math.random() * 13) as RouletteNumber;
    // Pick random chips 1-5
    const randomChips = Math.floor(Math.random() * 5) + 1;
    
    setTargetNumber(randomNum);
    setChipsOnNumber(randomChips);
    setUserAnswer('');
    setShowFeedback(false);
  };

  const calculateCorrectAnswer = () => {
    // Straight up payout is 35:1
    // Payout = chips * 35 (winnings only, original bet not included)
    return chipsOnNumber * 35;
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
    type: 'STRAIGHT' as any,
    numbers: [targetNumber],
    amount: chipsOnNumber,
    payout: 35,
    timestamp: Date.now(),
  }];

  return (
    <ScrollView style={styles.container}>
      <ExerciseStats score={score} attempts={attempts} />

      <HintSection isOpen={showHint} onToggle={() => setShowHint(!showHint)}>
        • A straight-up bet pays 35:1{'\n'}
        • Payout = chips × 35 (winnings only){'\n'}
        • Example: 3 chips → 3 × 35 = 105{'\n'}
        {'\n'}
        Number <Text style={styles.highlightNumber}>{targetNumber}</Text> has{' '}
        <Text style={styles.highlightChips}>{chipsOnNumber}</Text>{' '}
        {chipsOnNumber === 1 ? 'chip' : 'chips'} on it.
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
            explanation={!isCorrect ? `${chipsOnNumber} × 35 = ${calculateCorrectAnswer()}` : undefined}
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

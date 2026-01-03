import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { RouletteNumber } from '../types/roulette.types';
import RouletteLayout from '../components/roulette/RouletteLayout';

export default function PayoutCalculationScreen({ navigation }: any) {
  const [targetNumber, setTargetNumber] = useState<RouletteNumber>(0);
  const [chipsOnNumber, setChipsOnNumber] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    // Pick random number 0-36
    const randomNum = Math.floor(Math.random() * 37) as RouletteNumber;
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

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payout Calculation</Text>
        <Text style={styles.subtitle}>Straight Up Bets (35:1)</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsText}>Score: {score}/{attempts}</Text>
          <Text style={styles.statsText}>Accuracy: {accuracy}%</Text>
        </View>
      </View>

      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>📋 Instructions</Text>
        <Text style={styles.instructionsText}>
          • A straight-up bet pays 35:1{'\n'}
          • Payout = chips × 35 (winnings only){'\n'}
          • Example: 3 chips → 3 × 35 = 105
        </Text>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionTitle}>Current Question:</Text>
        <Text style={styles.questionText}>
          Number <Text style={styles.highlightNumber}>{targetNumber}</Text> has{' '}
          <Text style={styles.highlightChips}>{chipsOnNumber}</Text>{' '}
          {chipsOnNumber === 1 ? 'chip' : 'chips'} on it.
        </Text>
        <Text style={styles.questionPrompt}>
          What is the total payout if this number wins?
        </Text>
      </View>

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
            cellSize={25}
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
        />

        {!showFeedback ? (
          <TouchableOpacity
            style={styles.checkButton}
            onPress={handleCheckAnswer}
          >
            <Text style={styles.checkButtonText}>✓ Check Answer</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.feedbackContainer}>
            <View style={[
              styles.feedbackCard,
              isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
            ]}>
              <Text style={styles.feedbackIcon}>
                {isCorrect ? '✓' : '✗'}
              </Text>
              <Text style={styles.feedbackText}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </Text>
              <Text style={styles.feedbackAnswer}>
                Correct answer: {calculateCorrectAnswer()}
              </Text>
              {!isCorrect && (
                <Text style={styles.feedbackExplanation}>
                  {chipsOnNumber} × 35 = {calculateCorrectAnswer()}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextQuestion}
            >
              <Text style={styles.nextButtonText}>Next Question →</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    padding: 20,
    backgroundColor: '#1a5f3f',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '600',
  },
  instructionsCard: {
    margin: 15,
    padding: 15,
    backgroundColor: '#2a4f3f',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3a6f5f',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 22,
  },
  questionCard: {
    margin: 15,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#1a5f3f',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 15,
    lineHeight: 26,
  },
  highlightNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  highlightChips: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  questionPrompt: {
    fontSize: 16,
    color: '#FFF',
    fontStyle: 'italic',
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
    padding: 10,
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
  feedbackContainer: {
    gap: 15,
  },
  feedbackCard: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
  },
  feedbackCorrect: {
    backgroundColor: '#1b5e20',
    borderColor: '#4CAF50',
  },
  feedbackIncorrect: {
    backgroundColor: '#5e1b1b',
    borderColor: '#F44336',
  },
  feedbackIcon: {
    fontSize: 48,
    color: '#FFF',
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  feedbackAnswer: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: '600',
  },
  feedbackExplanation: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
    fontStyle: 'italic',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

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

  const handleNumberPress = (num: string) => {
    if (!showFeedback) {
      setUserAnswer(prev => prev + num);
    }
  };

  const handleClear = () => {
    setUserAnswer('');
  };

  const handleBackspace = () => {
    setUserAnswer(prev => prev.slice(0, -1));
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
        <View style={styles.statsRow}>
          <Text style={styles.statsText}>Score: {score}/{attempts}</Text>
          <Text style={styles.statsText}>Accuracy: {accuracy}%</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.hintButton}
        onPress={() => setShowHint(!showHint)}
      >
        <Text style={styles.hintButtonText}>
          {showHint ? '▼' : '▶'} Hint
        </Text>
      </TouchableOpacity>

      {showHint && (
        <View style={styles.hintCard}>
          <Text style={styles.hintText}>
            • A straight-up bet pays 35:1{'\n'}
            • Payout = chips × 35 (winnings only){'\n'}
            • Example: 3 chips → 3 × 35 = 105
          </Text>
        </View>
      )}

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
          <View style={styles.numberPad}>
            <View style={styles.numberPadRow}>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('1')}>
                <Text style={styles.numberButtonText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('2')}>
                <Text style={styles.numberButtonText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('3')}>
                <Text style={styles.numberButtonText}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numberPadRow}>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('4')}>
                <Text style={styles.numberButtonText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('5')}>
                <Text style={styles.numberButtonText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('6')}>
                <Text style={styles.numberButtonText}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numberPadRow}>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('7')}>
                <Text style={styles.numberButtonText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('8')}>
                <Text style={styles.numberButtonText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('9')}>
                <Text style={styles.numberButtonText}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numberPadRow}>
              <TouchableOpacity style={styles.numberButton} onPress={handleClear}>
                <Text style={styles.numberButtonText}>C</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('0')}>
                <Text style={styles.numberButtonText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberButton} onPress={handleBackspace}>
                <Text style={styles.numberButtonText}>⌫</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

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
  hintButton: {
    margin: 15,
    padding: 15,
    backgroundColor: '#2a4f3f',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3a6f5f',
    alignItems: 'center',
  },
  hintButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  hintCard: {
    margin: 15,
    marginTop: 0,
    padding: 15,
    backgroundColor: '#2a4f3f',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3a6f5f',
  },
  hintText: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 22,
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
  numberPad: {
    marginBottom: 15,
  },
  numberPadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  numberButton: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
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

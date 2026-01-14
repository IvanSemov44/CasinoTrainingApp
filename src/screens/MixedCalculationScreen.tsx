import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { RouletteNumber } from '../types/roulette.types';
import RouletteLayout from '../components/roulette/RouletteLayout';
import ExerciseStats from '../components/exercises/ExerciseStats';
import HintSection from '../components/exercises/HintSection';
import NumberPad from '../components/exercises/NumberPad';
import FeedbackCard from '../components/exercises/FeedbackCard';

interface Bet {
  type: 'STRAIGHT' | 'SPLIT';
  numbers: RouletteNumber[];
  chips: number;
  payout: number;
}

export default function MixedCalculationScreen({ navigation }: any) {
  const [winningNumber, setWinningNumber] = useState<RouletteNumber>(0);
  const [bets, setBets] = useState<Bet[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const getSplitsForNumber = (num: RouletteNumber): RouletteNumber[][] => {
    const splits: RouletteNumber[][] = [];
    
    // Special case for 0
    if (num === 0) {
      splits.push([0, 1]);
      splits.push([0, 2]);
      splits.push([0, 3]);
      return splits;
    }
    
    // Vertical splits (consecutive numbers in same column)
    if (num % 3 !== 0 && num < 12) { // Can split with number above
      splits.push([num, (num + 1) as RouletteNumber]);
    }
    if (num % 3 !== 1 && num > 0) { // Can split with number below
      splits.push([(num - 1) as RouletteNumber, num]);
    }
    
    // Horizontal splits (same row, differ by 3)
    if (num + 3 <= 12) { // Can split right
      splits.push([num, (num + 3) as RouletteNumber]);
    }
    if (num - 3 >= 1) { // Can split left
      splits.push([(num - 3) as RouletteNumber, num]);
    }
    
    // Special splits with 0
    if (num === 1 || num === 2 || num === 3) {
      splits.push([0, num]);
    }
    
    return splits;
  };

  const generateNewQuestion = () => {
    // Pick a random winning number (0-12)
    const number = Math.floor(Math.random() * 13) as RouletteNumber;
    const newBets: Bet[] = [];
    
    // Always add straight up bet on winning number
    const straightChips = Math.floor(Math.random() * 3) + 1; // 1-3 chips
    newBets.push({
      type: 'STRAIGHT',
      numbers: [number],
      chips: straightChips,
      payout: 35,
    });
    
    // Get all possible splits for this number
    const possibleSplits = getSplitsForNumber(number);
    
    // Add 1-2 random splits that include the winning number
    if (possibleSplits.length > 0) {
      const numSplits = Math.min(
        Math.floor(Math.random() * 2) + 1, // 1-2 splits
        possibleSplits.length
      );
      
      // Shuffle and pick random splits
      const shuffled = [...possibleSplits].sort(() => Math.random() - 0.5);
      for (let i = 0; i < numSplits; i++) {
        const chips = Math.floor(Math.random() * 3) + 1; // 1-3 chips
        newBets.push({
          type: 'SPLIT',
          numbers: shuffled[i],
          chips,
          payout: 17,
        });
      }
    }

    setWinningNumber(number);
    setBets(newBets);
    setUserAnswer('');
    setShowFeedback(false);
  };

  const calculateCorrectAnswer = () => {
    return bets.reduce((total, bet) => total + (bet.chips * bet.payout), 0);
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

  const mockPlacedBets = bets.map((bet, index) => ({
    id: `bet-${index}`,
    type: bet.type as any,
    numbers: bet.numbers,
    amount: bet.chips,
    payout: bet.payout,
    timestamp: Date.now() + index,
  }));

  const getExplanation = () => {
    const parts = bets.map(bet => {
      const nums = bet.type === 'STRAIGHT' 
        ? `${bet.numbers[0]}` 
        : `${bet.numbers[0]}-${bet.numbers[1]}`;
      return `${nums} (${bet.chips} × ${bet.payout} = ${bet.chips * bet.payout})`;
    });
    return parts.join(' + ') + ` = ${calculateCorrectAnswer()}`;
  };

  return (
    <ScrollView style={styles.container}>
      <ExerciseStats score={score} attempts={attempts} />

      <HintSection isOpen={showHint} onToggle={() => setShowHint(!showHint)}>
        • Winning number: <Text style={styles.highlightNumber}>{winningNumber}</Text>{'\n'}
        • Calculate total payout for all winning bets{'\n'}
        • Straight up: chips × 35{'\n'}
        • Split: chips × 17{'\n'}
        • Add all payouts together{'\n'}
        {'\n'}
        <Text style={styles.hintTitle}>Bets on winning number:{'\n'}</Text>
        {bets.map((bet, index) => (
          <Text key={index} style={styles.hintBet}>
            {index + 1}. {bet.type === 'STRAIGHT' ? 'Straight' : 'Split'}{' '}
            <Text style={styles.highlightNumber}>
              {bet.type === 'STRAIGHT' ? bet.numbers[0] : `${bet.numbers[0]}-${bet.numbers[1]}`}
            </Text>
            {' with '}
            <Text style={styles.highlightChips}>{bet.chips}</Text>
            {' '}{bet.chips === 1 ? 'chip' : 'chips'}{'\n'}
          </Text>
        ))}
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
        <Text style={styles.answerLabel}>Total Payout:</Text>
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
            explanation={!isCorrect ? getExplanation() : undefined}
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
  hintTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  hintBet: {
    fontSize: 14,
    lineHeight: 22,
  },
  highlightNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  highlightChips: {
    fontSize: 14,
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

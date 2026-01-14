import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import  RouletteLayout  from '../components/roulette/RouletteLayout';
import  NumberPad  from '../components/exercises/NumberPad';
import  ExerciseStats  from '../components/exercises/ExerciseStats';
import  HintSection  from '../components/exercises/HintSection';
import  FeedbackCard  from '../components/exercises/FeedbackCard';
import type { RouletteNumber } from '../types/roulette.types';

type QuestionType = 'ASK_CHIPS' | 'ASK_CASH';

export default function CashHandlingOneHundredDollarScreen() {
  const [winningNumber, setWinningNumber] = useState<RouletteNumber>(5);
  const [chips, setChips] = useState(3);
  const [payoutChips, setPayoutChips] = useState(105);
  const [totalCash, setTotalCash] = useState(10500);
  const [cashRequest, setCashRequest] = useState(5000);
  const [remainingChips, setRemainingChips] = useState(55);
  const [questionType, setQuestionType] = useState<QuestionType>('ASK_CHIPS');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const generateNewQuestion = () => {
    // Pick a random winning number from 0-12
    const number = Math.floor(Math.random() * 13) as RouletteNumber;
    setWinningNumber(number);

    // Random chips 1-5
    const randomChips = Math.floor(Math.random() * 5) + 1;
    setChips(randomChips);

    // Calculate payout in chips (chips × 35)
    const payout = randomChips * 35;
    setPayoutChips(payout);

    // Calculate total cash value (payout × $100)
    const total = payout * 100;
    setTotalCash(total);

    // Determine valid cash requests (multiples of 500, must be < total)
    const validCashOptions: number[] = [];
    for (let cash = 500; cash < total; cash += 500) {
      validCashOptions.push(cash);
    }

    // If no valid cash options, skip this generation
    let selectedCash: number;
    if (validCashOptions.length === 0) {
      // For very small payouts, regenerate
      generateNewQuestion();
      return;
    } else {
      selectedCash = validCashOptions[Math.floor(Math.random() * validCashOptions.length)];
    }

    setCashRequest(selectedCash);

    // Calculate remaining chips: (total - cash) / 100
    const calculatedChips = (total - selectedCash) / 100;
    setRemainingChips(calculatedChips);

    // Alternate question type
    setQuestionType(prev => prev === 'ASK_CHIPS' ? 'ASK_CASH' : 'ASK_CHIPS');

    setUserAnswer('');
    setShowFeedback(false);
    setShowHint(false);
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const getCorrectAnswer = (): number => {
    return questionType === 'ASK_CHIPS' ? remainingChips : cashRequest;
  };

  const handleCheckAnswer = () => {
    const correctAnswer = getCorrectAnswer();
    const userNum = parseInt(userAnswer);
    const correct = userNum === correctAnswer;

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

  const handleNumberPress = (num: string) => {
    if (userAnswer.length < 5) {
      setUserAnswer(userAnswer + num);
    }
  };

  const handleClear = () => {
    setUserAnswer('');
  };

  const handleBackspace = () => {
    setUserAnswer(userAnswer.slice(0, -1));
  };

  const getExplanation = (): string => {
    return `Payout: ${chips} × 35 = ${payoutChips} chips\nTotal cash: ${payoutChips} × $100 = $${totalCash}\nPayout breakdown: ${remainingChips} chips ($${remainingChips * 100}) + $${cashRequest} cash = $${totalCash}`;
  };

  const getQuestionText = (): string => {
    if (questionType === 'ASK_CHIPS') {
      return `Player wants $${cashRequest} cash.\nHow many chips to pay?`;
    } else {
      return `Dealer pays ${remainingChips} chips.\nHow much cash to pay?`;
    }
  };

  // Mock placed bet for visual reference
  const mockPlacedBets = [{
    id: 'bet-1',
    type: 'STRAIGHT' as any,
    numbers: [winningNumber],
    amount: chips,
    payout: 35,
    timestamp: Date.now(),
  }];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ExerciseStats score={score} attempts={attempts} />

        <HintSection isOpen={showHint} onToggle={() => setShowHint(!showHint)}>
          • Chip denomination: <Text style={styles.highlightNumber}>$100</Text>{'\n'}
          • Winning number: <Text style={styles.highlightNumber}>{winningNumber}</Text>{'\n'}
          • Chips on bet: <Text style={styles.highlightChips}>{chips}</Text>{'\n'}
          • Straight up payout: chips × 35{'\n'}
          • Payout in chips: <Text style={styles.highlightNumber}>{chips} × 35 = {payoutChips} chips</Text>{'\n'}
          • Total cash value: <Text style={styles.highlightNumber}>{payoutChips} × $100 = ${totalCash}</Text>{'\n'}
          {'\n'}
          <Text style={styles.hintTitle}>Cash Handling:{'\n'}</Text>
          • Total must equal: <Text style={styles.highlightNumber}>${totalCash}</Text>{'\n'}
          • Formula: (Chips × $100) + Cash = Total{'\n'}
          • Therefore: {remainingChips} chips (${remainingChips * 100}) + ${cashRequest} cash = ${totalCash}{'\n'}
        </HintSection>

        <View style={styles.visualReference}>
          <Text style={styles.sectionTitle}>Visual Reference</Text>
          <ScrollView
            horizontal
            style={styles.layoutScroll}
            showsHorizontalScrollIndicator={false}
          >
            <RouletteLayout
              cellSize={55}
              maxColumns={4}
              showOutsideBets={false}
              showColumnBets={false}
              placedBets={mockPlacedBets}
              onNumberPress={() => {}}
            />
          </ScrollView>
        </View>

        <View style={styles.questionSection}>
          <Text style={styles.questionText}>{getQuestionText()}</Text>
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>{userAnswer || '0'}</Text>
          </View>
        </View>

        <NumberPad
          onNumberPress={handleNumberPress}
          onClear={handleClear}
          onBackspace={handleBackspace}
          disabled={showFeedback}
        />

        <TouchableOpacity
          style={[styles.checkButton, showFeedback && styles.checkButtonDisabled]}
          onPress={handleCheckAnswer}
          disabled={showFeedback || userAnswer === ''}
        >
          <Text style={styles.checkButtonText}>Check Answer</Text>
        </TouchableOpacity>

        {showFeedback && (
          <FeedbackCard
            isCorrect={isCorrect}
            correctAnswer={getCorrectAnswer()}
            explanation={getExplanation()}
            onNextQuestion={handleNextQuestion}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  visualReference: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  layoutScroll: {
    maxHeight: 400,
  },
  questionSection: {
    marginBottom: 20,
  },
  questionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 26,
  },
  answerContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  answerText: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: 'bold',
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  checkButtonDisabled: {
    backgroundColor: '#555',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  highlightNumber: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  highlightChips: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  hintTitle: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

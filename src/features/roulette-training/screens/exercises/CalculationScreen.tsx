import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { RouletteNumber } from '@app-types/roulette.types';
import { getCashConfig, type CashConfigKey } from '@config/cashConfigs';
import { getBetConfig, type BetConfigKey } from '@config/betConfigs';
import ExerciseLayout from '../../components/ExerciseLayout';
import { useExerciseState } from '../../hooks/useExerciseState';
import { exerciseTextStyles } from '../../utils/exerciseStyles';
import type { Bet, BetType } from '../../types/exercise.types';
import { 
  getBetTypeName, 
  generateBetExplanation, 
  createMockBets,
} from '../../utils/exerciseHelpers';
import { generateBetsForNumber, generateSingleBetFromConfig } from '../../utils/betGenerators';
import { getRandomInt, getRandomElement } from '../../utils/randomUtils';
import { generateHintContent } from '../../utils/hintGenerators';

type QuestionType = 'ASK_PAYOUT' | 'ASK_CHIPS' | 'ASK_CASH';

interface CalculationScreenProps {
  route: {
    params?: {
      cashConfigKey?: CashConfigKey;
      betConfigKey?: BetConfigKey; // For single bet type exercises
      betTypes?: BetType[]; // For mixed bet exercises
    };
  };
  navigation: any;
}

export default function CalculationScreen({ route, navigation }: CalculationScreenProps) {
  const cashConfig = route.params?.cashConfigKey ? getCashConfig(route.params.cashConfigKey) : undefined;
  const betConfig = route.params?.betConfigKey ? getBetConfig(route.params.betConfigKey) : undefined;
  
  // Determine bet types: use betConfig if single bet, otherwise use betTypes array (default to STRAIGHT+SPLIT)
  const allowedBetTypes: BetType[] = betConfig 
    ? [betConfig.type as BetType]
    : (route.params?.betTypes || ['STRAIGHT', 'SPLIT']);
  
  const isSingleBet = allowedBetTypes.length === 1;
  
  const [winningNumber, setWinningNumber] = useState<RouletteNumber>(0);
  const [bets, setBets] = useState<Bet[]>([]);
  const [questionType, setQuestionType] = useState<QuestionType>('ASK_PAYOUT');
  const [cashRequest, setCashRequest] = useState(0);
  const [remainingChips, setRemainingChips] = useState(0);
  
  const {
    userAnswer,
    setUserAnswer,
    score,
    attempts,
    showFeedback,
    isCorrect,
    showHint,
    checkAnswer,
    resetAnswer,
    toggleHint,
  } = useExerciseState();

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    let newBets: Bet[];
    let number: RouletteNumber;
    
    // For single bet type, use betConfig's generatePossibleBets if available
    if (isSingleBet && betConfig) {
      const possibleBets = betConfig.generatePossibleBets();
      const { bet, number: winningNumber } = generateSingleBetFromConfig(
        possibleBets,
        allowedBetTypes[0]
      );
      newBets = [bet];
      number = winningNumber;
    } else {
      // For multiple bets, pick a random winning number (0-12)
      number = getRandomInt(0, 12) as RouletteNumber;
      newBets = generateBetsForNumber(number, allowedBetTypes);
    }

    setWinningNumber(number);
    setBets(newBets);
    
    // Handle cash handling logic if cashConfig is present
    if (cashConfig) {
      const totalPayout = newBets.filter(bet => bet && bet.chips != null && bet.payout != null).reduce((total, bet) => total + (bet.chips * bet.payout), 0);
      const totalCash = totalPayout * cashConfig.denomination;
      
      // Get valid cash options from config
      const validCashOptions = cashConfig.getCashOptions(totalCash);
      
      // If no valid cash options, regenerate
      if (validCashOptions.length === 0) {
        generateNewQuestion();
        return;
      }
      
      const selectedCash = getRandomElement(validCashOptions);
      setCashRequest(selectedCash);
      
      // Calculate remaining chips: (total - cash) / denomination
      const calculatedChips = (totalCash - selectedCash) / cashConfig.denomination;
      setRemainingChips(calculatedChips);
      
      // Alternate between ASK_CHIPS and ASK_CASH for cash handling questions
      setQuestionType(prev => prev === 'ASK_CHIPS' ? 'ASK_CASH' : 'ASK_CHIPS');
    } else {
      setQuestionType('ASK_PAYOUT');
    }
    
    resetAnswer();
  };

  const calculateCorrectAnswer = () => {
    const totalPayout = bets.filter(bet => bet && bet.chips != null && bet.payout != null).reduce((total, bet) => total + (bet.chips * bet.payout), 0);
    
    if (questionType === 'ASK_PAYOUT') {
      return totalPayout;
    } else if (questionType === 'ASK_CHIPS') {
      return remainingChips;
    } else {
      return cashRequest;
    }
  };

  const handleCheckAnswer = () => {
    checkAnswer(calculateCorrectAnswer());
  };

  const handleNextQuestion = () => {
    generateNewQuestion();
  };

  const mockPlacedBets = createMockBets(bets);

  const getQuestionText = (): string => {
    if (questionType === 'ASK_CHIPS') {
      return `Player wants $${cashRequest} cash.\nHow many chips to pay?`;
    } else if (questionType === 'ASK_CASH') {
      return `Dealer pays ${remainingChips} chips.\nHow much cash to pay?`;
    } else {
      return 'What is the total payout?';
    }
  };

  const answerLabel = cashConfig && questionType !== 'ASK_PAYOUT'
    ? getQuestionText()
    : cashConfig 
      ? `Total payout (chips):` 
      : 'Total payout:';

  const hintContent = generateHintContent(
    questionType,
    isSingleBet,
    bets,
    winningNumber,
    allowedBetTypes,
    cashConfig,
    betConfig,
    remainingChips,
    cashRequest
  );

  const getExplanationText = (): string => {
    const totalPayout = bets.filter(b => b && b.chips != null && b.payout != null).reduce((sum, b) => sum + (b.chips * b.payout), 0);
    
    if (questionType === 'ASK_PAYOUT') {
      if (isSingleBet && bets[0] && bets[0].payout != null) {
        return `${bets[0].chips} × ${bets[0].payout} = ${totalPayout}`;
      } else {
        return generateBetExplanation(bets);
      }
    } else if (cashConfig) {
      const totalCash = totalPayout * cashConfig.denomination;
      return `Payout: ${totalPayout} chips\nTotal cash: ${totalPayout} × $${cashConfig.denomination} = $${totalCash}\nPayout breakdown: ${remainingChips} chips ($${remainingChips * cashConfig.denomination}) + $${cashRequest} cash = $${totalCash}`;
    }
    return '';
  };

  const explanation = getExplanationText();

  return (
    <ExerciseLayout
      score={score}
      attempts={attempts}
      showHint={showHint}
      onToggleHint={toggleHint}
      hintContent={hintContent}
      placedBets={mockPlacedBets}
      answerLabel={answerLabel}
      userAnswer={userAnswer}
      onAnswerChange={setUserAnswer}
      showFeedback={showFeedback}
      onCheckAnswer={handleCheckAnswer}
      isCorrect={isCorrect}
      correctAnswer={calculateCorrectAnswer()}
      explanation={explanation}
      onNextQuestion={handleNextQuestion}
    />
  );
}
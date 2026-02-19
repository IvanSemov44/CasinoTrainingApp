import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouletteNumber } from '@app-types/roulette.types';
import { getCashConfig, type CashConfigKey } from '@config/cashConfigs';
import { getBetConfig, type BetConfigKey } from '@config/betConfigs';
import LoadingSpinner from '@components/LoadingSpinner';
import ExerciseLayout from '../../components/ExerciseLayout';
import { useExerciseState } from '../../hooks/useExerciseState';
import type { Bet, BetType } from '../../types/exercise.types';
import { 
  generateBetExplanation, 
  createMockBets,
} from '../../utils/exerciseHelpers';
import { generateBetsForNumber, generateSingleBetFromConfig } from '../../utils/betGenerators';
import { getRandomInt, getRandomElement } from '../../utils/randomUtils';
import { generateHintContent } from '../../utils/hintGenerators';
import type { RouletteTrainingStackParamList } from '../../navigation';

type QuestionType = 'ASK_PAYOUT' | 'ASK_CHIPS' | 'ASK_CASH';

// Union type for all screens that use CalculationScreen
type CalculationScreenName = 'Calculation' | 'MixedCalculation' | 'TripleMixedCalculation' | 'AllPositionsCalculation' | 'CashHandling';

// Use separate RouteProp and NavigationProp to avoid union type issues
type CalculationScreenRouteProp = RouteProp<RouletteTrainingStackParamList, CalculationScreenName>;
type CalculationScreenNavigationProp = StackNavigationProp<RouletteTrainingStackParamList, CalculationScreenName>;

interface CalculationScreenProps {
  route: CalculationScreenRouteProp;
  navigation: CalculationScreenNavigationProp;
}

// Type guard to check if betConfigKey exists in params
function hasBetConfigKey(params: unknown): params is { betConfigKey: BetConfigKey } {
  return typeof params === 'object' && params !== null && 'betConfigKey' in params;
}

// Type guard to check if cashConfigKey exists in params
function hasCashConfigKey(params: unknown): params is { cashConfigKey: CashConfigKey } {
  return typeof params === 'object' && params !== null && 'cashConfigKey' in params;
}

// Type guard to check if betTypes exists in params
function hasBetTypes(params: unknown): params is { betTypes: BetType[] } {
  return typeof params === 'object' && params !== null && 'betTypes' in params;
}

// Type guard to check if chipCount exists in params
function hasChipCount(params: unknown): params is { chipCount: number } {
  return typeof params === 'object' && params !== null && 'chipCount' in params;
}

function CalculationScreen({ route }: CalculationScreenProps) {
  const params = route.params;
  
  // Extract stable primitive values from params to avoid object reference changes
  const betConfigKey = hasBetConfigKey(params) ? params.betConfigKey : undefined;
  const cashConfigKey = hasCashConfigKey(params) ? params.cashConfigKey : undefined;
  const betTypesParam = hasBetTypes(params) ? params.betTypes : undefined;
  const chipCountParam = hasChipCount(params) ? params.chipCount : undefined;
  
  // Memoize config objects to ensure stable references
  const cashConfig = useMemo(() => cashConfigKey ? getCashConfig(cashConfigKey) : undefined, [cashConfigKey]);
  const betConfig = useMemo(() => betConfigKey ? getBetConfig(betConfigKey) : undefined, [betConfigKey]);
  
  // Determine bet types: use betConfig if single bet, otherwise use betTypes array (default to STRAIGHT+SPLIT)
  // Use JSON.stringify for stable comparison of betTypes array to avoid infinite re-renders
  const betTypesKey = JSON.stringify(betTypesParam);
  const allowedBetTypes: BetType[] = useMemo(() => betConfig 
    ? [betConfig.type as BetType]
    : (betTypesParam ?? ['STRAIGHT', 'SPLIT']), [betConfig, betTypesKey]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const isSingleBet = allowedBetTypes.length === 1;
  
  const [winningNumber, setWinningNumber] = useState<RouletteNumber>(0);
  const [bets, setBets] = useState<Bet[]>([]);
  const [questionType, setQuestionType] = useState<QuestionType>('ASK_PAYOUT');
  const [cashRequest, setCashRequest] = useState(0);
  const [remainingChips, setRemainingChips] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
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

  const generateNewQuestion = useCallback((retryCount = 0) => {
    setIsLoading(true);
    const MAX_RETRIES = 10;
    
    let newBets: Bet[];
    let number: RouletteNumber;
    
    // For single bet type, use betConfig's generatePossibleBets if available
    if (isSingleBet && betConfig) {
      const possibleBets = betConfig.generatePossibleBets();
      const { bet, number: winningNumber } = generateSingleBetFromConfig(
        possibleBets,
        allowedBetTypes[0],
        chipCountParam
      );
      newBets = [bet];
      number = winningNumber;
    } else {
      // For multiple bets, pick a random winning number (0-12)
      number = getRandomInt(0, 12) as RouletteNumber;
      newBets = generateBetsForNumber(number, allowedBetTypes, chipCountParam);
    }

    setWinningNumber(number);
    setBets(newBets);
    
    // Handle cash handling logic if cashConfig is present
    if (cashConfig) {
      const totalPayout = newBets.filter(bet => bet && bet.chips != null && bet.payout != null).reduce((total, bet) => total + (bet.chips * bet.payout), 0);
      const totalCash = totalPayout * cashConfig.denomination;
      
      // Get valid cash options from config
      const validCashOptions = cashConfig.getCashOptions(totalCash);
      
      // If no valid cash options, regenerate with retry limit
      if (validCashOptions.length === 0) {
        if (retryCount < MAX_RETRIES) {
          generateNewQuestion(retryCount + 1);
        } else {
          // Fallback: use default cash request
          setCashRequest(50);
          setRemainingChips(totalPayout - 50 / cashConfig.denomination);
          setQuestionType('ASK_CHIPS');
          resetAnswer();
          setIsLoading(false);
        }
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
    setIsLoading(false);
  }, [isSingleBet, betConfig, allowedBetTypes, cashConfig, resetAnswer, chipCountParam]);

  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

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

  // Show loading spinner during initial load
  if (isLoading && bets.length === 0) {
    return <LoadingSpinner message="Generating question..." />;
  }

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
      isLoading={isLoading}
    />
  );
}

export default CalculationScreen;

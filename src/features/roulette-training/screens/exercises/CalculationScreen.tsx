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
      const totalPayout = newBets.reduce((total, bet) => total + (bet.chips * bet.payout), 0);
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
    const totalPayout = bets.reduce((total, bet) => total + (bet.chips * bet.payout), 0);
    
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

  const getHintPayoutInfo = () => {
    const lines: string[] = [];
    if (allowedBetTypes.includes('STRAIGHT')) lines.push('• Straight up: chips × 35');
    if (allowedBetTypes.includes('SPLIT')) lines.push('• Split: chips × 17');
    if (allowedBetTypes.includes('CORNER')) lines.push('• Corner: chips × 8');
    if (allowedBetTypes.includes('STREET')) lines.push('• Street: chips × 11');
    if (allowedBetTypes.includes('SIX_LINE')) lines.push('• Six Line: chips × 5');
    return lines.join('\n');
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

  const hintContent = (
    <>
      {cashConfig && (
        <>
          • Chip denomination: <Text style={exerciseTextStyles.highlightNumber}>${cashConfig.denomination}</Text>{'\n'}
        </>
      )}
      {isSingleBet && betConfig && questionType === 'ASK_PAYOUT' ? (
        <>
          {betConfig.hintText}{'\n\n'}
          {betConfig.name} <Text style={exerciseTextStyles.highlightNumber}>{betConfig.formatNumbers(bets[0]?.numbers || [])}</Text> has{' '}
          <Text style={exerciseTextStyles.highlightChips}>{bets[0]?.chips || 0}</Text>{' '}
          {(bets[0]?.chips === 1) ? 'chip' : 'chips'} on it.
        </>
      ) : questionType === 'ASK_PAYOUT' ? (
        <>
          • Winning number: <Text style={exerciseTextStyles.highlightNumber}>{winningNumber}</Text>{'\n'}
          • Calculate total payout for all winning bets{'\n'}
          {getHintPayoutInfo()}{'\n'}
          • Add all payouts together{'\n\n'}
          <Text style={exerciseTextStyles.hintTitle}>Bets on winning number:{'\n'}</Text>
          {bets.map((bet, index) => (
            <Text key={index} style={exerciseTextStyles.hintBet}>
              {index + 1}. {getBetTypeName(bet.type)}{' '}
              <Text style={exerciseTextStyles.highlightNumber}>
                {bet.type === 'STRAIGHT' ? bet.numbers[0] : bet.numbers.join('-')}
              </Text>
              {' with '}
              <Text style={exerciseTextStyles.highlightChips}>{bet.chips}</Text>
              {' '}{bet.chips === 1 ? 'chip' : 'chips'}{'\n'}
            </Text>
          ))}
        </>
      ) : (
        <>
          • Winning number: <Text style={exerciseTextStyles.highlightNumber}>{winningNumber}</Text>{'\n'}
          {bets.map((bet, index) => (
            <Text key={index}>
              • {getBetTypeName(bet.type)}{' '}
              <Text style={exerciseTextStyles.highlightNumber}>
                {bet.type === 'STRAIGHT' ? bet.numbers[0] : bet.numbers.join('-')}
              </Text>
              {': '}
              <Text style={exerciseTextStyles.highlightChips}>{bet.chips}</Text>
              {' × '}{bet.payout} = {bet.chips * bet.payout} chips{'\n'}
            </Text>
          ))}
          • Total payout: <Text style={exerciseTextStyles.highlightNumber}>{bets.reduce((sum, b) => sum + (b.chips * b.payout), 0)} chips</Text>{'\n'}
          {cashConfig && (
            <>
              • Total cash value: <Text style={exerciseTextStyles.highlightNumber}>${bets.reduce((sum, b) => sum + (b.chips * b.payout), 0) * cashConfig.denomination}</Text>{'\n'}
              {'\n'}
              <Text style={exerciseTextStyles.hintTitle}>Cash Handling:{'\n'}</Text>
              • Total must equal: <Text style={exerciseTextStyles.highlightNumber}>${bets.reduce((sum, b) => sum + (b.chips * b.payout), 0) * cashConfig.denomination}</Text>{'\n'}
              • Formula: (Chips × ${cashConfig.denomination}) + Cash = Total{'\n'}
              • Therefore: {remainingChips} chips (${remainingChips * cashConfig.denomination}) + ${cashRequest} cash = ${bets.reduce((sum, b) => sum + (b.chips * b.payout), 0) * cashConfig.denomination}{'\n'}
            </>
          )}
        </>
      )}
    </>
  );

  const getExplanationText = (): string => {
    const totalPayout = bets.reduce((sum, b) => sum + (b.chips * b.payout), 0);
    
    if (questionType === 'ASK_PAYOUT') {
      if (isSingleBet && bets[0]) {
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
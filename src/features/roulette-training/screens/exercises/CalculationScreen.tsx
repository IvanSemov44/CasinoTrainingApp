import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { RouletteNumber } from '@app-types/roulette.types';
import { getCashConfig, type CashConfigKey } from '@config/cashConfigs';
import { getBetConfig, type BetConfigKey } from '@config/betConfigs';
import ExerciseLayout from '../../components/ExerciseLayout';
import { useExerciseState } from '../../hooks/useExerciseState';
import { exerciseTextStyles } from '../../utils/exerciseStyles';
import { 
  type Bet, 
  type BetType, 
  getBetTypeName, 
  getBetPayout,
  generateBetExplanation, 
  createMockBets,
  getSplitsForNumber,
  getCornersForNumber,
  getStreetsForNumber,
  getSixLinesForNumber
} from '../../utils/exerciseHelpers';

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
    const newBets: Bet[] = [];
    let number: RouletteNumber;
    
    // For single bet type, use betConfig's generatePossibleBets if available
    if (isSingleBet && betConfig) {
      const possibleBets = betConfig.generatePossibleBets();
      const randomBet = possibleBets[Math.floor(Math.random() * possibleBets.length)];
      number = randomBet[Math.floor(Math.random() * randomBet.length)];
      
      const randomChips = Math.floor(Math.random() * 5) + 1;
      newBets.push({
        type: allowedBetTypes[0],
        numbers: randomBet,
        chips: randomChips,
        payout: getBetPayout(allowedBetTypes[0]),
      });
    } else {
      // For multiple bets, pick a random winning number (0-12)
      number = Math.floor(Math.random() * 13) as RouletteNumber;
      
      // Add straight up bet if included
      if (allowedBetTypes.includes('STRAIGHT')) {
        const straightChips = Math.floor(Math.random() * 3) + 1;
        newBets.push({
          type: 'STRAIGHT',
          numbers: [number],
          chips: straightChips,
          payout: getBetPayout('STRAIGHT'),
        });
      }
      
      // Add splits if included
      if (allowedBetTypes.includes('SPLIT')) {
        const possibleSplits = getSplitsForNumber(number);
        if (possibleSplits.length > 0) {
          const numSplits = Math.min(
            Math.floor(Math.random() * 2) + 1,
            possibleSplits.length
          );
          
          const shuffled = [...possibleSplits].sort(() => Math.random() - 0.5);
          for (let i = 0; i < numSplits; i++) {
            const chips = Math.floor(Math.random() * 3) + 1;
            newBets.push({
              type: 'SPLIT',
              numbers: shuffled[i],
              chips,
              payout: getBetPayout('SPLIT'),
            });
          }
        }
      }

      // Add corners if included
      if (allowedBetTypes.includes('CORNER')) {
        const possibleCorners = getCornersForNumber(number);
        if (possibleCorners.length > 0 && Math.random() > 0.3) {
          const numCorners = Math.min(
            Math.floor(Math.random() * 2) + 1,
            possibleCorners.length
          );
          
          const shuffledCorners = [...possibleCorners].sort(() => Math.random() - 0.5);
          for (let i = 0; i < numCorners; i++) {
            const cornerChips = Math.floor(Math.random() * 3) + 1;
            newBets.push({
              type: 'CORNER',
              numbers: shuffledCorners[i],
              chips: cornerChips,
              payout: getBetPayout('CORNER'),
            });
          }
        }
      }

      // Add streets if included
      if (allowedBetTypes.includes('STREET')) {
        const possibleStreets = getStreetsForNumber(number);
        if (possibleStreets.length > 0 && Math.random() > 0.4) {
          const streetIdx = Math.floor(Math.random() * possibleStreets.length);
          const streetChips = Math.floor(Math.random() * 3) + 1;
          newBets.push({
            type: 'STREET',
            numbers: possibleStreets[streetIdx],
            chips: streetChips,
            payout: getBetPayout('STREET'),
          });
        }
      }

      // Add six lines if included
      if (allowedBetTypes.includes('SIX_LINE')) {
        const possibleSixLines = getSixLinesForNumber(number);
        if (possibleSixLines.length > 0 && Math.random() > 0.5) {
          const sixLineIdx = Math.floor(Math.random() * possibleSixLines.length);
          const sixLineChips = Math.floor(Math.random() * 3) + 1;
          newBets.push({
            type: 'SIX_LINE',
            numbers: possibleSixLines[sixLineIdx],
            chips: sixLineChips,
            payout: getBetPayout('SIX_LINE'),
          });
        }
      }
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
      
      const selectedCash = validCashOptions[Math.floor(Math.random() * validCashOptions.length)];
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
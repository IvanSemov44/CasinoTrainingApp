import { useState, useEffect, useCallback, useMemo } from 'react';
import { RouletteNumber } from '@app-types/roulette.types';
import { getCashConfig, type CashConfigKey } from '@config/cashConfigs';
import { getBetConfig, type BetConfigKey } from '@config/betConfigs';
import { useExerciseState } from './useExerciseState';
import type { Bet, BetType } from '../types/exercise.types';
import {
  generateBetExplanation,
  createMockBets,
} from '../utils/exerciseHelpers';
import { generateBetsForNumber, generateSingleBetFromConfig } from '../utils/betGenerators';
import { getRandomInt, getRandomElement } from '../utils/randomUtils';
import { generateHintContent } from '../utils/hintGenerators';

type QuestionType = 'ASK_PAYOUT' | 'ASK_CHIPS' | 'ASK_CASH';

export interface CalculationRouteParams {
  betConfigKey?: BetConfigKey;
  cashConfigKey?: CashConfigKey;
  betTypes?: BetType[];
  chipCount?: number;
}

export function useCalculationQuestion(params: CalculationRouteParams) {
  const cashConfig = useMemo(
    () => (params.cashConfigKey ? getCashConfig(params.cashConfigKey) : undefined),
    [params.cashConfigKey],
  );
  const betConfig = useMemo(
    () => (params.betConfigKey ? getBetConfig(params.betConfigKey) : undefined),
    [params.betConfigKey],
  );

  const betTypesKey = JSON.stringify(params.betTypes);
  const allowedBetTypes: BetType[] = useMemo(
    () => (betConfig ? [betConfig.type as BetType] : (params.betTypes ?? ['STRAIGHT', 'SPLIT'])),
    [betConfig, betTypesKey],
  );

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

    if (isSingleBet && betConfig) {
      const possibleBets = betConfig.generatePossibleBets();
      const { bet, number: winning } = generateSingleBetFromConfig(
        possibleBets,
        allowedBetTypes[0],
        params.chipCount,
      );
      newBets = [bet];
      number = winning;
    } else {
      number = getRandomInt(0, 12) as RouletteNumber;
      newBets = generateBetsForNumber(number, allowedBetTypes, params.chipCount);
    }

    setWinningNumber(number);
    setBets(newBets);

    if (cashConfig) {
      const totalPayout = newBets
        .filter((bet) => bet && bet.chips != null && bet.payout != null)
        .reduce((total, bet) => total + (bet.chips * bet.payout), 0);
      const totalCash = totalPayout * cashConfig.denomination;
      const validCashOptions = cashConfig.getCashOptions(totalCash);

      if (validCashOptions.length === 0) {
        if (retryCount < MAX_RETRIES) {
          generateNewQuestion(retryCount + 1);
        } else {
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
      const calculatedChips = (totalCash - selectedCash) / cashConfig.denomination;
      setRemainingChips(calculatedChips);
      setQuestionType((prev) => (prev === 'ASK_CHIPS' ? 'ASK_CASH' : 'ASK_CHIPS'));
    } else {
      setQuestionType('ASK_PAYOUT');
    }

    resetAnswer();
    setIsLoading(false);
  }, [isSingleBet, betConfig, allowedBetTypes, params.chipCount, cashConfig, resetAnswer]);

  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  const correctAnswer = useMemo(() => {
    const totalPayout = bets
      .filter((bet) => bet && bet.chips != null && bet.payout != null)
      .reduce((total, bet) => total + (bet.chips * bet.payout), 0);

    if (questionType === 'ASK_PAYOUT') {
      return totalPayout;
    }
    if (questionType === 'ASK_CHIPS') {
      return remainingChips;
    }
    return cashRequest;
  }, [bets, questionType, remainingChips, cashRequest]);

  const handleCheckAnswer = useCallback(() => {
    checkAnswer(correctAnswer);
  }, [checkAnswer, correctAnswer]);

  const handleNextQuestion = useCallback(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  const answerLabel = useMemo(() => {
    if (cashConfig && questionType !== 'ASK_PAYOUT') {
      if (questionType === 'ASK_CHIPS') {
        return `Player wants $${cashRequest} cash.\nHow many chips to pay?`;
      }
      return `Dealer pays ${remainingChips} chips.\nHow much cash to pay?`;
    }
    return cashConfig ? 'Total payout (chips):' : 'Total payout:';
  }, [cashConfig, questionType, cashRequest, remainingChips]);

  const hintContent = useMemo(
    () => generateHintContent(
      questionType,
      isSingleBet,
      bets,
      winningNumber,
      allowedBetTypes,
      cashConfig,
      betConfig,
      remainingChips,
      cashRequest,
    ),
    [questionType, isSingleBet, bets, winningNumber, allowedBetTypes, cashConfig, betConfig, remainingChips, cashRequest],
  );

  const explanation = useMemo(() => {
    const totalPayout = bets
      .filter((b) => b && b.chips != null && b.payout != null)
      .reduce((sum, b) => sum + (b.chips * b.payout), 0);

    if (questionType === 'ASK_PAYOUT') {
      if (isSingleBet && bets[0] && bets[0].payout != null) {
        return `${bets[0].chips} × ${bets[0].payout} = ${totalPayout}`;
      }
      return generateBetExplanation(bets);
    }

    if (cashConfig) {
      const totalCash = totalPayout * cashConfig.denomination;
      return `Payout: ${totalPayout} chips\nTotal cash: ${totalPayout} × $${cashConfig.denomination} = $${totalCash}\nPayout breakdown: ${remainingChips} chips ($${remainingChips * cashConfig.denomination}) + $${cashRequest} cash = $${totalCash}`;
    }

    return '';
  }, [bets, questionType, isSingleBet, cashConfig, remainingChips, cashRequest]);

  return {
    score,
    attempts,
    showHint,
    toggleHint,
    hintContent,
    placedBets: createMockBets(bets),
    answerLabel,
    userAnswer,
    setUserAnswer,
    showFeedback,
    handleCheckAnswer,
    isCorrect,
    correctAnswer,
    explanation,
    handleNextQuestion,
    isLoading,
    showInitialLoading: isLoading && bets.length === 0,
  };
}
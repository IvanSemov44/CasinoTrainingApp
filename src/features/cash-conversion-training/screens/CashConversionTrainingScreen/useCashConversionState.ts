import { useState, useEffect, useCallback, useMemo } from 'react';
import { SectorType, CashRequest, ValidationResult } from '../../types';
import { SECTOR_POSITIONS } from '../../constants/sectors';
import {
  generateRandomCashAmount,
  generateRandomSector,
  generateRandomRequest,
  calculateCorrectAnswer,
  validateAnswer,
} from '../../utils/calculations';

interface UseCashConversionStateProps {
  difficulty: string;
  sector: SectorType;
}

interface UseCashConversionStateReturn {
  currentRequest: CashRequest | null;
  totalBet: string;
  betPerPosition: string;
  change: string;
  activeInput: 'totalBet' | 'betPerPosition' | 'change';
  result: ValidationResult | null;
  stats: { correct: number; total: number };
  isFormComplete: boolean;
  setTotalBet: (value: string) => void;
  setBetPerPosition: (value: string) => void;
  setChange: (value: string) => void;
  setActiveInput: (input: 'totalBet' | 'betPerPosition' | 'change') => void;
  generateNewChallenge: () => void;
  handleCheck: () => void;
  handleNext: () => void;
}

/**
 * Manages state for cash conversion training screen
 * Handles challenge generation, form state, validation, and stats tracking
 */
export function useCashConversionState({
  difficulty,
  sector,
}: UseCashConversionStateProps): UseCashConversionStateReturn {
  const [currentRequest, setCurrentRequest] = useState<CashRequest | null>(null);
  const [totalBet, setTotalBet] = useState('');
  const [betPerPosition, setBetPerPosition] = useState('');
  const [change, setChange] = useState('');
  const [activeInput, setActiveInput] = useState<'totalBet' | 'betPerPosition' | 'change'>('totalBet');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const generateNewChallenge = useCallback(() => {
    const selectedSector = sector === 'random' ? generateRandomSector() : (sector as Exclude<SectorType, 'random'>);
    const cashAmount = generateRandomCashAmount(difficulty, selectedSector);
    const request = generateRandomRequest(selectedSector, cashAmount, difficulty);

    setCurrentRequest(request);
    setTotalBet('');
    setBetPerPosition('');
    setChange('');
    // Set default active input based on request type
    setActiveInput(request.requestType === 'for-the-money' ? 'betPerPosition' : 'totalBet');
    setResult(null);
  }, [difficulty, sector]);

  useEffect(() => {
    generateNewChallenge();
  }, [generateNewChallenge]);

  // Check if form is complete based on request type
  const isFormComplete = useMemo(() => {
    if (!currentRequest) return false;
    return currentRequest.requestType === 'for-the-money'
      ? !!betPerPosition && !!change
      : !!totalBet && !!change;
  }, [currentRequest, betPerPosition, change, totalBet]);

  const handleCheck = useCallback(() => {
    if (!currentRequest) return;

    // For "for-the-money": user enters betPerPosition and change
    // For "by-amount": user enters totalBet and change
    const userAnswer = {
      totalBet: currentRequest.requestType === 'for-the-money'
        ? (parseInt(betPerPosition, 10) || 0) * (SECTOR_POSITIONS[currentRequest.sector] || 1)
        : parseInt(totalBet, 10),
      betPerPosition: currentRequest.requestType === 'for-the-money'
        ? parseInt(betPerPosition, 10)
        : (currentRequest.specifiedAmount || 0),
      change: parseInt(change, 10),
    };

    const correctAnswer = calculateCorrectAnswer(currentRequest, difficulty);
    const validationResult = validateAnswer(userAnswer, correctAnswer);

    setResult(validationResult);
    setStats(prev => ({
      correct: prev.correct + (validationResult.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  }, [currentRequest, difficulty, betPerPosition, totalBet, change]);

  const handleNext = useCallback(() => {
    generateNewChallenge();
  }, [generateNewChallenge]);

  return {
    currentRequest,
    totalBet,
    betPerPosition,
    change,
    activeInput,
    result,
    stats,
    isFormComplete,
    setTotalBet,
    setBetPerPosition,
    setChange,
    setActiveInput,
    generateNewChallenge,
    handleCheck,
    handleNext,
  };
}

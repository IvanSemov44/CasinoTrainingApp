import { CashRequest, CashAnswer, ValidationResult, DifficultyLevel, SectorType } from '../types';
import { SECTOR_POSITIONS, DIFFICULTY_MAX_BET, MIN_BET_PER_POSITION, BET_INCREMENT } from '../constants/sectors';

export function calculateCorrectAnswer(
  request: CashRequest,
  difficulty: DifficultyLevel
): CashAnswer {
  const positions = SECTOR_POSITIONS[request.sector];
  const maxBetPerPosition = DIFFICULTY_MAX_BET[difficulty];

  let betPerPosition: number;

  if (request.requestType === 'for-the-money') {
    // Calculate maximum bet per position from available cash
    const rawBet = request.cashAmount / positions;
    
    // Round down to nearest $5 increment
    betPerPosition = Math.floor(rawBet / BET_INCREMENT) * BET_INCREMENT;
    
    // Apply difficulty cap
    betPerPosition = Math.min(betPerPosition, maxBetPerPosition);
    
    // Ensure minimum bet
    betPerPosition = Math.max(betPerPosition, MIN_BET_PER_POSITION);
  } else {
    // Customer specified exact amount per position
    betPerPosition = request.specifiedAmount!;
  }

  const totalBet = betPerPosition * positions;
  const change = request.cashAmount - totalBet;

  return {
    totalBet,
    betPerPosition,
    change,
  };
}

export function validateAnswer(
  userAnswer: CashAnswer,
  correctAnswer: CashAnswer
): ValidationResult {
  const isCorrect =
    userAnswer.totalBet === correctAnswer.totalBet &&
    userAnswer.betPerPosition === correctAnswer.betPerPosition &&
    userAnswer.change === correctAnswer.change;

  return {
    isCorrect,
    correctTotalBet: correctAnswer.totalBet,
    correctChange: correctAnswer.change,
    userTotalBet: userAnswer.totalBet,
    userChange: userAnswer.change,
    correctBetPerPosition: correctAnswer.betPerPosition,
    userBetPerPosition: userAnswer.betPerPosition,
  };
}

// Cash amount ranges by difficulty
const CASH_RANGES: Record<DifficultyLevel, { min: number; max: number }> = {
  easy: { min: 100, max: 300 },
  medium: { min: 300, max: 600 },
  hard: { min: 600, max: 1200 },
};

export function generateRandomCashAmount(difficulty: DifficultyLevel, sector?: Exclude<SectorType, 'random'>): number {
  const maxBet = DIFFICULTY_MAX_BET[difficulty];
  const range = CASH_RANGES[difficulty];
  
  // If sector is specified, calculate the maximum total for that sector
  const maxTotal = sector ? maxBet * SECTOR_POSITIONS[sector] : null;
  
  // Generate amounts within the difficulty range, in increments of 25
  const possibleAmounts: number[] = [];
  for (let amount = range.min; amount <= Math.min(range.max, maxTotal || range.max); amount += 25) {
    possibleAmounts.push(amount);
  }
  
  // Filter amounts based on difficulty and sector to ensure we get meaningful exercises
  const filteredAmounts = possibleAmounts.filter(amount => {
    const minPositions = 4; // Zero has 4 positions
    const maxPositions = 9; // Voisins has 9 positions
    
    // Ensure the amount can produce bets within the difficulty range
    const minPossibleBet = amount / maxPositions;
    const maxPossibleBet = amount / minPositions;
    
    return maxPossibleBet >= MIN_BET_PER_POSITION && minPossibleBet <= maxBet;
  });
  
  return filteredAmounts[Math.floor(Math.random() * filteredAmounts.length)] || range.min;
}

export function generateRandomSector(): Exclude<SectorType, 'random'> {
  const sectors: Exclude<SectorType, 'random'>[] = ['tier', 'orphelins', 'voisins', 'zero', 'neighbors'];
  return sectors[Math.floor(Math.random() * sectors.length)];
}

export function generateRandomRequest(
  sector: Exclude<SectorType, 'random'>,
  cashAmount: number,
  difficulty: DifficultyLevel
): CashRequest {
  const requestType = Math.random() > 0.5 ? 'for-the-money' : 'by-amount';
  const positions = SECTOR_POSITIONS[sector];
  const maxBet = DIFFICULTY_MAX_BET[difficulty];
  const maxChange = 100; // Maximum allowed change/rest
  
  if (requestType === 'for-the-money') {
    // For "for-the-money", calculate what the actual bet would be
    const rawBet = cashAmount / positions;
    let betPerPosition = Math.floor(rawBet / BET_INCREMENT) * BET_INCREMENT;
    betPerPosition = Math.min(betPerPosition, maxBet);
    betPerPosition = Math.max(betPerPosition, MIN_BET_PER_POSITION);
    const totalBet = betPerPosition * positions;
    const change = cashAmount - totalBet;
    
    // If change would be too high, adjust cash amount to be closer to a valid total
    if (change >= maxChange) {
      // Find a cash amount that results in change < maxChange
      // Try amounts close to multiples of (betPerPosition * positions)
      const targetTotal = totalBet;
      const adjustedCash = targetTotal + Math.floor(Math.random() * maxChange);
      return {
        cashAmount: adjustedCash,
        sector,
        requestType: 'for-the-money',
      };
    }
    
    return {
      cashAmount,
      sector,
      requestType: 'for-the-money',
    };
  } else {
    // Generate a valid "by-amount" request with change < maxChange
    const possibleBets: number[] = [];
    
    for (let bet = MIN_BET_PER_POSITION; bet <= maxBet; bet += BET_INCREMENT) {
      const totalBet = bet * positions;
      const change = cashAmount - totalBet;
      
      // Only include bets that result in valid change (0 <= change < maxChange)
      if (change >= 0 && change < maxChange) {
        possibleBets.push(bet);
      }
    }
    
    // If no valid bets found, adjust cash amount to work with a random bet
    if (possibleBets.length === 0) {
      const randomBet = Math.floor(Math.random() * (maxBet / BET_INCREMENT)) * BET_INCREMENT + MIN_BET_PER_POSITION;
      const adjustedCash = randomBet * positions + Math.floor(Math.random() * maxChange);
      return {
        cashAmount: adjustedCash,
        sector,
        requestType: 'by-amount',
        specifiedAmount: randomBet,
      };
    }
    
    const specifiedAmount = possibleBets[Math.floor(Math.random() * possibleBets.length)];
    
    return {
      cashAmount,
      sector,
      requestType: 'by-amount',
      specifiedAmount,
    };
  }
}

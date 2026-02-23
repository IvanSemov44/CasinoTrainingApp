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

// Step increment for all difficulties ($25)
const CASH_STEP = 25;

// Minimum cash amounts by difficulty (as percentage of max)
const MIN_CASH_PERCENTAGE: Record<DifficultyLevel, number> = {
  easy: 0,     // Start from minimum viable amount
  medium: 0.4, // 40% of max cash
  hard: 0.4,   // 40% of max cash
};

export function generateRandomCashAmount(difficulty: DifficultyLevel, sector?: Exclude<SectorType, 'random'>): number {
  const maxBet = DIFFICULTY_MAX_BET[difficulty];
  const minPercentage = MIN_CASH_PERCENTAGE[difficulty];
  
  // Calculate max cash based on sector: maxBet × positions
  // If no sector specified, use Tier (6 positions) as default
  const positions = sector ? SECTOR_POSITIONS[sector] : 6;
  const maxCash = maxBet * positions;
  
  // Calculate absolute minimum: positions × $5, rounded up to nearest $25
  // This ensures the cash amount can always cover at least $5 per position
  const absoluteMinCash = Math.ceil(positions * MIN_BET_PER_POSITION / CASH_STEP) * CASH_STEP;
  
  // Calculate minimum cash from percentage (for medium/hard difficulties)
  const percentageMinCash = Math.ceil(maxCash * minPercentage / CASH_STEP) * CASH_STEP;
  
  // Use the higher of absolute minimum or percentage minimum
  const minCash = Math.max(absoluteMinCash, percentageMinCash);
  
  // Generate possible amounts from min to max with step
  const possibleAmounts: number[] = [];
  for (let amount = minCash; amount <= maxCash; amount += CASH_STEP) {
    possibleAmounts.push(amount);
  }
  
  return possibleAmounts[Math.floor(Math.random() * possibleAmounts.length)];
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
      // Ensure adjustedCash is a multiple of CASH_STEP ($25)
      const targetTotal = totalBet;
      const maxChangeInSteps = Math.floor(maxChange / CASH_STEP);
      const changeInSteps = Math.floor(Math.random() * maxChangeInSteps);
      const adjustedCash = targetTotal + changeInSteps * CASH_STEP;
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
      // Ensure adjustedCash is a multiple of CASH_STEP ($25)
      const maxChangeInSteps = Math.floor(maxChange / CASH_STEP);
      const changeInSteps = Math.floor(Math.random() * maxChangeInSteps);
      const adjustedCash = randomBet * positions + changeInSteps * CASH_STEP;
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

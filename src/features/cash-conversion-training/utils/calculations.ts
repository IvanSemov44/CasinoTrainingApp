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
    change,
  };
}

export function validateAnswer(
  userAnswer: CashAnswer,
  correctAnswer: CashAnswer,
  positions: number
): ValidationResult {
  const isCorrect =
    userAnswer.totalBet === correctAnswer.totalBet &&
    userAnswer.change === correctAnswer.change;

  return {
    isCorrect,
    correctTotalBet: correctAnswer.totalBet,
    correctChange: correctAnswer.change,
    userTotalBet: userAnswer.totalBet,
    userChange: userAnswer.change,
    correctBetPerPosition: correctAnswer.totalBet / positions,
  };
}

export function generateRandomCashAmount(difficulty: DifficultyLevel): number {
  const maxBet = DIFFICULTY_MAX_BET[difficulty];
  
  // Generate amounts that make sense for the difficulty level
  const possibleAmounts = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000];
  
  // Filter amounts based on difficulty to ensure we get meaningful exercises
  const filteredAmounts = possibleAmounts.filter(amount => {
    const minPositions = 4; // Zero has 4 positions
    const maxPositions = 9; // Voisins has 9 positions
    
    // Ensure the amount can produce bets within the difficulty range
    const minPossibleBet = amount / maxPositions;
    const maxPossibleBet = amount / minPositions;
    
    return maxPossibleBet >= MIN_BET_PER_POSITION && minPossibleBet <= maxBet;
  });
  
  return filteredAmounts[Math.floor(Math.random() * filteredAmounts.length)] || 500;
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
  
  if (requestType === 'for-the-money') {
    return {
      cashAmount,
      sector,
      requestType: 'for-the-money',
    };
  } else {
    // Generate a valid "by-amount" request
    const maxBet = DIFFICULTY_MAX_BET[difficulty];
    const positions = SECTOR_POSITIONS[sector];
    
    // Choose a random bet amount that's valid
    const possibleBets = [];
    for (let bet = MIN_BET_PER_POSITION; bet <= Math.min(maxBet, Math.floor(cashAmount / positions)); bet += BET_INCREMENT) {
      possibleBets.push(bet);
    }
    
    const specifiedAmount = possibleBets[Math.floor(Math.random() * possibleBets.length)] || MIN_BET_PER_POSITION;
    
    return {
      cashAmount,
      sector,
      requestType: 'by-amount',
      specifiedAmount,
    };
  }
}

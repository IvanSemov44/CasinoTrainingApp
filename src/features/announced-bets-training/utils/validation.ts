import { PlacedBet } from '../../../types/roulette.types';
import { ANNOUNCED_BETS } from '../../racetrack/constants/announcedBets.constants';
import { ValidationResult, AnnouncedBetMode } from '../types';

/**
 * Normalize bet for comparison (sort numbers, ignore amount/id/timestamp)
 */
function normalizeBet(bet: PlacedBet | { type: string; numbers: number[] }) {
  return {
    type: bet.type.toString(),
    numbers: [...bet.numbers].sort((a, b) => a - b),
  };
}

/**
 * Check if two bets are equal
 */
function betsAreEqual(bet1: { type: string; numbers: number[] }, bet2: { type: string; numbers: number[] }): boolean {
  if (bet1.type !== bet2.type) return false;
  if (bet1.numbers.length !== bet2.numbers.length) return false;
  return bet1.numbers.every((num, idx) => num === bet2.numbers[idx]);
}

/**
 * Validate user's placed bets against the correct announced bet
 */
export function validateAnnouncedBet(
  mode: Exclude<AnnouncedBetMode, 'random'>,
  userBets: PlacedBet[]
): ValidationResult {
  const betDefinition = ANNOUNCED_BETS[mode];
  
  if (!betDefinition) {
    return {
      isCorrect: false,
      correctBets: [],
      userBets: [],
      missingBets: [],
      extraBets: [],
      score: 0,
    };
  }

  // Normalize all bets
  const correctBetsNormalized = betDefinition.bets.map(normalizeBet);
  const userBetsNormalized = userBets.map(normalizeBet);

  // Find missing bets (correct bets not placed by user)
  const missingBets = correctBetsNormalized.filter(
    correctBet => !userBetsNormalized.some(userBet => betsAreEqual(correctBet, userBet))
  );

  // Find extra bets (user placed bets that are not correct)
  const extraBets = userBetsNormalized.filter(
    userBet => !correctBetsNormalized.some(correctBet => betsAreEqual(correctBet, userBet))
  );

  // Calculate score
  const correctCount = correctBetsNormalized.length - missingBets.length;
  const totalRequired = correctBetsNormalized.length;
  const score = totalRequired > 0 ? Math.round((correctCount / totalRequired) * 100) : 0;

  return {
    isCorrect: missingBets.length === 0 && extraBets.length === 0,
    correctBets: correctBetsNormalized,
    userBets: userBetsNormalized,
    missingBets,
    extraBets,
    score,
  };
}

/**
 * Get a random announced bet mode (excluding 'random')
 */
export function getRandomMode(): Exclude<AnnouncedBetMode, 'random'> {
  const modes: Array<Exclude<AnnouncedBetMode, 'random'>> = ['tier', 'orphelins', 'voisins', 'zero'];
  return modes[Math.floor(Math.random() * modes.length)];
}

/**
 * Get display name for a mode
 */
export function getModeDisplayName(mode: AnnouncedBetMode): string {
  const names: Record<AnnouncedBetMode, string> = {
    tier: 'Tier du Cylindre',
    orphelins: 'Orphelins',
    voisins: 'Voisins du Zéro',
    zero: 'Jeu Zéro',
    random: 'Random',
  };
  return names[mode];
}

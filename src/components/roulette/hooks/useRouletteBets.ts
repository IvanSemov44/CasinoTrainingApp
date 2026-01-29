import { RouletteNumber, PlacedBet } from '../../../types/roulette.types';

export const useRouletteBets = (placedBets: PlacedBet[]) => {
  const getBetAmount = (numbers: RouletteNumber[]) => {
    const matchingBets = placedBets.filter(bet => {
      // Check if same length
      if (bet.numbers.length !== numbers.length) return false;
      
      // Sort both arrays and compare
      const sortedBetNumbers = [...bet.numbers].sort((a, b) => a - b);
      const sortedNumbers = [...numbers].sort((a, b) => a - b);
      
      return sortedBetNumbers.every((n, i) => n === sortedNumbers[i]);
    });
    
    return matchingBets.reduce((sum, bet) => sum + bet.amount, 0);
  };

  return { getBetAmount };
};

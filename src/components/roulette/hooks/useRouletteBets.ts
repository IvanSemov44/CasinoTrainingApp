import { RouletteNumber, PlacedBet } from '../../../types/roulette.types';

export const useRouletteBets = (placedBets: PlacedBet[]) => {
  const getBetAmount = (numbers: RouletteNumber[]) => {
    return placedBets
      .filter(bet => 
        bet.numbers.length === numbers.length &&
        bet.numbers.every(n => numbers.includes(n))
      )
      .reduce((sum, bet) => sum + bet.amount, 0);
  };

  return { getBetAmount };
};

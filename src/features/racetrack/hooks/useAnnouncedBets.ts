import { useCallback } from 'react';
import { PlacedBet, BetType, RouletteNumber } from '../../../types/roulette.types';
import { ANNOUNCED_BETS, PAYOUTS } from '../constants/announcedBets.constants';
import { getNeighbors } from '../utils/racetrack.utils';

type SectionType = 'tier' | 'orphelins' | 'voisins' | 'zero';

interface UseAnnouncedBetsProps {
  selectedChipValue: number;
  onBetsPlaced: (bets: PlacedBet[]) => void;
}

/**
 * Create a bet object
 */
function createBet(
  prefix: string,
  type: BetType,
  numbers: number[],
  amount: number
): PlacedBet {
  return {
    id: `${prefix}-${numbers.join('-')}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    numbers: numbers as RouletteNumber[],
    amount,
    payout: PAYOUTS[type],
    timestamp: Date.now(),
  };
}

/**
 * Hook for handling announced bets on the racetrack
 */
export function useAnnouncedBets({ selectedChipValue, onBetsPlaced }: UseAnnouncedBetsProps) {
  
  /**
   * Handle section press (Tier, Orphelins, Voisins, Zero)
   */
  const handleSectionPress = useCallback((section: SectionType) => {
    const betDefinition = ANNOUNCED_BETS[section];
    if (!betDefinition) return;

    const newBets: PlacedBet[] = betDefinition.bets.map(bet => {
      const multiplier = bet.multiplier || 1;
      return createBet(
        `${section}-${bet.type.toLowerCase()}`,
        bet.type,
        bet.numbers,
        selectedChipValue * multiplier
      );
    });

    onBetsPlaced(newBets);
  }, [selectedChipValue, onBetsPlaced]);

  /**
   * Handle number press (Neighbors bet)
   */
  const handleNumberPress = useCallback((numberStr: string) => {
    const number = parseInt(numberStr, 10);
    const neighbors = getNeighbors(number, 2);
    
    if (neighbors.length === 0) return;

    const newBets: PlacedBet[] = neighbors.map(num => 
      createBet('neighbors-straight', BetType.STRAIGHT, [num], selectedChipValue)
    );

    onBetsPlaced(newBets);
  }, [selectedChipValue, onBetsPlaced]);

  return {
    handleSectionPress,
    handleNumberPress,
  };
}

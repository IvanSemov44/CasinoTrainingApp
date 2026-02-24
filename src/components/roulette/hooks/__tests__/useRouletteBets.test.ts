/**
 * Unit tests for useRouletteBets hook
 * Tests bet amount calculation for roulette
 */
import { renderHook } from '@testing-library/react-native';
import { useRouletteBets } from '../useRouletteBets';
import { PlacedBet, BetType } from '../../../../types/roulette.types';

describe('useRouletteBets', () => {
  describe('getBetAmount', () => {
    it('should return 0 for empty placed bets', () => {
      const { result } = renderHook(() => useRouletteBets([]));
      
      expect(result.current.getBetAmount([5])).toBe(0);
    });

    it('should return correct amount for single number bet', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.STRAIGHT,
          numbers: [5],
          amount: 10,
          payout: 35,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([5])).toBe(10);
    });

    it('should return correct amount for split bet', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.SPLIT,
          numbers: [5, 8],
          amount: 25,
          payout: 17,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([5, 8])).toBe(25);
    });

    it('should match bets regardless of number order', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.SPLIT,
          numbers: [8, 5], // Different order
          amount: 25,
          payout: 17,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([5, 8])).toBe(25);
    });

    it('should sum amounts for multiple matching bets', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.STRAIGHT,
          numbers: [5],
          amount: 10,
          payout: 35,
          timestamp: Date.now(),
        },
        {
          id: 'bet-2',
          type: BetType.STRAIGHT,
          numbers: [5],
          amount: 15,
          payout: 35,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([5])).toBe(25);
    });

    it('should not match bets with different number count', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.STRAIGHT,
          numbers: [5],
          amount: 10,
          payout: 35,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([5, 8])).toBe(0);
    });

    it('should not match bets with different numbers', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.STRAIGHT,
          numbers: [5],
          amount: 10,
          payout: 35,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([6])).toBe(0);
    });

    it('should handle corner bets correctly', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.CORNER,
          numbers: [1, 2, 4, 5],
          amount: 50,
          payout: 8,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([1, 2, 4, 5])).toBe(50);
      expect(result.current.getBetAmount([5, 4, 2, 1])).toBe(50); // Different order
    });

    it('should handle street bets correctly', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.STREET,
          numbers: [4, 5, 6],
          amount: 30,
          payout: 11,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([4, 5, 6])).toBe(30);
    });

    it('should handle six line bets correctly', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.LINE,
          numbers: [1, 2, 3, 4, 5, 6],
          amount: 20,
          payout: 5,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([1, 2, 3, 4, 5, 6])).toBe(20);
    });

    it('should handle invalid bet objects gracefully', () => {
      const placedBets = [
        null,
        undefined,
        { id: 'invalid' }, // Missing numbers
        {
          id: 'bet-1',
          type: BetType.STRAIGHT,
          numbers: [5],
          amount: 10,
          payout: 35,
          timestamp: Date.now(),
        },
      ] as any;
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([5])).toBe(10);
    });

    it('should handle bets with empty numbers array', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.STRAIGHT,
          numbers: [] as any,
          amount: 10,
          payout: 35,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([5])).toBe(0);
    });

    it('should return 0 for empty numbers query', () => {
      const placedBets: PlacedBet[] = [
        {
          id: 'bet-1',
          type: BetType.STRAIGHT,
          numbers: [5],
          amount: 10,
          payout: 35,
          timestamp: Date.now(),
        },
      ];
      
      const { result } = renderHook(() => useRouletteBets(placedBets));
      
      expect(result.current.getBetAmount([])).toBe(0);
    });
  });
});

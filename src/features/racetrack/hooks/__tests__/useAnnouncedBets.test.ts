/**
 * Unit tests for useAnnouncedBets hook
 * Tests announced bet handling for racetrack
 */
import { renderHook, act } from '@testing-library/react-native';
import { useAnnouncedBets } from '../useAnnouncedBets';
import { BetType } from '../../../../types/roulette.types';

describe('useAnnouncedBets', () => {
  const mockOnBetsPlaced = jest.fn();
  const defaultProps = {
    selectedChipValue: 5,
    onBetsPlaced: mockOnBetsPlaced,
  };

  beforeEach(() => {
    mockOnBetsPlaced.mockClear();
  });

  describe('handleSectionPress', () => {
    it('should place tier bets correctly', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleSectionPress('tier');
      });
      
      expect(mockOnBetsPlaced).toHaveBeenCalledTimes(1);
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      
      // Tier has 6 split bets
      expect(placedBets).toHaveLength(6);
      placedBets.forEach((bet: any) => {
        expect(bet.type).toBe(BetType.SPLIT);
        expect(bet.amount).toBe(5);
        expect(bet.numbers).toHaveLength(2);
      });
    });

    it('should place orphelins bets correctly', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleSectionPress('orphelins');
      });
      
      expect(mockOnBetsPlaced).toHaveBeenCalledTimes(1);
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      
      // Orphelins has 5 bets (1 straight, 4 splits)
      expect(placedBets).toHaveLength(5);
      expect(placedBets[0].type).toBe(BetType.STRAIGHT);
    });

    it('should place zero game bets correctly', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleSectionPress('zero');
      });
      
      expect(mockOnBetsPlaced).toHaveBeenCalledTimes(1);
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      
      // Zero game has 4 bets (1 straight, 3 splits)
      expect(placedBets).toHaveLength(4);
    });

    it('should place voisins bets correctly', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleSectionPress('voisins');
      });
      
      expect(mockOnBetsPlaced).toHaveBeenCalledTimes(1);
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      
      // Voisins has 7 bets
      expect(placedBets).toHaveLength(7);
    });

    it('should use selected chip value for bet amount', () => {
      const props = {
        ...defaultProps,
        selectedChipValue: 25,
      };
      
      const { result } = renderHook(() => useAnnouncedBets(props));
      
      act(() => {
        result.current.handleSectionPress('tier');
      });
      
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      placedBets.forEach((bet: any) => {
        expect(bet.amount).toBe(25);
      });
    });

    it('should apply multiplier for bets with multiplier', () => {
      const props = {
        ...defaultProps,
        selectedChipValue: 10,
      };
      
      const { result } = renderHook(() => useAnnouncedBets(props));
      
      act(() => {
        result.current.handleSectionPress('voisins');
      });
      
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      
      // Voisins has multiplier 2 on street and corner bets
      const streetBet = placedBets.find((b: any) => b.type === BetType.STREET);
      const cornerBet = placedBets.find((b: any) => b.type === BetType.CORNER);
      
      if (streetBet) {
        expect(streetBet.amount).toBe(20); // 10 * 2
      }
      if (cornerBet) {
        expect(cornerBet.amount).toBe(20); // 10 * 2
      }
    });

    it('should not place bets for invalid section', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleSectionPress('invalid' as any);
      });
      
      expect(mockOnBetsPlaced).not.toHaveBeenCalled();
    });
  });

  describe('handleNumberPress', () => {
    it('should place neighbor bets for valid number', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleNumberPress('17');
      });
      
      expect(mockOnBetsPlaced).toHaveBeenCalledTimes(1);
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      
      // Neighbors with count 2 = 5 numbers (2 left + center + 2 right)
      expect(placedBets).toHaveLength(5);
      placedBets.forEach((bet: any) => {
        expect(bet.type).toBe(BetType.STRAIGHT);
        expect(bet.amount).toBe(5);
        expect(bet.numbers).toHaveLength(1);
      });
    });

    it('should place neighbor bets for zero', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleNumberPress('0');
      });
      
      expect(mockOnBetsPlaced).toHaveBeenCalledTimes(1);
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      
      expect(placedBets).toHaveLength(5);
      expect(placedBets.some((b: any) => b.numbers[0] === 0)).toBe(true);
    });

    it('should use selected chip value for neighbor bets', () => {
      const props = {
        ...defaultProps,
        selectedChipValue: 100,
      };
      
      const { result } = renderHook(() => useAnnouncedBets(props));
      
      act(() => {
        result.current.handleNumberPress('17');
      });
      
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      placedBets.forEach((bet: any) => {
        expect(bet.amount).toBe(100);
      });
    });

    it('should not place bets for invalid number', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleNumberPress('37');
      });
      
      expect(mockOnBetsPlaced).not.toHaveBeenCalled();
    });

    it('should not place bets for negative number', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleNumberPress('-1');
      });
      
      expect(mockOnBetsPlaced).not.toHaveBeenCalled();
    });
  });

  describe('bet properties', () => {
    it('should create bets with unique IDs', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleSectionPress('tier');
      });
      
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      const ids = placedBets.map((b: any) => b.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(placedBets.length);
    });

    it('should create bets with timestamps', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleSectionPress('tier');
      });
      
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      placedBets.forEach((bet: any) => {
        expect(bet.timestamp).toBeDefined();
        expect(typeof bet.timestamp).toBe('number');
      });
    });

    it('should create bets with correct payout', () => {
      const { result } = renderHook(() => useAnnouncedBets(defaultProps));
      
      act(() => {
        result.current.handleSectionPress('tier');
      });
      
      const placedBets = mockOnBetsPlaced.mock.calls[0][0];
      placedBets.forEach((bet: any) => {
        expect(bet.payout).toBe(17); // Split payout
      });
    });
  });
});

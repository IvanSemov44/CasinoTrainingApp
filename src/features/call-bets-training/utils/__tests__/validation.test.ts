/**
 * Unit tests for call-bets-training validation utilities
 * Tests bet validation logic for announced bets
 */
import { validateCallBet, getRandomMode, getModeDisplayName } from '../validation';
import { PlacedBet } from '../../../../types/roulette.types';
import { BetType } from '../../../../types/roulette.types';

/**
 * Helper function to create a valid PlacedBet for testing
 */
function createMockBet(
  type: BetType,
  numbers: number[],
  amount: number = 5
): PlacedBet {
  return {
    id: `bet-${Date.now()}-${Math.random()}`,
    type,
    numbers: numbers as any,
    amount,
    payout: 0,
    timestamp: Date.now(),
  };
}

describe('validation', () => {
  describe('validateCallBet', () => {
    describe('tier mode', () => {
      it('should return correct result when all bets are placed correctly', () => {
        const userBets: PlacedBet[] = [
          createMockBet(BetType.SPLIT, [5, 8]),
          createMockBet(BetType.SPLIT, [10, 11]),
          createMockBet(BetType.SPLIT, [13, 16]),
          createMockBet(BetType.SPLIT, [23, 24]),
          createMockBet(BetType.SPLIT, [27, 30]),
          createMockBet(BetType.SPLIT, [33, 36]),
        ];

        const result = validateCallBet('tier', userBets);

        expect(result.isCorrect).toBe(true);
        expect(result.score).toBe(100);
        expect(result.missingBets).toHaveLength(0);
        expect(result.extraBets).toHaveLength(0);
      });

      it('should detect missing bets', () => {
        const userBets: PlacedBet[] = [
          createMockBet(BetType.SPLIT, [5, 8]),
          createMockBet(BetType.SPLIT, [10, 11]),
          // Missing: [13, 16], [23, 24], [27, 30], [33, 36]
        ];

        const result = validateCallBet('tier', userBets);

        expect(result.isCorrect).toBe(false);
        expect(result.score).toBe(33); // 2 out of 6 = 33%
        expect(result.missingBets).toHaveLength(4);
      });

      it('should detect extra bets', () => {
        const userBets: PlacedBet[] = [
          createMockBet(BetType.SPLIT, [5, 8]),
          createMockBet(BetType.SPLIT, [10, 11]),
          createMockBet(BetType.SPLIT, [13, 16]),
          createMockBet(BetType.SPLIT, [23, 24]),
          createMockBet(BetType.SPLIT, [27, 30]),
          createMockBet(BetType.SPLIT, [33, 36]),
          createMockBet(BetType.STRAIGHT, [0]), // Extra bet
        ];

        const result = validateCallBet('tier', userBets);

        expect(result.isCorrect).toBe(false);
        expect(result.extraBets).toHaveLength(1);
        expect(result.extraBets[0].numbers).toEqual([0]);
      });

      it('should handle bets with different number order', () => {
        const userBets: PlacedBet[] = [
          createMockBet(BetType.SPLIT, [8, 5]), // Reversed order
          createMockBet(BetType.SPLIT, [11, 10]), // Reversed order
          createMockBet(BetType.SPLIT, [13, 16]),
          createMockBet(BetType.SPLIT, [23, 24]),
          createMockBet(BetType.SPLIT, [27, 30]),
          createMockBet(BetType.SPLIT, [33, 36]),
        ];

        const result = validateCallBet('tier', userBets);

        expect(result.isCorrect).toBe(true);
        expect(result.score).toBe(100);
      });
    });

    describe('orphelins mode', () => {
      it('should validate orphelins bets correctly', () => {
        const userBets: PlacedBet[] = [
          createMockBet(BetType.STRAIGHT, [1]),
          createMockBet(BetType.SPLIT, [6, 9]),
          createMockBet(BetType.SPLIT, [14, 17]),
          createMockBet(BetType.SPLIT, [17, 20]),
          createMockBet(BetType.SPLIT, [31, 34]),
        ];

        const result = validateCallBet('orphelins', userBets);

        expect(result.isCorrect).toBe(true);
        expect(result.score).toBe(100);
      });
    });

    describe('zero mode', () => {
      it('should validate zero game bets correctly', () => {
        const userBets: PlacedBet[] = [
          createMockBet(BetType.STRAIGHT, [26]),
          createMockBet(BetType.SPLIT, [0, 3]),
          createMockBet(BetType.SPLIT, [12, 15]),
          createMockBet(BetType.SPLIT, [32, 35]),
        ];

        const result = validateCallBet('zero', userBets);

        expect(result.isCorrect).toBe(true);
        expect(result.score).toBe(100);
      });
    });

    describe('voisins mode', () => {
      it('should validate voisins bets correctly', () => {
        const userBets: PlacedBet[] = [
          createMockBet(BetType.STREET, [0, 2, 3]),
          createMockBet(BetType.SPLIT, [4, 7]),
          createMockBet(BetType.SPLIT, [12, 15]),
          createMockBet(BetType.SPLIT, [18, 21]),
          createMockBet(BetType.SPLIT, [19, 22]),
          createMockBet(BetType.SPLIT, [32, 35]),
          createMockBet(BetType.CORNER, [25, 26, 28, 29]),
        ];

        const result = validateCallBet('voisins', userBets);

        expect(result.isCorrect).toBe(true);
        expect(result.score).toBe(100);
      });
    });

    describe('edge cases', () => {
      it('should return incorrect for empty user bets', () => {
        const result = validateCallBet('tier', []);

        expect(result.isCorrect).toBe(false);
        expect(result.score).toBe(0);
        expect(result.missingBets.length).toBeGreaterThan(0);
      });

      it('should return incorrect for invalid mode', () => {
        const result = validateCallBet('invalid' as any, []);

        expect(result.isCorrect).toBe(false);
        expect(result.correctBets).toHaveLength(0);
        expect(result.score).toBe(0);
      });

      it('should calculate partial score correctly', () => {
        // Tier has 6 bets, placing 3 should give 50%
        const userBets: PlacedBet[] = [
          createMockBet(BetType.SPLIT, [5, 8]),
          createMockBet(BetType.SPLIT, [10, 11]),
          createMockBet(BetType.SPLIT, [13, 16]),
        ];

        const result = validateCallBet('tier', userBets);

        expect(result.isCorrect).toBe(false);
        expect(result.score).toBe(50);
      });
    });
  });

  describe('getRandomMode', () => {
    it('should return a valid mode', () => {
      const validModes = ['tier', 'orphelins', 'voisins', 'zero'];
      
      for (let i = 0; i < 50; i++) {
        const mode = getRandomMode();
        expect(validModes).toContain(mode);
      }
    });

    it('should eventually return all modes', () => {
      const modes = new Set<string>();
      
      for (let i = 0; i < 100; i++) {
        modes.add(getRandomMode());
      }
      
      expect(modes.has('tier')).toBe(true);
      expect(modes.has('orphelins')).toBe(true);
      expect(modes.has('voisins')).toBe(true);
      expect(modes.has('zero')).toBe(true);
    });
  });

  describe('getModeDisplayName', () => {
    it('should return correct display name for tier', () => {
      expect(getModeDisplayName('tier')).toBe('Tier du Cylindre');
    });

    it('should return correct display name for orphelins', () => {
      expect(getModeDisplayName('orphelins')).toBe('Orphelins');
    });

    it('should return correct display name for voisins', () => {
      expect(getModeDisplayName('voisins')).toBe('Voisins du Zéro');
    });

    it('should return correct display name for zero', () => {
      expect(getModeDisplayName('zero')).toBe('Jeu Zéro');
    });

    it('should return correct display name for random', () => {
      expect(getModeDisplayName('random')).toBe('Random');
    });
  });
});

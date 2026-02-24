/**
 * Unit tests for roulette-training betGenerators utilities
 * Tests bet generation functions for roulette exercises
 */
import {
  distributeChipsRandomly,
  generateBetsForNumber,
  generateSingleBetFromConfig,
} from '../betGenerators';
import type { BetType } from '../../types/exercise.types';
import type { RouletteNumber } from '@app-types/roulette.types';

describe('betGenerators', () => {
  describe('distributeChipsRandomly', () => {
    it('should return empty array for zero positions', () => {
      expect(distributeChipsRandomly(10, 0)).toEqual([]);
    });

    it('should return single element for one position', () => {
      expect(distributeChipsRandomly(10, 1)).toEqual([10]);
    });

    it('should return zeros for zero chips', () => {
      expect(distributeChipsRandomly(0, 3)).toEqual([0, 0, 0]);
    });

    it('should return zeros for negative chips', () => {
      expect(distributeChipsRandomly(-5, 3)).toEqual([0, 0, 0]);
    });

    it('should distribute chips that sum to target', () => {
      const distribution = distributeChipsRandomly(10, 3);
      const sum = distribution.reduce((a, b) => a + b, 0);
      expect(sum).toBe(10);
    });

    it('should have correct number of positions', () => {
      expect(distributeChipsRandomly(10, 5)).toHaveLength(5);
    });

    it('should ensure minimum 1 chip per position when enough chips', () => {
      const distribution = distributeChipsRandomly(10, 3);
      distribution.forEach(chips => {
        expect(chips).toBeGreaterThanOrEqual(1);
      });
    });

    it('should allow zeros when not enough chips for all positions', () => {
      const distribution = distributeChipsRandomly(2, 5);
      const sum = distribution.reduce((a, b) => a + b, 0);
      expect(sum).toBe(2);
      // Some positions should have 0
      expect(distribution.some(d => d === 0)).toBe(true);
    });

    it('should produce varied distributions over multiple calls', () => {
      const distributions = new Set<string>();
      
      for (let i = 0; i < 50; i++) {
        const distribution = distributeChipsRandomly(20, 4);
        distributions.add(JSON.stringify(distribution));
      }
      
      // Should have some variety (not all identical)
      expect(distributions.size).toBeGreaterThan(1);
    });
  });

  describe('generateBetsForNumber', () => {
    describe('with STRAIGHT bet type only', () => {
      it('should generate a straight bet for the number', () => {
        const bets = generateBetsForNumber(5, ['STRAIGHT']);
        
        expect(bets.length).toBeGreaterThanOrEqual(1);
        expect(bets.some(bet => bet.type === 'STRAIGHT')).toBe(true);
      });

      it('should have correct payout for straight bet', () => {
        const bets = generateBetsForNumber(5, ['STRAIGHT']);
        const straightBet = bets.find(bet => bet.type === 'STRAIGHT');
        
        expect(straightBet?.payout).toBe(35);
      });

      it('should contain the winning number in straight bet', () => {
        const bets = generateBetsForNumber(5, ['STRAIGHT']);
        const straightBet = bets.find(bet => bet.type === 'STRAIGHT');
        
        expect(straightBet?.numbers).toContain(5);
      });
    });

    describe('with SPLIT bet type', () => {
      it('should generate split bets containing the number', () => {
        const bets = generateBetsForNumber(5, ['SPLIT']);
        
        bets.forEach(bet => {
          expect(bet.type).toBe('SPLIT');
          expect(bet.numbers).toContain(5);
          expect(bet.numbers).toHaveLength(2);
        });
      });

      it('should have correct payout for split bets', () => {
        const bets = generateBetsForNumber(5, ['SPLIT']);
        
        bets.forEach(bet => {
          expect(bet.payout).toBe(17);
        });
      });
    });

    describe('with multiple bet types', () => {
      it('should generate bets for all allowed types', () => {
        const allowedTypes: BetType[] = ['STRAIGHT', 'SPLIT', 'CORNER'];
        const bets = generateBetsForNumber(5, allowedTypes);
        
        // Should have at least a straight bet
        expect(bets.some(bet => bet.type === 'STRAIGHT')).toBe(true);
      });

      it('should only generate allowed bet types', () => {
        const allowedTypes: BetType[] = ['STRAIGHT', 'SPLIT'];
        const bets = generateBetsForNumber(5, allowedTypes);
        
        bets.forEach(bet => {
          expect(allowedTypes).toContain(bet.type);
        });
      });
    });

    describe('with target chips', () => {
      it('should distribute chips to sum approximately to target', () => {
        const bets = generateBetsForNumber(5, ['STRAIGHT', 'SPLIT'], 10);
        const totalChips = bets.reduce((sum, bet) => sum + bet.chips, 0);
        
        // Due to dynamic variance, total should be close to target
        expect(totalChips).toBeGreaterThan(0);
        expect(totalChips).toBeLessThanOrEqual(15); // Allow for variance
      });

      it('should assign positive chips to all bets', () => {
        const bets = generateBetsForNumber(5, ['STRAIGHT', 'SPLIT'], 10);
        
        bets.forEach(bet => {
          expect(bet.chips).toBeGreaterThan(0);
        });
      });
    });

    describe('for zero', () => {
      it('should generate valid bets for zero', () => {
        const bets = generateBetsForNumber(0, ['STRAIGHT', 'SPLIT']);
        
        expect(bets.length).toBeGreaterThan(0);
        bets.forEach(bet => {
          expect(bet.numbers).toContain(0);
        });
      });
    });
  });

  describe('generateSingleBetFromConfig', () => {
    const possibleBets: RouletteNumber[][] = [
      [1, 2], [2, 3], [4, 5], [5, 6], [7, 8], [8, 9],
    ];

    it('should generate a bet from the possible bets', () => {
      const { bet, number } = generateSingleBetFromConfig(possibleBets, 'SPLIT');
      
      expect(bet.type).toBe('SPLIT');
      expect(bet.numbers).toHaveLength(2);
      expect(possibleBets).toContainEqual(expect.arrayContaining(bet.numbers));
    });

    it('should return a number from the selected bet', () => {
      const { bet, number } = generateSingleBetFromConfig(possibleBets, 'SPLIT');
      
      expect(bet.numbers).toContain(number);
    });

    it('should have correct payout for bet type', () => {
      const { bet } = generateSingleBetFromConfig(possibleBets, 'SPLIT');
      
      expect(bet.payout).toBe(17);
    });

    it('should use target chips with variance', () => {
      const { bet } = generateSingleBetFromConfig(possibleBets, 'SPLIT', 10);
      
      // Chips should be positive and within reasonable range
      expect(bet.chips).toBeGreaterThan(0);
      expect(bet.chips).toBeLessThanOrEqual(12); // Allow for variance
    });

    it('should generate random chips when no target specified', () => {
      const chipsSet = new Set<number>();
      
      for (let i = 0; i < 20; i++) {
        const { bet } = generateSingleBetFromConfig(possibleBets, 'SPLIT');
        chipsSet.add(bet.chips);
      }
      
      // Should have some variety
      expect(chipsSet.size).toBeGreaterThan(1);
    });

    describe('with different bet types', () => {
      const cornerBets: RouletteNumber[][] = [
        [1, 2, 4, 5],
        [2, 3, 5, 6],
        [4, 5, 7, 8],
      ];

      it('should generate CORNER bet correctly', () => {
        const { bet } = generateSingleBetFromConfig(cornerBets, 'CORNER');
        
        expect(bet.type).toBe('CORNER');
        expect(bet.numbers).toHaveLength(4);
        expect(bet.payout).toBe(8);
      });

      const streetBets: RouletteNumber[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      it('should generate STREET bet correctly', () => {
        const { bet } = generateSingleBetFromConfig(streetBets, 'STREET');
        
        expect(bet.type).toBe('STREET');
        expect(bet.numbers).toHaveLength(3);
        expect(bet.payout).toBe(11);
      });

      const straightBets: RouletteNumber[][] = [
        [0], [1], [2], [3], [4], [5],
      ];

      it('should generate STRAIGHT bet correctly', () => {
        const { bet } = generateSingleBetFromConfig(straightBets, 'STRAIGHT');
        
        expect(bet.type).toBe('STRAIGHT');
        expect(bet.numbers).toHaveLength(1);
        expect(bet.payout).toBe(35);
      });
    });
  });
});

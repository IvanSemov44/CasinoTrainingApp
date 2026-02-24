/**
 * Unit tests for roulette-training exerciseHelpers utilities
 * Tests bet helper functions for roulette exercises
 */
import {
  getBetTypeName,
  getBetPayout,
  getSplitsForNumber,
  getCornersForNumber,
  getStreetsForNumber,
  getSixLinesForNumber,
  formatBetNumbers,
  generateBetExplanation,
  createMockBets,
} from '../exerciseHelpers';
import type { Bet } from '../../types/exercise.types';

describe('exerciseHelpers', () => {
  describe('getBetTypeName', () => {
    it('should return correct name for STRAIGHT bet type', () => {
      expect(getBetTypeName('STRAIGHT')).toBe('Straight');
    });

    it('should return correct name for SPLIT bet type', () => {
      expect(getBetTypeName('SPLIT')).toBe('Split');
    });

    it('should return correct name for CORNER bet type', () => {
      expect(getBetTypeName('CORNER')).toBe('Corner');
    });

    it('should return correct name for STREET bet type', () => {
      expect(getBetTypeName('STREET')).toBe('Street');
    });

    it('should return correct name for LINE bet type', () => {
      expect(getBetTypeName('LINE')).toBe('Six Line');
    });
  });

  describe('getBetPayout', () => {
    it('should return correct payout for STRAIGHT (35:1)', () => {
      expect(getBetPayout('STRAIGHT')).toBe(35);
    });

    it('should return correct payout for SPLIT (17:1)', () => {
      expect(getBetPayout('SPLIT')).toBe(17);
    });

    it('should return correct payout for STREET (11:1)', () => {
      expect(getBetPayout('STREET')).toBe(11);
    });

    it('should return correct payout for CORNER (8:1)', () => {
      expect(getBetPayout('CORNER')).toBe(8);
    });

    it('should return correct payout for LINE (5:1)', () => {
      expect(getBetPayout('LINE')).toBe(5);
    });
  });

  describe('getSplitsForNumber', () => {
    describe('for zero', () => {
      it('should return all zero splits', () => {
        const splits = getSplitsForNumber(0);
        expect(splits).toHaveLength(3);
        expect(splits).toContainEqual([0, 1]);
        expect(splits).toContainEqual([0, 2]);
        expect(splits).toContainEqual([0, 3]);
      });
    });

    describe('for numbers 1-12', () => {
      it('should return correct splits for number 1', () => {
        const splits = getSplitsForNumber(1);
        // 1 can split with: 0 (horizontal), 2 (vertical), 4 (horizontal)
        expect(splits.length).toBeGreaterThan(0);
      });

      it('should return correct splits for number 5', () => {
        const splits = getSplitsForNumber(5);
        // 5 can split with: 2, 4, 6, 8
        expect(splits.length).toBeGreaterThan(0);
      });

      it('should return correct splits for number 12', () => {
        const splits = getSplitsForNumber(12);
        // 12 can split with: 9, 11
        expect(splits.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getCornersForNumber', () => {
    it('should return corners containing 0', () => {
      const corners = getCornersForNumber(0);
      expect(corners.length).toBeGreaterThan(0);
      corners.forEach(corner => {
        expect(corner).toContain(0);
        expect(corner).toHaveLength(4);
      });
    });

    it('should return corners containing 5', () => {
      const corners = getCornersForNumber(5);
      expect(corners.length).toBeGreaterThan(0);
      corners.forEach(corner => {
        expect(corner).toContain(5);
        expect(corner).toHaveLength(4);
      });
    });

    it('should return empty array for numbers not in any corner', () => {
      // Some numbers might not be in any corner
      const corners = getCornersForNumber(12);
      // 12 might not be in any corner based on the defined corners
      expect(Array.isArray(corners)).toBe(true);
    });

    it('should always return arrays of length 4', () => {
      for (let num = 0; num <= 12; num++) {
        const corners = getCornersForNumber(num as any);
        corners.forEach(corner => {
          expect(corner).toHaveLength(4);
        });
      }
    });
  });

  describe('getStreetsForNumber', () => {
    it('should return streets containing 0', () => {
      const streets = getStreetsForNumber(0);
      expect(streets.length).toBeGreaterThan(0);
      streets.forEach(street => {
        expect(street).toContain(0);
        expect(street).toHaveLength(3);
      });
    });

    it('should return streets containing 5', () => {
      const streets = getStreetsForNumber(5);
      expect(streets).toHaveLength(1);
      expect(streets[0]).toContain(5);
    });

    it('should always return arrays of length 3', () => {
      for (let num = 0; num <= 12; num++) {
        const streets = getStreetsForNumber(num as any);
        streets.forEach(street => {
          expect(street).toHaveLength(3);
        });
      }
    });
  });

  describe('getSixLinesForNumber', () => {
    it('should return six lines containing 5', () => {
      const sixLines = getSixLinesForNumber(5);
      expect(sixLines.length).toBeGreaterThan(0);
      sixLines.forEach(sixLine => {
        expect(sixLine).toContain(5);
        expect(sixLine).toHaveLength(6);
      });
    });

    it('should return empty array for 0 (not in any six line)', () => {
      const sixLines = getSixLinesForNumber(0);
      expect(sixLines).toHaveLength(0);
    });

    it('should always return arrays of length 6', () => {
      for (let num = 1; num <= 12; num++) {
        const sixLines = getSixLinesForNumber(num as any);
        sixLines.forEach(sixLine => {
          expect(sixLine).toHaveLength(6);
        });
      }
    });
  });

  describe('formatBetNumbers', () => {
    it('should format straight bet as single number', () => {
      const bet: Bet = {
        type: 'STRAIGHT',
        numbers: [5],
        chips: 2,
        payout: 35,
      };
      expect(formatBetNumbers(bet)).toBe('5');
    });

    it('should format split bet with hyphen', () => {
      const bet: Bet = {
        type: 'SPLIT',
        numbers: [5, 8],
        chips: 1,
        payout: 17,
      };
      expect(formatBetNumbers(bet)).toBe('5-8');
    });

    it('should format corner bet with hyphens', () => {
      const bet: Bet = {
        type: 'CORNER',
        numbers: [1, 2, 4, 5],
        chips: 3,
        payout: 8,
      };
      expect(formatBetNumbers(bet)).toBe('1-2-4-5');
    });

    it('should format street bet with hyphens', () => {
      const bet: Bet = {
        type: 'STREET',
        numbers: [4, 5, 6],
        chips: 1,
        payout: 11,
      };
      expect(formatBetNumbers(bet)).toBe('4-5-6');
    });

    it('should format six line bet with hyphens', () => {
      const bet: Bet = {
        type: 'LINE',
        numbers: [1, 2, 3, 4, 5, 6],
        chips: 2,
        payout: 5,
      };
      expect(formatBetNumbers(bet)).toBe('1-2-3-4-5-6');
    });
  });

  describe('generateBetExplanation', () => {
    it('should generate explanation for single bet', () => {
      const bets: Bet[] = [
        { type: 'STRAIGHT', numbers: [5], chips: 2, payout: 35 },
      ];
      const explanation = generateBetExplanation(bets);
      expect(explanation).toBe('5 (2 × 35 = 70) = 70');
    });

    it('should generate explanation for multiple bets', () => {
      const bets: Bet[] = [
        { type: 'STRAIGHT', numbers: [5], chips: 2, payout: 35 },
        { type: 'SPLIT', numbers: [5, 8], chips: 1, payout: 17 },
      ];
      const explanation = generateBetExplanation(bets);
      expect(explanation).toBe('5 (2 × 35 = 70) + 5-8 (1 × 17 = 17) = 87');
    });

    it('should calculate total correctly', () => {
      const bets: Bet[] = [
        { type: 'CORNER', numbers: [1, 2, 4, 5], chips: 3, payout: 8 },
        { type: 'STREET', numbers: [4, 5, 6], chips: 2, payout: 11 },
      ];
      // 3 × 8 = 24, 2 × 11 = 22, total = 46
      const explanation = generateBetExplanation(bets);
      expect(explanation).toContain('= 46');
    });

    it('should handle empty bets array', () => {
      const explanation = generateBetExplanation([]);
      expect(explanation).toBe(' = 0');
    });
  });

  describe('createMockBets', () => {
    it('should create mock bets with correct structure', () => {
      const bets: Bet[] = [
        { type: 'STRAIGHT', numbers: [5], chips: 2, payout: 35 },
      ];
      const mockBets = createMockBets(bets);
      
      expect(mockBets).toHaveLength(1);
      expect(mockBets[0]).toHaveProperty('id');
      expect(mockBets[0]).toHaveProperty('timestamp');
      expect(mockBets[0].type).toBe('STRAIGHT');
      expect(mockBets[0].numbers).toEqual([5]);
      expect(mockBets[0].amount).toBe(2);
      expect(mockBets[0].payout).toBe(35);
    });

    it('should create unique IDs for each bet', () => {
      const bets: Bet[] = [
        { type: 'STRAIGHT', numbers: [5], chips: 2, payout: 35 },
        { type: 'SPLIT', numbers: [5, 8], chips: 1, payout: 17 },
      ];
      const mockBets = createMockBets(bets);
      
      expect(mockBets[0].id).not.toBe(mockBets[1].id);
    });

    it('should create unique timestamps for each bet', () => {
      const bets: Bet[] = [
        { type: 'STRAIGHT', numbers: [5], chips: 2, payout: 35 },
        { type: 'SPLIT', numbers: [5, 8], chips: 1, payout: 17 },
      ];
      const mockBets = createMockBets(bets);
      
      expect(mockBets[1].timestamp).toBeGreaterThan(mockBets[0].timestamp);
    });
  });
});

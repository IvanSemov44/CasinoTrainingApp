import { 
  calculatePayout, 
  calculateTotalPayout, 
  validateBetPlacement, 
  formatTime, 
  calculateScorePercentage,
  generateRandomNumber,
} from '../roulette.utils';
import { BetType, RouletteNumber } from '../../types/roulette.types';

// Mock constants to ensure tests are deterministic
// Note: We use string keys because jest.mock is hoisted and can't reference imported variables
jest.mock('../../constants/roulette.constants', () => ({
  PAYOUT_RATIOS: {
    'STRAIGHT': 35,
    'SPLIT': 17,
    'STREET': 11,
    'CORNER': 8,
    'LINE': 5,
    'DOZEN': 2,
    'COLUMN': 2,
    'RED_BLACK': 1,
    'EVEN_ODD': 1,
    'HIGH_LOW': 1,
  }
}));

describe('Roulette Utils', () => {
  describe('calculatePayout', () => {
    it('calculates correct payout for Straight bet (35:1)', () => {
      // 10 * 35 + 10 = 360
      expect(calculatePayout(BetType.STRAIGHT, 10)).toBe(360);
    });

    it('calculates correct payout for Red/Black bet (1:1)', () => {
      // 20 * 1 + 20 = 40
      expect(calculatePayout(BetType.RED_BLACK, 20)).toBe(40);
    });
  });

  describe('calculateTotalPayout', () => {
    it('calculates total payout for multiple winning bets', () => {
      const winningNumber = 10 as RouletteNumber;
      const placedBets = [
        { type: BetType.STRAIGHT, numbers: [10] as RouletteNumber[], amount: 10 }, // Win: 360
        { type: BetType.SPLIT, numbers: [10, 11] as RouletteNumber[], amount: 10 }, // Win: 180 (17*10 + 10)
        { type: BetType.STRAIGHT, numbers: [20] as RouletteNumber[], amount: 10 }, // Loss
      ];

      const total = calculateTotalPayout(winningNumber, placedBets);
      expect(total).toBe(360 + 180);
    });

    it('returns 0 if no bets win', () => {
      const winningNumber = 5 as RouletteNumber;
      const placedBets = [
        { type: BetType.STRAIGHT, numbers: [10] as RouletteNumber[], amount: 10 },
      ];

      const total = calculateTotalPayout(winningNumber, placedBets);
      expect(total).toBe(0);
    });
  });

  describe('validateBetPlacement', () => {
    it('validates Straight bet requires 1 number', () => {
      expect(validateBetPlacement(BetType.STRAIGHT, [0] as RouletteNumber[])).toBe(true);
      expect(validateBetPlacement(BetType.STRAIGHT, [0, 1] as RouletteNumber[])).toBe(false);
    });

    it('validates Split bet requires 2 numbers', () => {
      expect(validateBetPlacement(BetType.SPLIT, [1, 2] as RouletteNumber[])).toBe(true);
      expect(validateBetPlacement(BetType.SPLIT, [1] as RouletteNumber[])).toBe(false);
    });

    it('validates Corner bet requires 4 numbers', () => {
      expect(validateBetPlacement(BetType.CORNER, [1, 2, 4, 5] as RouletteNumber[])).toBe(true);
      expect(validateBetPlacement(BetType.CORNER, [1, 2, 3] as RouletteNumber[])).toBe(false);
    });

    it('validates Even/Odd bet requires 18 numbers', () => {
      // Mocking an array of 18 numbers
      const eighteenNumbers = Array(18).fill(1) as RouletteNumber[];
      expect(validateBetPlacement(BetType.EVEN_ODD, eighteenNumbers)).toBe(true);
      expect(validateBetPlacement(BetType.EVEN_ODD, [1, 2] as RouletteNumber[])).toBe(false);
    });
  });

  describe('formatTime', () => {
    it('formats seconds into MM:SS', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(9)).toBe('00:09');
      expect(formatTime(59)).toBe('00:59');
      expect(formatTime(60)).toBe('01:00');
      expect(formatTime(65)).toBe('01:05');
      expect(formatTime(600)).toBe('10:00');
    });
  });

  describe('calculateScorePercentage', () => {
    it('calculates correct percentage', () => {
      expect(calculateScorePercentage(5, 10)).toBe(50);
      expect(calculateScorePercentage(1, 3)).toBe(33); // 33.33... -> 33
      expect(calculateScorePercentage(3, 3)).toBe(100);
    });

    it('handles zero total to avoid NaN', () => {
      expect(calculateScorePercentage(0, 0)).toBe(0);
    });
  });

  describe('validateBetPlacement - additional coverage', () => {
    it('validates Street bet requires 3 numbers', () => {
      expect(validateBetPlacement(BetType.STREET, [1, 2, 3] as RouletteNumber[])).toBe(true);
      expect(validateBetPlacement(BetType.STREET, [1, 2] as RouletteNumber[])).toBe(false);
    });

    it('validates Line bet requires 6 numbers', () => {
      const sixNumbers = [1, 2, 3, 4, 5, 6] as RouletteNumber[];
      expect(validateBetPlacement(BetType.LINE, sixNumbers)).toBe(true);
      expect(validateBetPlacement(BetType.LINE, [1, 2, 3] as RouletteNumber[])).toBe(false);
    });

    it('validates Dozen bet requires 12 numbers', () => {
      const twelveNumbers = Array(12).fill(1) as RouletteNumber[];
      expect(validateBetPlacement(BetType.DOZEN, twelveNumbers)).toBe(true);
      expect(validateBetPlacement(BetType.DOZEN, [1, 2, 3] as RouletteNumber[])).toBe(false);
    });

    it('validates Column bet requires 12 numbers', () => {
      const twelveNumbers = Array(12).fill(1) as RouletteNumber[];
      expect(validateBetPlacement(BetType.COLUMN, twelveNumbers)).toBe(true);
      expect(validateBetPlacement(BetType.COLUMN, [1, 2] as RouletteNumber[])).toBe(false);
    });

    it('validates Red/Black bet requires 18 numbers', () => {
      const eighteenNumbers = Array(18).fill(1) as RouletteNumber[];
      expect(validateBetPlacement(BetType.RED_BLACK, eighteenNumbers)).toBe(true);
      expect(validateBetPlacement(BetType.RED_BLACK, [1, 2] as RouletteNumber[])).toBe(false);
    });

    it('validates High/Low bet requires 18 numbers', () => {
      const eighteenNumbers = Array(18).fill(1) as RouletteNumber[];
      expect(validateBetPlacement(BetType.HIGH_LOW, eighteenNumbers)).toBe(true);
      expect(validateBetPlacement(BetType.HIGH_LOW, [1, 2, 3] as RouletteNumber[])).toBe(false);
    });
  });

  describe('generateRandomNumber', () => {
    it('should return a number between 0 and 36', () => {
      for (let i = 0; i < 100; i++) {
        const num = generateRandomNumber();
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(36);
      }
    });

    it('should return an integer', () => {
      for (let i = 0; i < 50; i++) {
        const num = generateRandomNumber();
        expect(Number.isInteger(num)).toBe(true);
      }
    });

    it('should eventually generate all numbers 0-36', () => {
      const numbers = new Set<RouletteNumber>();
      for (let i = 0; i < 1000; i++) {
        numbers.add(generateRandomNumber());
      }
      // Should have generated most numbers (allowing for randomness)
      expect(numbers.size).toBeGreaterThan(30);
    });
  });
});

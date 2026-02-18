/**
 * Unit tests for randomUtils.ts
 * Tests shared utility functions for random number generation
 */

import {
  getRandomInt,
  getRandomElement,
  shuffleArray,
  getRandomChipCount,
  shouldInclude,
  getRandomCount,
} from '../randomUtils';

describe('randomUtils', () => {
  describe('getRandomInt', () => {
    it('should return a number within the specified range (inclusive)', () => {
      // Run multiple times to test randomness
      for (let i = 0; i < 100; i++) {
        const result = getRandomInt(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it('should return the same value when min equals max', () => {
      const result = getRandomInt(5, 5);
      expect(result).toBe(5);
    });

    it('should handle negative numbers', () => {
      for (let i = 0; i < 50; i++) {
        const result = getRandomInt(-10, -5);
        expect(result).toBeGreaterThanOrEqual(-10);
        expect(result).toBeLessThanOrEqual(-5);
      }
    });

    it('should handle range including zero', () => {
      for (let i = 0; i < 50; i++) {
        const result = getRandomInt(-5, 5);
        expect(result).toBeGreaterThanOrEqual(-5);
        expect(result).toBeLessThanOrEqual(5);
      }
    });

    it('should return integer values only', () => {
      for (let i = 0; i < 50; i++) {
        const result = getRandomInt(0, 100);
        expect(result).toBe(Math.floor(result));
      }
    });
  });

  describe('getRandomElement', () => {
    it('should return an element from the array', () => {
      const array = [1, 2, 3, 4, 5];
      for (let i = 0; i < 50; i++) {
        const result = getRandomElement(array);
        expect(array).toContain(result);
      }
    });

    it('should return the only element from a single-element array', () => {
      const array = [42];
      const result = getRandomElement(array);
      expect(result).toBe(42);
    });

    it('should work with strings', () => {
      const array = ['apple', 'banana', 'cherry'];
      for (let i = 0; i < 30; i++) {
        const result = getRandomElement(array);
        expect(array).toContain(result);
      }
    });

    it('should work with objects', () => {
      const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
      for (let i = 0; i < 30; i++) {
        const result = getRandomElement(array);
        expect(array).toContainEqual(result);
      }
    });

    it('should return undefined for empty array', () => {
      const array: number[] = [];
      const result = getRandomElement(array);
      expect(result).toBeUndefined();
    });
  });

  describe('shuffleArray', () => {
    it('should return an array with the same length', () => {
      const array = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(array);
      expect(shuffled.length).toBe(array.length);
    });

    it('should contain all the same elements', () => {
      const array = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(array);
      expect(shuffled.sort()).toEqual(array.sort());
    });

    it('should not modify the original array', () => {
      const array = [1, 2, 3, 4, 5];
      const originalCopy = [...array];
      shuffleArray(array);
      expect(array).toEqual(originalCopy);
    });

    it('should return a new array reference', () => {
      const array = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(array);
      expect(shuffled).not.toBe(array);
    });

    it('should handle single-element array', () => {
      const array = [1];
      const shuffled = shuffleArray(array);
      expect(shuffled).toEqual([1]);
    });

    it('should handle empty array', () => {
      const array: number[] = [];
      const shuffled = shuffleArray(array);
      expect(shuffled).toEqual([]);
    });
  });

  describe('getRandomChipCount', () => {
    it('should return a number within default range (1-3)', () => {
      for (let i = 0; i < 50; i++) {
        const result = getRandomChipCount();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(3);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it('should return a number within custom range', () => {
      for (let i = 0; i < 50; i++) {
        const result = getRandomChipCount(2, 5);
        expect(result).toBeGreaterThanOrEqual(2);
        expect(result).toBeLessThanOrEqual(5);
      }
    });

    it('should handle equal min and max', () => {
      const result = getRandomChipCount(4, 4);
      expect(result).toBe(4);
    });
  });

  describe('shouldInclude', () => {
    it('should always return true when probability is 0', () => {
      for (let i = 0; i < 50; i++) {
        const result = shouldInclude(0);
        expect(result).toBe(true);
      }
    });

    it('should always return false when probability is 1', () => {
      for (let i = 0; i < 50; i++) {
        const result = shouldInclude(1);
        expect(result).toBe(false);
      }
    });

    it('should return boolean values', () => {
      const result = shouldInclude(0.5);
      expect(typeof result).toBe('boolean');
    });
  });

  describe('getRandomCount', () => {
    it('should return a number between 1 and maxCount (or availableCount)', () => {
      for (let i = 0; i < 50; i++) {
        const result = getRandomCount(5, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(5);
      }
    });

    it('should be limited by availableCount when smaller', () => {
      for (let i = 0; i < 50; i++) {
        const result = getRandomCount(10, 3);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(3);
      }
    });

    it('should return 1 when availableCount is 1', () => {
      const result = getRandomCount(5, 1);
      expect(result).toBe(1);
    });

    it('should return at least 1', () => {
      for (let i = 0; i < 50; i++) {
        const result = getRandomCount(5, 5);
        expect(result).toBeGreaterThanOrEqual(1);
      }
    });
  });
});

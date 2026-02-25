/**
 * Tests for randomUtils
 */
import {
  getRandomInt,
  getRandomElement,
  shuffleArray,
  getRandomChipCount,
  shouldInclude,
  getRandomCount,
  getDynamicChipCount,
} from '../randomUtils';

describe('randomUtils', () => {
  describe('getRandomInt', () => {
    it('should return a number within the range [min, max] inclusive', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomInt(5, 10);
        expect(result).toBeGreaterThanOrEqual(5);
        expect(result).toBeLessThanOrEqual(10);
      }
    });

    it('should return min when min equals max', () => {
      const result = getRandomInt(5, 5);
      expect(result).toBe(5);
    });

    it('should handle negative ranges', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomInt(-10, -5);
        expect(result).toBeGreaterThanOrEqual(-10);
        expect(result).toBeLessThanOrEqual(-5);
      }
    });

    it('should handle range starting from 0', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomInt(0, 5);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(5);
      }
    });
  });

  describe('getRandomElement', () => {
    it('should return an element from the array', () => {
      const arr = [1, 2, 3, 4, 5];
      for (let i = 0; i < 100; i++) {
        const result = getRandomElement(arr);
        expect(arr).toContain(result);
      }
    });

    it('should return the only element from a single-element array', () => {
      const arr = [42];
      const result = getRandomElement(arr);
      expect(result).toBe(42);
    });

    it('should return undefined for an empty array', () => {
      const arr: number[] = [];
      const result = getRandomElement(arr);
      expect(result).toBeUndefined();
    });

    it('should work with string arrays', () => {
      const arr = ['red', 'black', 'green'];
      for (let i = 0; i < 100; i++) {
        const result = getRandomElement(arr);
        expect(arr).toContain(result);
      }
    });

    it('should work with object arrays', () => {
      const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
      for (let i = 0; i < 100; i++) {
        const result = getRandomElement(arr);
        expect(arr).toContainEqual(result);
      }
    });
  });

  describe('shuffleArray', () => {
    it('should return an array with the same elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(arr);
      expect(shuffled.sort()).toEqual(arr.sort());
    });

    it('should not modify the original array', () => {
      const arr = [1, 2, 3, 4, 5];
      const arrCopy = [...arr];
      shuffleArray(arr);
      expect(arr).toEqual(arrCopy);
    });

    it('should handle a single-element array', () => {
      const arr = [1];
      const shuffled = shuffleArray(arr);
      expect(shuffled).toEqual([1]);
    });

    it('should handle an empty array', () => {
      const arr: number[] = [];
      const shuffled = shuffleArray(arr);
      expect(shuffled).toEqual([]);
    });

    it('should produce different orders on multiple calls (statistical test)', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const results = new Set<string>();
      
      for (let i = 0; i < 100; i++) {
        const shuffled = shuffleArray([...arr]);
        results.add(shuffled.join(','));
      }
      
      // With 100 shuffles of 10 elements, we should see multiple different orders
      expect(results.size).toBeGreaterThan(10);
    });
  });

  describe('getRandomChipCount', () => {
    it('should return a number within default range [1, 3]', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomChipCount();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(3);
      }
    });

    it('should return a number within custom range', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomChipCount(2, 5);
        expect(result).toBeGreaterThanOrEqual(2);
        expect(result).toBeLessThanOrEqual(5);
      }
    });

    it('should return min when min equals max', () => {
      const result = getRandomChipCount(4, 4);
      expect(result).toBe(4);
    });
  });

  describe('shouldInclude', () => {
    it('should return boolean values', () => {
      for (let i = 0; i < 100; i++) {
        const result = shouldInclude(0.5);
        expect(typeof result).toBe('boolean');
      }
    });

    it('should always return true when probability is 0', () => {
      for (let i = 0; i < 100; i++) {
        const result = shouldInclude(0);
        expect(result).toBe(true);
      }
    });

    it('should always return false when probability is 1', () => {
      for (let i = 0; i < 100; i++) {
        const result = shouldInclude(1);
        expect(result).toBe(false);
      }
    });
  });

  describe('getRandomCount', () => {
    it('should return a number between 1 and maxCount, limited by availableCount', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomCount(5, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(5);
      }
    });

    it('should be limited by availableCount when less than maxCount', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomCount(10, 3);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(3);
      }
    });

    it('should return 1 when availableCount is 1', () => {
      const result = getRandomCount(5, 1);
      expect(result).toBe(1);
    });
  });

  describe('getDynamicChipCount', () => {
    it('should return 0 for 0 input', () => {
      const result = getDynamicChipCount(0);
      expect(result).toBe(0);
    });

    it('should return 1 for 1 input', () => {
      const result = getDynamicChipCount(1);
      expect(result).toBe(1);
    });

    it('should return value within expected range for small values (2-4)', () => {
      for (let i = 0; i < 100; i++) {
        const result = getDynamicChipCount(3);
        // 60% lower bound: 3 * 0.6 = 1.8 → 1
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(3);
      }
    });

    it('should return value within expected range for medium values (5-9)', () => {
      for (let i = 0; i < 100; i++) {
        const result = getDynamicChipCount(7);
        // 60% + (7-5) * 0.025 = 65% lower bound: 7 * 0.65 = 4.55 → 4
        expect(result).toBeGreaterThanOrEqual(4);
        expect(result).toBeLessThanOrEqual(7);
      }
    });

    it('should return value within expected range for values 10-19', () => {
      for (let i = 0; i < 100; i++) {
        const result = getDynamicChipCount(15);
        // 70% + (15-10) * 0.005 = 72.5% lower bound: 15 * 0.725 = 10.875 → 10
        expect(result).toBeGreaterThanOrEqual(10);
        expect(result).toBeLessThanOrEqual(15);
      }
    });

    it('should return value within expected range for large values (20+)', () => {
      for (let i = 0; i < 100; i++) {
        const result = getDynamicChipCount(20);
        // 75% lower bound: 20 * 0.75 = 15
        expect(result).toBeGreaterThanOrEqual(15);
        expect(result).toBeLessThanOrEqual(20);
      }
    });

    it('should handle very large values', () => {
      for (let i = 0; i < 100; i++) {
        const result = getDynamicChipCount(100);
        // 75% lower bound: 100 * 0.75 = 75
        expect(result).toBeGreaterThanOrEqual(75);
        expect(result).toBeLessThanOrEqual(100);
      }
    });
  });
});

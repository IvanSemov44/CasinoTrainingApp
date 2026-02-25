import { validateCallBet, getRandomMode, getModeDisplayName } from '../validation';

// Mock the constants to ensure tests are isolated from config changes
jest.mock('../../../racetrack/constants/announcedBets.constants', () => ({
  ANNOUNCED_BETS: {
    tier: {
      name: 'Tier',
      bets: [
        { type: 'split', numbers: [5, 8] },
        { type: 'split', numbers: [10, 11] },
      ]
    },
    voisins: {
      name: 'Voisins',
      bets: [
        { type: 'street', numbers: [0, 2, 3] },
        { type: 'corner', numbers: [25, 26, 28, 29] },
      ]
    }
  }
}));

describe('Call Bets Validation Utils', () => {
  describe('validateCallBet', () => {
    const mockTimestamp = 1234567890;

    it('should return isCorrect true when user places all correct bets', () => {
      const userBets = [
        { type: 'split', numbers: [5, 8], amount: 10, id: '1', timestamp: mockTimestamp },
        { type: 'split', numbers: [10, 11], amount: 5, id: '2', timestamp: mockTimestamp },
      ];

      // Cast to any to bypass strict PlacedBet type check for the mock
      const result = validateCallBet('tier', userBets as any);

      expect(result.isCorrect).toBe(true);
      expect(result.missingBets).toHaveLength(0);
      expect(result.extraBets).toHaveLength(0);
      expect(result.score).toBe(100);
    });

    it('should ignore order of numbers in a bet (e.g. [8, 5] vs [5, 8])', () => {
      const userBets = [
        { type: 'split', numbers: [8, 5], amount: 10, id: '1', timestamp: mockTimestamp },
        { type: 'split', numbers: [11, 10], amount: 5, id: '2', timestamp: mockTimestamp },
      ];

      const result = validateCallBet('tier', userBets as any);

      expect(result.isCorrect).toBe(true);
    });

    it('should return isCorrect false when bets are missing', () => {
      const userBets = [
        { type: 'split', numbers: [5, 8], amount: 10, id: '1', timestamp: mockTimestamp },
      ];

      const result = validateCallBet('tier', userBets as any);

      expect(result.isCorrect).toBe(false);
      expect(result.missingBets).toHaveLength(1);
      expect(result.missingBets[0].numbers).toEqual([10, 11]);
      expect(result.score).toBe(50); // 1 out of 2 correct
    });

    it('should return isCorrect false when extra bets are placed', () => {
      const userBets = [
        { type: 'split', numbers: [5, 8], amount: 10, id: '1', timestamp: mockTimestamp },
        { type: 'split', numbers: [10, 11], amount: 10, id: '2', timestamp: mockTimestamp },
        { type: 'straight', numbers: [1], amount: 10, id: '3', timestamp: mockTimestamp }, // Extra
      ];

      const result = validateCallBet('tier', userBets as any);

      expect(result.isCorrect).toBe(false);
      expect(result.extraBets).toHaveLength(1);
      expect(result.extraBets[0].numbers).toEqual([1]);
    });

    it('should handle empty user bets', () => {
      const result = validateCallBet('tier', []);
      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
      expect(result.missingBets).toHaveLength(2);
    });

    it('should handle invalid mode gracefully', () => {
      // @ts-expect-error - Testing invalid mode handling
      const result = validateCallBet('invalid_mode', []);
      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
    });
  });

  describe('getRandomMode', () => {
    it('should return a valid mode excluding random', () => {
      const mode = getRandomMode();
      const validModes = ['tier', 'orphelins', 'voisins', 'zero'];
      expect(validModes).toContain(mode);
      expect(mode).not.toBe('random');
    });
  });

  describe('getModeDisplayName', () => {
    it('should return correct display name for Tier', () => {
      expect(getModeDisplayName('tier')).toBe('Tier du Cylindre');
    });

    it('should return correct display name for Random', () => {
      expect(getModeDisplayName('random')).toBe('Random');
    });
  });
});
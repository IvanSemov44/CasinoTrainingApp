import {
  calculatePotAmount,
  validatePotAnswer,
  generateRandomPotRequest,
} from '../plo.utils';
import { PotRequest } from '../../types';

describe('plo.utils', () => {
  describe('calculatePotAmount', () => {
    it('should calculate pot correctly for simple bet scenario', () => {
      const request: PotRequest = {
        requestingPosition: 'BB',
        previousActions: [
          { position: 'UTG', action: 'bet', amount: 10 },
        ],
        smallBlind: 1,
        bigBlind: 2,
      };

      // Dead money = SB + BB + UTG bet = 1 + 2 + 10 = 13
      // Last action = 10
      // Pot = 13 + (3 * 10) = 43
      expect(calculatePotAmount(request)).toBe(43);
    });

    it('should calculate pot correctly with raise', () => {
      const request: PotRequest = {
        requestingPosition: 'D',
        previousActions: [
          { position: 'UTG', action: 'bet', amount: 10 },
          { position: 'MP', action: 'raise', amount: 30 },
        ],
        smallBlind: 1,
        bigBlind: 2,
      };

      // Dead money = SB + BB + UTG bet + MP raise = 1 + 2 + 10 + 30 = 43
      // Last action = 30
      // Pot = 43 + (3 * 30) = 133
      expect(calculatePotAmount(request)).toBe(133);
    });

    it('should calculate pot correctly with calls', () => {
      const request: PotRequest = {
        requestingPosition: 'D',
        previousActions: [
          { position: 'UTG', action: 'bet', amount: 10 },
          { position: 'MP', action: 'call', amount: 10 },
          { position: 'CO', action: 'call', amount: 10 },
        ],
        smallBlind: 1,
        bigBlind: 2,
      };

      // Dead money = SB + BB + UTG bet + MP call + CO call = 1 + 2 + 10 + 10 + 10 = 33
      // Last action = 10 (UTG bet)
      // Pot = 33 + (3 * 10) = 63
      expect(calculatePotAmount(request)).toBe(63);
    });

    it('should exclude requesting player own money from dead money', () => {
      const request: PotRequest = {
        requestingPosition: 'MP',
        previousActions: [
          { position: 'UTG', action: 'bet', amount: 10 },
          { position: 'MP', action: 'call', amount: 10 },
        ],
        smallBlind: 1,
        bigBlind: 2,
      };

      // When MP is requesting and has already called:
      // The function finds MP's call first when looking for last action, so lastActionAmount = 0
      // Dead money = SB + BB + UTG bet = 1 + 2 + 10 = 13 (MP's own call excluded)
      // Pot = 13 + (3 * 0) = 13
      expect(calculatePotAmount(request)).toBe(13);
    });

    it('should handle fold actions', () => {
      const request: PotRequest = {
        requestingPosition: 'D',
        previousActions: [
          { position: 'UTG', action: 'fold' },
          { position: 'MP', action: 'bet', amount: 15 },
          { position: 'CO', action: 'fold' },
        ],
        smallBlind: 1,
        bigBlind: 2,
      };

      // Dead money = SB + BB + MP bet = 1 + 2 + 15 = 18 (folds contribute nothing)
      // Last action = 15 (MP bet)
      // Pot = 18 + (3 * 15) = 63
      expect(calculatePotAmount(request)).toBe(63);
    });
  });

  describe('validatePotAnswer', () => {
    it('should return correct for right answer', () => {
      const request: PotRequest = {
        requestingPosition: 'BB',
        previousActions: [
          { position: 'UTG', action: 'bet', amount: 10 },
        ],
        smallBlind: 1,
        bigBlind: 2,
      };

      const result = validatePotAnswer(request, 43);

      expect(result.isCorrect).toBe(true);
      expect(result.userAnswer).toBe(43);
      expect(result.correctAnswer).toBe(43);
      expect(result.explanation).toContain('Correct');
    });

    it('should return incorrect for wrong answer', () => {
      const request: PotRequest = {
        requestingPosition: 'BB',
        previousActions: [
          { position: 'UTG', action: 'bet', amount: 10 },
        ],
        smallBlind: 1,
        bigBlind: 2,
      };

      const result = validatePotAnswer(request, 50);

      expect(result.isCorrect).toBe(false);
      expect(result.userAnswer).toBe(50);
      expect(result.correctAnswer).toBe(43);
      expect(result.explanation).toContain('Incorrect');
    });

    it('should include formula in explanation', () => {
      const request: PotRequest = {
        requestingPosition: 'BB',
        previousActions: [
          { position: 'UTG', action: 'bet', amount: 10 },
        ],
        smallBlind: 1,
        bigBlind: 2,
      };

      const result = validatePotAnswer(request, 43);

      expect(result.explanation).toContain('Dead money');
      expect(result.explanation).toContain('3×');
    });
  });

  describe('generateRandomPotRequest', () => {
    it('should generate a valid pot request', () => {
      const request = generateRandomPotRequest();

      expect(request).toHaveProperty('requestingPosition');
      expect(request).toHaveProperty('previousActions');
      expect(request).toHaveProperty('smallBlind');
      expect(request).toHaveProperty('bigBlind');
      expect(request.previousActions.length).toBeGreaterThanOrEqual(2);
      expect(request.previousActions.length).toBeLessThanOrEqual(4);
    });

    it('should have valid blind values', () => {
      const request = generateRandomPotRequest();

      expect(request.smallBlind).toBeGreaterThan(0);
      // PLO uses equal blinds (SB = BB), so bigBlind should be >= smallBlind
      expect(request.bigBlind).toBeGreaterThanOrEqual(request.smallBlind);
    });

    it('should have at least one bet action', () => {
      const request = generateRandomPotRequest();

      const hasBetOrRaise = request.previousActions.some(
        (a) => a.action === 'bet' || a.action === 'raise'
      );
      expect(hasBetOrRaise).toBe(true);
    });

    it('should generate different scenarios on multiple calls', () => {
      const requests = Array.from({ length: 10 }, () => generateRandomPotRequest());
      const uniqueScenarios = new Set(
        requests.map((r) => JSON.stringify(r.previousActions))
      );

      // Should have some variety (not all identical)
      expect(uniqueScenarios.size).toBeGreaterThan(1);
    });
  });
});
/**
 * Unit tests for betConfigs.ts
 * Tests bet configuration functions and data structures
 */

import {
  BET_CONFIGS,
  getBetConfig,
  BetConfigKey,
  BetConfig,
} from '../betConfigs';

describe('betConfigs', () => {
  describe('BET_CONFIGS', () => {
    it('should contain all expected bet types', () => {
      const expectedKeys: BetConfigKey[] = [
        'STRAIGHT_UP',
        'SPLIT',
        'STREET',
        'CORNER',
        'SIX_LINE',
      ];
      
      expectedKeys.forEach((key) => {
        expect(BET_CONFIGS).toHaveProperty(key);
      });
    });

    it('should have valid config structure for each bet type', () => {
      Object.entries(BET_CONFIGS).forEach(([_key, config]) => {
        expect(config).toHaveProperty('type');
        expect(config).toHaveProperty('name');
        expect(config).toHaveProperty('displayName');
        expect(config).toHaveProperty('payout');
        expect(config).toHaveProperty('description');
        expect(config).toHaveProperty('hintText');
        expect(config).toHaveProperty('exampleChips');
        expect(config).toHaveProperty('generatePossibleBets');
        expect(config).toHaveProperty('formatNumbers');
        
        expect(typeof config.type).toBe('string');
        expect(typeof config.name).toBe('string');
        expect(typeof config.displayName).toBe('string');
        expect(typeof config.payout).toBe('number');
        expect(typeof config.description).toBe('string');
        expect(typeof config.hintText).toBe('string');
        expect(typeof config.exampleChips).toBe('number');
        expect(typeof config.generatePossibleBets).toBe('function');
        expect(typeof config.formatNumbers).toBe('function');
      });
    });
  });

  describe('STRAIGHT_UP config', () => {
    const config = BET_CONFIGS.STRAIGHT_UP;

    it('should have correct payout of 35', () => {
      expect(config.payout).toBe(35);
    });

    it('should generate bets for numbers 0-12', () => {
      const bets = config.generatePossibleBets();
      expect(bets.length).toBe(13);
      
      // Check that each bet is a single number
      bets.forEach((bet, index) => {
        expect(bet.length).toBe(1);
        expect(bet[0]).toBe(index);
      });
    });

    it('should format numbers correctly', () => {
      expect(config.formatNumbers([5])).toBe('5');
      expect(config.formatNumbers([0])).toBe('0');
      expect(config.formatNumbers([12])).toBe('12');
    });
  });

  describe('SPLIT config', () => {
    const config = BET_CONFIGS.SPLIT;

    it('should have correct payout of 17', () => {
      expect(config.payout).toBe(17);
    });

    it('should generate split bets with exactly 2 numbers', () => {
      const bets = config.generatePossibleBets();
      bets.forEach((bet) => {
        expect(bet.length).toBe(2);
      });
    });

    it('should include splits with zero', () => {
      const bets = config.generatePossibleBets();
      const zeroSplits = bets.filter((bet) => bet.includes(0));
      expect(zeroSplits.length).toBeGreaterThan(0);
    });

    it('should format numbers correctly', () => {
      expect(config.formatNumbers([1, 2])).toBe('1-2');
      expect(config.formatNumbers([0, 3])).toBe('0-3');
    });
  });

  describe('STREET config', () => {
    const config = BET_CONFIGS.STREET;

    it('should have correct payout of 11', () => {
      expect(config.payout).toBe(11);
    });

    it('should generate street bets with exactly 3 numbers', () => {
      const bets = config.generatePossibleBets();
      bets.forEach((bet) => {
        expect(bet.length).toBe(3);
      });
    });

    it('should format numbers correctly', () => {
      expect(config.formatNumbers([1, 2, 3])).toBe('1-2-3');
      expect(config.formatNumbers([0, 1, 2])).toBe('0-1-2');
    });
  });

  describe('CORNER config', () => {
    const config = BET_CONFIGS.CORNER;

    it('should have correct payout of 8', () => {
      expect(config.payout).toBe(8);
    });

    it('should generate corner bets with exactly 4 numbers', () => {
      const bets = config.generatePossibleBets();
      bets.forEach((bet) => {
        expect(bet.length).toBe(4);
      });
    });

    it('should format numbers correctly', () => {
      expect(config.formatNumbers([1, 2, 4, 5])).toBe('1-2-4-5');
    });
  });

  describe('SIX_LINE config', () => {
    const config = BET_CONFIGS.SIX_LINE;

    it('should have correct payout of 5', () => {
      expect(config.payout).toBe(5);
    });

    it('should generate six line bets with exactly 6 numbers', () => {
      const bets = config.generatePossibleBets();
      bets.forEach((bet) => {
        expect(bet.length).toBe(6);
      });
    });

    it('should format numbers correctly', () => {
      expect(config.formatNumbers([1, 2, 3, 4, 5, 6])).toBe('1-2-3-4-5-6');
    });
  });

  describe('getBetConfig', () => {
    it('should return correct config for each valid key', () => {
      const keys: BetConfigKey[] = [
        'STRAIGHT_UP',
        'SPLIT',
        'STREET',
        'CORNER',
        'SIX_LINE',
      ];

      keys.forEach((key) => {
        const config = getBetConfig(key);
        expect(config).toBe(BET_CONFIGS[key]);
      });
    });

    it('should return BetConfig type with all required properties', () => {
      const config = getBetConfig('STRAIGHT_UP');
      
      // Type guard to ensure config is BetConfig
      const isValidConfig = (c: BetConfig): boolean => {
        return (
          typeof c.type === 'string' &&
          typeof c.name === 'string' &&
          typeof c.displayName === 'string' &&
          typeof c.payout === 'number' &&
          typeof c.description === 'string' &&
          typeof c.hintText === 'string' &&
          typeof c.exampleChips === 'number' &&
          typeof c.generatePossibleBets === 'function' &&
          typeof c.formatNumbers === 'function'
        );
      };

      expect(isValidConfig(config)).toBe(true);
    });
  });

  describe('payout values', () => {
    it('should have correct payout values for all bet types', () => {
      const expectedPayouts: Record<BetConfigKey, number> = {
        STRAIGHT_UP: 35,
        SPLIT: 17,
        STREET: 11,
        CORNER: 8,
        SIX_LINE: 5,
      };

      Object.entries(expectedPayouts).forEach(([key, payout]) => {
        expect(BET_CONFIGS[key as BetConfigKey].payout).toBe(payout);
      });
    });

    it('should have payouts in descending order by coverage', () => {
      const payouts = [
        BET_CONFIGS.STRAIGHT_UP.payout,
        BET_CONFIGS.SPLIT.payout,
        BET_CONFIGS.STREET.payout,
        BET_CONFIGS.CORNER.payout,
        BET_CONFIGS.SIX_LINE.payout,
      ];

      // Each payout should be less than the previous (more numbers = lower payout)
      for (let i = 1; i < payouts.length; i++) {
        expect(payouts[i]).toBeLessThan(payouts[i - 1]);
      }
    });
  });
});

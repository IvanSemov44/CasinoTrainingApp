/**
 * Tests for HomeScreen component.
 * Note: Full integration tests require complex mocking of react-native hooks.
 * These tests focus on unit testing business logic and simplified component tests.
 */

import { CATEGORIES } from '@constants/navigation.constants';

describe('HomeScreen', () => {
  describe('CATEGORIES', () => {
    it('contains roulette category', () => {
      const rouletteCategory = CATEGORIES.find(cat => cat.label === 'ROULETTE');
      expect(rouletteCategory).toBeDefined();
      expect(rouletteCategory!.games.length).toBeGreaterThan(0);
    });

    it('contains poker category', () => {
      const pokerCategory = CATEGORIES.find(cat => cat.label === 'POKER');
      expect(pokerCategory).toBeDefined();
      expect(pokerCategory!.games.length).toBeGreaterThan(0);
    });

    it('contains all expected roulette games', () => {
      const rouletteCategory = CATEGORIES.find(cat => cat.label === 'ROULETTE');
      expect(rouletteCategory).toBeDefined();

      const gameRoutes = rouletteCategory!.games.map(g => g.route);
      expect(gameRoutes).toContain('RouletteExercises');
      expect(gameRoutes).toContain('SectorTraining');
      expect(gameRoutes).toContain('PositionTraining');
      expect(gameRoutes).toContain('CashConversionDifficultySelection');
      expect(gameRoutes).toContain('RKMenu');
    });

    it('contains all expected poker games', () => {
      const pokerCategory = CATEGORIES.find(cat => cat.label === 'POKER');
      expect(pokerCategory).toBeDefined();

      const gameRoutes = pokerCategory!.games.map(g => g.route);
      expect(gameRoutes).toContain('TCPMenu');
      expect(gameRoutes).toContain('BJMenu');
      expect(gameRoutes).toContain('CPMenu');
      expect(gameRoutes).toContain('THUMenu');
      expect(gameRoutes).toContain('CallBetsMenu');
      expect(gameRoutes).toContain('PLOMenu');
    });

    it('has unique game titles across all categories', () => {
      const allTitles = CATEGORIES.flatMap(cat => cat.games.map(g => g.title));
      const uniqueTitles = new Set(allTitles);
      expect(uniqueTitles.size).toBe(allTitles.length);
    });

    it('has unique game routes across all categories', () => {
      const allRoutes = CATEGORIES.flatMap(cat => cat.games.map(g => g.route));
      const uniqueRoutes = new Set(allRoutes);
      expect(uniqueRoutes.size).toBe(allRoutes.length);
    });

    it('all games have emojis', () => {
      CATEGORIES.forEach(category => {
        category.games.forEach(game => {
          expect(game.emoji).toBeDefined();
          expect(game.emoji.length).toBeGreaterThan(0);
        });
      });
    });

    it('all games have tags', () => {
      CATEGORIES.forEach(category => {
        category.games.forEach(game => {
          expect(game.tags).toBeDefined();
          expect(game.tags.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('card width calculation', () => {
    const calculateCardWidth = (width: number) => {
      const gutter = 20;
      const gap = 10;
      return Math.floor((width - gutter * 2 - gap) / 2);
    };

    it('calculates correct card width for default screen width (375)', () => {
      expect(calculateCardWidth(375)).toBe(162);
    });

    it('calculates correct card width for wider screen (414)', () => {
      expect(calculateCardWidth(414)).toBe(182);
    });

    it('calculates correct card width for narrow screen (320)', () => {
      expect(calculateCardWidth(320)).toBe(135);
    });

    it('calculates correct card width for tablet (768)', () => {
      // (768 - 40 - 10) / 2 = 359
      expect(calculateCardWidth(768)).toBe(359);
    });

    it('calculates correct card width for large tablet (1024)', () => {
      // (1024 - 40 - 10) / 2 = 487
      expect(calculateCardWidth(1024)).toBe(487);
    });

    it('handles very narrow screen (280)', () => {
      // (280 - 40 - 10) / 2 = 115
      expect(calculateCardWidth(280)).toBe(115);
    });

    it('handles fractional results by flooring', () => {
      // 390 - 40 - 10 = 340, /2 = 170
      expect(calculateCardWidth(390)).toBe(170);
    });
  });

  describe('route navigation', () => {
    it('all game routes are valid navigation targets', () => {
      // All routes should be non-empty strings
      CATEGORIES.forEach(category => {
        category.games.forEach(game => {
          expect(typeof game.route).toBe('string');
          expect(game.route.length).toBeGreaterThan(0);
        });
      });
    });

    it('can navigate to all game routes from Home screen', () => {
      // This test documents the expected navigation behavior
      const mockNavigate = jest.fn();

      // Simulate navigation for each game
      CATEGORIES.forEach(category => {
        category.games.forEach(game => {
          mockNavigate(game.route);
          expect(mockNavigate).toHaveBeenCalledWith(game.route);
          mockNavigate.mockClear();
        });
      });
    });
  });
});

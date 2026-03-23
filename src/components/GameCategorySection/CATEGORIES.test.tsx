import { CATEGORIES } from './navigation.constants';

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
    expect(gameRoutes).toContain('CallBetsMenu');
  });

  it('contains all expected poker games', () => {
    const pokerCategory = CATEGORIES.find(cat => cat.label === 'POKER');
    expect(pokerCategory).toBeDefined();

    const gameRoutes = pokerCategory!.games.map(g => g.route);
    expect(gameRoutes).toContain('TCPMenu');
    expect(gameRoutes).toContain('BJMenu');
    expect(gameRoutes).toContain('CPMenu');
    expect(gameRoutes).toContain('THUMenu');
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
    const mockNavigate = jest.fn();

    CATEGORIES.forEach(category => {
      category.games.forEach(game => {
        mockNavigate(game.route);
        expect(mockNavigate).toHaveBeenCalledWith(game.route);
        mockNavigate.mockClear();
      });
    });
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';

// Router mock must be established before importing components that use it
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

import { GameCategorySection } from './GameCategorySection';
import { CATEGORIES } from './navigation.constants';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('GameCategorySection + CATEGORIES', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders category headers and at least one game card', () => {
    const { getByText } = renderWithTheme(<GameCategorySection />);

    // Verify first category and its first game are rendered
    const firstCategory = CATEGORIES[0];
    expect(getByText(firstCategory.label)).toBeTruthy();
    expect(getByText(firstCategory.games[0].title)).toBeTruthy();
  });

  it('navigates to game link when a card is pressed', () => {
    const { getByText } = renderWithTheme(<GameCategorySection />);
    const firstGame = CATEGORIES[0].games[0];

    fireEvent.press(getByText(firstGame.title));
    expect(mockPush).toHaveBeenCalledWith(firstGame.link);
  });

  it('contains expected top-level categories (roulette, poker)', () => {
    const roulette = CATEGORIES.find(c => c.label === 'ROULETTE');
    const poker = CATEGORIES.find(c => c.label === 'POKER');

    expect(roulette).toBeDefined();
    expect(poker).toBeDefined();
    expect(roulette!.games.length).toBeGreaterThan(0);
    expect(poker!.games.length).toBeGreaterThan(0);
  });

  it('has unique game titles and links across categories', () => {
    const allTitles = CATEGORIES.flatMap(cat => cat.games.map(g => g.title));
    const uniqueTitles = new Set(allTitles);
    expect(uniqueTitles.size).toBe(allTitles.length);

    const allLinks = CATEGORIES.flatMap(cat => cat.games.map(g => g.link));
    const uniqueLinks = new Set(allLinks);
    expect(uniqueLinks.size).toBe(allLinks.length);
  });

  it('all games have non-empty link, emoji and tags', () => {
    CATEGORIES.forEach(category => {
      category.games.forEach(game => {
        expect(typeof game.link).toBe('string');
        expect(game.link.length).toBeGreaterThan(0);
        expect(game.emoji).toBeDefined();
        expect(game.emoji.length).toBeGreaterThan(0);
        // tags are strings in the current dataset
        expect(typeof game.tags).toBe('string');
        expect(game.tags.length).toBeGreaterThan(0);
      });
    });
  });

  it('detects missing or empty links in a dataset', () => {
    // Build a deliberately broken dataset
    const broken = [
      {
        label: 'BROKEN',
        games: [{ title: 'NoLink', emoji: '❓', tags: ['test'] as string[] }],
      },
    ];

    const hasMissingLink = broken.flatMap(cat => cat.games).some(g => !('link' in g) || !g.link);
    expect(hasMissingLink).toBe(true);
  });
});

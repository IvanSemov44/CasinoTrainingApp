import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import type { GameCategory } from '@constants/navigation.constants';
import GameCategorySection from './GameCategorySection';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('GameCategorySection', () => {
  it('renders category and game cards, forwarding select callback', () => {
    const onSelectGame = jest.fn();
    const category: GameCategory = {
      label: 'ROULETTE',
      games: [
        {
          route: 'RouletteExercises',
          emoji: '🎰',
          title: 'Roulette Training',
          tags: 'Payouts',
        },
      ],
    };

    const { getByText } = renderWithTheme(
      <GameCategorySection category={category} cardWidth={140} onSelectGame={onSelectGame} />
    );

    expect(getByText('ROULETTE')).toBeTruthy();
    fireEvent.press(getByText('Roulette Training'));
    expect(onSelectGame).toHaveBeenCalledWith('RouletteExercises');
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import GameCard from './GameCard';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('GameCard', () => {
  it('renders game details and handles press', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <GameCard emoji="🎰" title="Roulette Training" tags="Payouts" width={140} onPress={onPress} />
    );

    expect(getByText('🎰')).toBeTruthy();
    expect(getByText('Roulette Training')).toBeTruthy();
    expect(getByText('Payouts')).toBeTruthy();

    fireEvent.press(getByText('Roulette Training'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

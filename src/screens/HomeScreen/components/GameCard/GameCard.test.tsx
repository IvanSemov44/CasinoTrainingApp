import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { GameCard } from './GameCard';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('GameCard', () => {
  it('renders game details and navigates when pressed', () => {
    const { getByText } = renderWithTheme(
      <GameCard emoji="🎰" title="Roulette Training" tags="Payouts" link={'/roulette'} />
    );

    expect(getByText('🎰')).toBeTruthy();
    expect(getByText('Roulette Training')).toBeTruthy();
    expect(getByText('Payouts')).toBeTruthy();

    fireEvent.press(getByText('Roulette Training'));
    expect(mockPush).toHaveBeenCalledWith('/roulette');
  });
});

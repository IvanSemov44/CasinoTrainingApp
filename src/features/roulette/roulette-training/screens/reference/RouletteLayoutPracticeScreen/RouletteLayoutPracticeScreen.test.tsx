import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import RouletteLayoutPracticeScreen from './RouletteLayoutPracticeScreen';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
}));

jest.mock('./useLayoutPracticeSession', () => ({
  useLayoutPracticeSession: () => ({
    selectedChipValue: 25,
    placedBets: [],
    selectedNumber: null,
    totalBetAmount: 0,
    handleNumberPress: jest.fn(),
    handleBetAreaPress: jest.fn(),
    handleChipSelect: jest.fn(),
    handleClearBets: jest.fn(),
  }),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('RouletteLayoutPracticeScreen', () => {
  it('renders layout practice screen sections', () => {
    const { getByText } = renderWithTheme(<RouletteLayoutPracticeScreen />);

    expect(getByText('Roulette Layout Practice')).toBeTruthy();
    expect(getByText('💡 How to Practice:')).toBeTruthy();
    expect(getByText('🗑️ Clear All Bets')).toBeTruthy();
    expect(getByText('⬅️ Back to Exercises')).toBeTruthy();
  });
});

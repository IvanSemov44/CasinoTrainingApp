import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import RouletteLayoutPracticeScreen from './RouletteLayoutPracticeScreen';

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
    const navigation = { goBack: jest.fn() } as unknown as React.ComponentProps<
      typeof RouletteLayoutPracticeScreen
    >['navigation'];

    const { getByText } = renderWithTheme(<RouletteLayoutPracticeScreen navigation={navigation} />);

    expect(getByText('Roulette Layout Practice')).toBeTruthy();
    expect(getByText('💡 How to Practice:')).toBeTruthy();
    expect(getByText('🗑️ Clear All Bets')).toBeTruthy();
    expect(getByText('⬅️ Back to Exercises')).toBeTruthy();
  });
});

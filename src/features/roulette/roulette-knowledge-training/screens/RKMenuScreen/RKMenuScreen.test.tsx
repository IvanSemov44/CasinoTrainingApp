import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import RKMenuScreen from './RKMenuScreen';

// Create mock functions at module level
const mockPush = jest.fn();

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('RKMenuScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Roulette Knowledge title', () => {
      renderWithTheme(<RKMenuScreen />);
      expect(screen.getByText('Roulette Knowledge')).toBeOnTheScreen();
    });

    it('renders all 10 drill items', () => {
      renderWithTheme(<RKMenuScreen />);
      expect(screen.getByText('Outside Bet Payout')).toBeOnTheScreen();
      expect(screen.getByText('Announced Bet Net Win')).toBeOnTheScreen();
    });
  });

  describe('Navigation', () => {
    it('navigates to RKDrill with correct drill type', () => {
      renderWithTheme(<RKMenuScreen />);

      const outsideBetItem = screen.getByText('Outside Bet Payout');
      fireEvent.press(outsideBetItem);

      expect(mockPush).toHaveBeenCalledWith('/roulette-knowledge?drillType=outside-bet-payout');
    });
  });

  describe('Drill Data', () => {
    it('displays correct descriptions', () => {
      renderWithTheme(<RKMenuScreen />);
      expect(screen.getByText(/0 wins → ALL outside bets lose/)).toBeOnTheScreen();
    });

    it('shows all difficulty levels', () => {
      renderWithTheme(<RKMenuScreen />);
      expect(screen.getAllByText('EASY').length).toBeGreaterThan(0);
      expect(screen.getAllByText('MEDIUM').length).toBeGreaterThan(0);
      expect(screen.getAllByText('ADVANCED').length).toBeGreaterThan(0);
    });
  });
});

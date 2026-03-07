import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import RKMenuScreen from './RKMenuScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('RKMenuScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as unknown as React.ComponentProps<typeof RKMenuScreen>['navigation'];
  const mockRoute = undefined as unknown as React.ComponentProps<typeof RKMenuScreen>['route'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Roulette Knowledge title', () => {
      renderWithTheme(<RKMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(screen.getByText('Roulette Knowledge')).toBeOnTheScreen();
    });

    it('renders all 10 drill items', () => {
      renderWithTheme(<RKMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(screen.getByText('Outside Bet Payout')).toBeOnTheScreen();
      expect(screen.getByText('Announced Bet Net Win')).toBeOnTheScreen();
    });
  });

  describe('Navigation', () => {
    it('navigates to RKDrill with correct drill type', () => {
      renderWithTheme(<RKMenuScreen navigation={mockNavigation} route={mockRoute} />);

      const outsideBetItem = screen.getByText('Outside Bet Payout');
      fireEvent.press(outsideBetItem);

      expect(mockNavigation.navigate).toHaveBeenCalledWith('RKDrill', {
        drillType: 'outside-bet-payout',
      });
    });
  });

  describe('Drill Data', () => {
    it('displays correct descriptions', () => {
      renderWithTheme(<RKMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(screen.getByText(/0 wins → ALL outside bets lose/)).toBeOnTheScreen();
    });

    it('shows all difficulty levels', () => {
      renderWithTheme(<RKMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(screen.getAllByText('EASY').length).toBeGreaterThan(0);
      expect(screen.getAllByText('MEDIUM').length).toBeGreaterThan(0);
      expect(screen.getAllByText('ADVANCED').length).toBeGreaterThan(0);
    });
  });
});

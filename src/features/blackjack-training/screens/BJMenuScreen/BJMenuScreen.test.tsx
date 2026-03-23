import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import BJMenuScreen from './BJMenuScreen';

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

describe('BJMenuScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Blackjack title', () => {
      renderWithTheme(<BJMenuScreen />);
      expect(screen.getByText('Blackjack')).toBeOnTheScreen();
    });

    it('renders all drill items', () => {
      renderWithTheme(<BJMenuScreen />);
      expect(screen.getByText('Soft Hand Announcement')).toBeOnTheScreen();
      expect(screen.getByText('Dealer Action')).toBeOnTheScreen();
      expect(screen.getByText('Super Seven')).toBeOnTheScreen();
    });

    it('renders difficulty badges', () => {
      renderWithTheme(<BJMenuScreen />);
      expect(screen.getAllByText('EASY').length).toBeGreaterThan(0);
      expect(screen.getAllByText('ADVANCED').length).toBeGreaterThan(0);
    });
  });

  describe('Navigation', () => {
    it('navigates to BJDrill with correct drill type when item is pressed', () => {
      renderWithTheme(<BJMenuScreen />);

      const softHandItem = screen.getByText('Soft Hand Announcement');
      fireEvent.press(softHandItem);

      expect(mockPush).toHaveBeenCalledWith('/blackjack/soft-hand-recognition');
    });

    it('navigates with correct drill type for different drills', () => {
      renderWithTheme(<BJMenuScreen />);

      const superSevenItem = screen.getByText('Super Seven');
      fireEvent.press(superSevenItem);

      expect(mockPush).toHaveBeenCalledWith('/blackjack/super-seven');
    });
  });

  describe('Drill Data', () => {
    it('displays correct descriptions for drills', () => {
      renderWithTheme(<BJMenuScreen />);
      expect(
        screen.getByText('Hit or stand? Dealer stands on ALL 17s, including soft 17 (A+6).')
      ).toBeOnTheScreen();
    });

    it('shows correct difficulty levels for drills', () => {
      renderWithTheme(<BJMenuScreen />);
      // Check for both easy and advanced difficulty badges
      const easyBadges = screen.getAllByText('EASY');
      const advancedBadges = screen.getAllByText('ADVANCED');
      expect(easyBadges.length).toBeGreaterThan(0);
      expect(advancedBadges.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('renders content accessible for screen readers', () => {
      renderWithTheme(<BJMenuScreen />);
      expect(screen.getByText('Blackjack')).toBeOnTheScreen();
      expect(screen.getByText('Soft Hand Announcement')).toBeOnTheScreen();
    });
  });

  describe('Props with Defaults', () => {
    it('renders without props', () => {
      const { toJSON } = renderWithTheme(<BJMenuScreen />);
      expect(toJSON()).toBeTruthy();
    });
  });
});

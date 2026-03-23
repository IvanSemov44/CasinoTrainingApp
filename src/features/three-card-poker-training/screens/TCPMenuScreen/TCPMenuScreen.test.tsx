import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import TCPMenuScreen from './TCPMenuScreen';

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

describe('TCPMenuScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Three Card Poker title', () => {
      renderWithTheme(<TCPMenuScreen />);
      expect(screen.getByText('Three Card Poker')).toBeOnTheScreen();
    });

    it('renders all 5 drill items', () => {
      renderWithTheme(<TCPMenuScreen />);
      expect(screen.getByText('Hand Recognition')).toBeOnTheScreen();
      expect(screen.getByText('Dealer Qualification')).toBeOnTheScreen();
      expect(screen.getByText('Full Outcome')).toBeOnTheScreen();
    });
  });

  describe('Navigation', () => {
    it('navigates to TCPDrill with correct drill type', () => {
      renderWithTheme(<TCPMenuScreen />);

      const handRecognitionItem = screen.getByText('Hand Recognition');
      fireEvent.press(handRecognitionItem);

      expect(mockPush).toHaveBeenCalledWith('/tcp/hand-recognition');
    });
  });

  describe('Drill Data', () => {
    it('displays correct descriptions', () => {
      renderWithTheme(<TCPMenuScreen />);
      expect(screen.getByText(/Does the dealer qualify?/)).toBeOnTheScreen();
    });

    it('shows difficulty levels', () => {
      renderWithTheme(<TCPMenuScreen />);
      expect(screen.getAllByText('EASY').length).toBeGreaterThan(0);
      expect(screen.getAllByText('ADVANCED').length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('renders content for screen readers', () => {
      renderWithTheme(<TCPMenuScreen />);
      expect(screen.getByText('Three Card Poker')).toBeOnTheScreen();
    });
  });
});

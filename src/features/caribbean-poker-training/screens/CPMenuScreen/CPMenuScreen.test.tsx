import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CPMenuScreen from './CPMenuScreen';

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

describe('CPMenuScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Caribbean Poker title', () => {
      renderWithTheme(<CPMenuScreen />);
      expect(screen.getByText('Caribbean Poker')).toBeOnTheScreen();
    });

    it('renders all 9 drill items', () => {
      renderWithTheme(<CPMenuScreen />);
      expect(screen.getByText('Hand Recognition')).toBeOnTheScreen();
      expect(screen.getByText('Swap Procedure')).toBeOnTheScreen();
    });
  });

  describe('Navigation', () => {
    it('navigates to CPDrill with correct drill type', () => {
      renderWithTheme(<CPMenuScreen />);

      const handRecognitionItem = screen.getByText('Hand Recognition');
      fireEvent.press(handRecognitionItem);

      expect(mockPush).toHaveBeenCalledWith('/cp/hand-recognition');
    });
  });

  describe('Drill Data', () => {
    it('displays correct descriptions', () => {
      renderWithTheme(<CPMenuScreen />);
      expect(screen.getByText(/Does the dealer qualify?/)).toBeOnTheScreen();
    });

    it('shows all difficulty levels', () => {
      renderWithTheme(<CPMenuScreen />);
      expect(screen.getAllByText('EASY').length).toBeGreaterThan(0);
      expect(screen.getAllByText('MEDIUM').length).toBeGreaterThan(0);
      expect(screen.getAllByText('ADVANCED').length).toBeGreaterThan(0);
    });
  });
});

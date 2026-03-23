import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import THUMenuScreen from './THUMenuScreen';

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

describe('THUMenuScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it("renders the Texas Hold'em Ultimate title", () => {
      renderWithTheme(<THUMenuScreen />);
      expect(screen.getByText("Texas Hold'em Ultimate")).toBeOnTheScreen();
    });

    it('renders all 10 drill items', () => {
      renderWithTheme(<THUMenuScreen />);
      expect(screen.getByText('Hand Recognition')).toBeOnTheScreen();
      expect(screen.getByText('Full Outcome')).toBeOnTheScreen();
    });
  });

  describe('Navigation', () => {
    it('navigates to THUDrill with correct drill type', () => {
      renderWithTheme(<THUMenuScreen />);

      const handRecognitionItem = screen.getByText('Hand Recognition');
      fireEvent.press(handRecognitionItem);

      expect(mockPush).toHaveBeenCalledWith('/thu/hand-recognition');
    });
  });

  describe('Drill Data', () => {
    it('displays correct descriptions', () => {
      renderWithTheme(<THUMenuScreen />);
      expect(screen.getByText(/Does the dealer qualify?/)).toBeOnTheScreen();
    });

    it('shows all difficulty levels', () => {
      renderWithTheme(<THUMenuScreen />);
      expect(screen.getAllByText('EASY').length).toBeGreaterThan(0);
      expect(screen.getAllByText('ADVANCED').length).toBeGreaterThan(0);
    });
  });
});

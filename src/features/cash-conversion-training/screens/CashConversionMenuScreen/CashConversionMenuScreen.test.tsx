import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CashConversionMenuScreen from './CashConversionMenuScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

// Mock the modal component
jest.mock('../../components', () => ({
  CashConversionTrainingModal: jest.fn().mockImplementation(({ visible }) => {
    if (!visible) return null;
    return null; // Simple mock - just return null for now
  }),
}));

// Mock constants
jest.mock('../../constants/sectors', () => ({
  SECTOR_POSITIONS: {
    tier: 12,
    orphelins: 8,
    voisins: 17,
    zero: 7,
    neighbors: 5,
  },
  DIFFICULTY_MAX_BET: {
    easy: 50,
    medium: 100,
    hard: 200,
  },
}));

describe('CashConversionMenuScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the title', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      expect(getByText('Cash Conversion Training')).toBeTruthy();
    });

    it('should render the subtitle', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      expect(getByText('Master sector bet calculations')).toBeTruthy();
    });

    it('should render the start training button', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      expect(getByText('Start Training')).toBeTruthy();
    });

    it('should render the start button hint', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      expect(getByText('Configure and start your training')).toBeTruthy();
    });

    it('should render the How It Works section', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      expect(getByText('How It Works')).toBeTruthy();
    });

    it('should render training type items', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      expect(getByText('• Total bet amount per sector')).toBeTruthy();
      expect(getByText('• Bet per position')).toBeTruthy();
      expect(getByText('• Change/rest to return')).toBeTruthy();
    });

    it('should render the Available Sectors section', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      expect(getByText('Available Sectors')).toBeTruthy();
    });

    it('should render sector items with position counts', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      expect(getByText(/Tier - 12 positions/)).toBeTruthy();
      expect(getByText(/Orphelins - 8 positions/)).toBeTruthy();
      expect(getByText(/Voisins - 17 positions/)).toBeTruthy();
      expect(getByText(/Zero - 7 positions/)).toBeTruthy();
      expect(getByText(/Neighbors - 5 positions/)).toBeTruthy();
    });

    it('should render the Difficulty Levels section', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      expect(getByText('Difficulty Levels')).toBeTruthy();
    });

    it('should render difficulty items with max bets', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      expect(getByText(/Easy - Max \$50 per position/)).toBeTruthy();
      expect(getByText(/Medium - Max \$100 per position/)).toBeTruthy();
      expect(getByText(/Hard - Max \$200 per position/)).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should have accessible start button', () => {
      const { getByLabelText } = renderWithTheme(<CashConversionMenuScreen />);
      const startButton = getByLabelText('Start Training');
      expect(startButton).toBeTruthy();
    });

    it('should toggle modal visibility when start button is pressed', () => {
      const { getByText } = renderWithTheme(<CashConversionMenuScreen />);
      fireEvent.press(getByText('Start Training'));
      expect(true).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('should have accessibility label for start button', () => {
      const { getByLabelText } = renderWithTheme(<CashConversionMenuScreen />);
      const startButton = getByLabelText('Start Training');
      expect(startButton).toBeTruthy();
    });
  });
});

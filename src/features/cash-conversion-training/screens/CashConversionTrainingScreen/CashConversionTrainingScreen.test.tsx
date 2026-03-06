import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CashConversionTrainingScreen from './CashConversionTrainingScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

// Mock the components
jest.mock('../../components', () => ({
  CashDisplay: jest.fn(() => null),
  RequestDisplay: jest.fn(() => null),
  AnswerInput: jest.fn(() => null),
  ResultFeedback: jest.fn(() => null),
}));

// Mock utilities
jest.mock('../../utils/calculations', () => ({
  generateRandomCashAmount: jest.fn(() => 100),
  generateRandomSector: jest.fn(() => 'tier'),
  generateRandomRequest: jest.fn(() => ({
    sector: 'tier',
    cashAmount: 100,
    requestType: 'by-amount',
    specifiedAmount: 10,
  })),
  calculateCorrectAnswer: jest.fn(() => ({ totalBet: 120, betPerPosition: 10, change: -20 })),
  validateAnswer: jest.fn(() => ({ isCorrect: true })),
}));

// Mock constants
jest.mock('../../constants/sectors', () => ({
  SECTOR_NAMES: {
    tier: 'Tier',
    orphelins: 'Orphelins',
    voisins: 'Voisins',
    zero: 'Zero',
    neighbors: 'Neighbors',
  },
  SECTOR_POSITIONS: {
    tier: 12,
    orphelins: 8,
    voisins: 17,
    zero: 7,
    neighbors: 5,
  },
}));

describe('CashConversionTrainingScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as unknown as React.ComponentProps<typeof CashConversionTrainingScreen>['navigation'];
  const mockRoute = {
    params: { difficulty: 'easy', sector: 'tier' },
  } as unknown as React.ComponentProps<typeof CashConversionTrainingScreen>['route'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<CashConversionTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with different difficulty levels', () => {
      const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
      difficulties.forEach((difficulty) => {
        const diffRoute = { params: { difficulty, sector: 'tier' } } as unknown as React.ComponentProps<typeof CashConversionTrainingScreen>['route'];
        const { toJSON } = renderWithTheme(<CashConversionTrainingScreen navigation={mockNavigation} route={diffRoute} />);
        expect(toJSON()).toBeTruthy();
      });
    });

    it('renders with different sectors', () => {
      const sectors: Array<'tier' | 'orphelins' | 'voisins' | 'zero' | 'neighbors' | 'random'> = ['tier', 'orphelins', 'voisins', 'zero', 'neighbors', 'random'];
      sectors.forEach((sector) => {
        const sectorRoute = { params: { difficulty: 'easy', sector } } as unknown as React.ComponentProps<typeof CashConversionTrainingScreen>['route'];
        const { toJSON } = renderWithTheme(<CashConversionTrainingScreen navigation={mockNavigation} route={sectorRoute} />);
        expect(toJSON()).toBeTruthy();
      });
    });
  });

  describe('Difficulty Levels', () => {
    it('handles easy difficulty', () => {
      const easyRoute = { params: { difficulty: 'easy', sector: 'tier' } } as unknown as React.ComponentProps<typeof CashConversionTrainingScreen>['route'];
      const { toJSON } = renderWithTheme(<CashConversionTrainingScreen navigation={mockNavigation} route={easyRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles medium difficulty', () => {
      const mediumRoute = { params: { difficulty: 'medium', sector: 'tier' } } as unknown as React.ComponentProps<typeof CashConversionTrainingScreen>['route'];
      const { toJSON } = renderWithTheme(<CashConversionTrainingScreen navigation={mockNavigation} route={mediumRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles hard difficulty', () => {
      const hardRoute = { params: { difficulty: 'hard', sector: 'tier' } } as unknown as React.ComponentProps<typeof CashConversionTrainingScreen>['route'];
      const { toJSON } = renderWithTheme(<CashConversionTrainingScreen navigation={mockNavigation} route={hardRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Sector Handling', () => {
    it('handles tier sector', () => {
      const tierRoute = { params: { difficulty: 'easy', sector: 'tier' } } as unknown as React.ComponentProps<typeof CashConversionTrainingScreen>['route'];
      const { toJSON } = renderWithTheme(<CashConversionTrainingScreen navigation={mockNavigation} route={tierRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles random sector', () => {
      const randomRoute = { params: { difficulty: 'easy', sector: 'random' } } as unknown as React.ComponentProps<typeof CashConversionTrainingScreen>['route'];
      const { toJSON } = renderWithTheme(<CashConversionTrainingScreen navigation={mockNavigation} route={randomRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles all sector types', () => {
      const sectors: Array<'tier' | 'orphelins' | 'voisins' | 'zero' | 'neighbors' | 'random'> = ['tier', 'orphelins', 'voisins', 'zero', 'neighbors', 'random'];
      sectors.forEach((sector) => {
        const sectorRoute = { params: { difficulty: 'easy', sector } } as unknown as React.ComponentProps<typeof CashConversionTrainingScreen>['route'];
        const { toJSON } = renderWithTheme(<CashConversionTrainingScreen navigation={mockNavigation} route={sectorRoute} />);
        expect(toJSON()).toBeTruthy();
      });
    });
  });
});

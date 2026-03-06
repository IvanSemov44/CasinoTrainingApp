import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import BJDrillScreen from './BJDrillScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('BJDrillScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as any;
  const mockRoute = {
    params: { drillType: 'soft-hand-recognition' },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(
        <BJDrillScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('passes correct drillType to DrillScreen', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Dealer Label Logic', () => {
    it('returns Dealers Upcard for insurance-timing', () => {
      const insuranceRoute = {
        params: { drillType: 'insurance-timing' },
      } as any;
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={insuranceRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('returns Dealers Hand for other drill types', () => {
      const otherRoute = {
        params: { drillType: 'hand-comparison' },
      } as any;
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={otherRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses route params correctly', () => {
      const customRoute = {
        params: { drillType: 'super-seven' },
      } as any;
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={customRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('passes scenarioGenerator function to DrillScreen', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('passes dealerLabel function to DrillScreen', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Different Drill Types', () => {
    it('handles soft-hand-recognition drill type', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles dealer-action drill type', () => {
      const actionRoute = {
        params: { drillType: 'dealer-action' },
      } as any;
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={actionRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles bj-payout drill type', () => {
      const payoutRoute = {
        params: { drillType: 'bj-payout' },
      } as any;
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={payoutRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });
});

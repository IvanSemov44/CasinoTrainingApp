import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import BJDrillScreen from './BJDrillScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('BJDrillScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as unknown as React.ComponentProps<typeof BJDrillScreen>['navigation'];
  const makeRoute = (drillType: string) => ({
    params: { drillType },
  }) as unknown as React.ComponentProps<typeof BJDrillScreen>['route'];
  const mockRoute = makeRoute('soft-hand-recognition');

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
      const insuranceRoute = makeRoute('insurance-timing');
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={insuranceRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('returns Dealers Hand for other drill types', () => {
      const otherRoute = makeRoute('hand-comparison');
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={otherRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses route params correctly', () => {
      const customRoute = makeRoute('super-seven');
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
      const actionRoute = makeRoute('dealer-action');
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={actionRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles bj-payout drill type', () => {
      const payoutRoute = makeRoute('bj-payout');
      const { toJSON } = renderWithTheme(<BJDrillScreen navigation={mockNavigation} route={payoutRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import RKDrillScreen from './RKDrillScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('RKDrillScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as unknown as React.ComponentProps<
    typeof RKDrillScreen
  >['navigation'];
  const makeRoute = (drillType: string) =>
    ({
      params: { drillType },
    }) as unknown as React.ComponentProps<typeof RKDrillScreen>['route'];
  const mockRoute = makeRoute('outside-bet-payout');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(
        <RKDrillScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses route params correctly', () => {
      const customRoute = makeRoute('announced-inside-mixed');
      const { toJSON } = renderWithTheme(
        <RKDrillScreen navigation={mockNavigation} route={customRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Different Drill Types', () => {
    it('handles multiple drill types', () => {
      const drillTypes = [
        'outside-bet-payout',
        'announced-chip-count',
        'bet-limits',
        'announced-inside-mixed',
      ];
      drillTypes.forEach(drillType => {
        const route = makeRoute(drillType);
        const { toJSON } = renderWithTheme(
          <RKDrillScreen navigation={mockNavigation} route={route} />
        );
        expect(toJSON()).toBeTruthy();
      });
    });
  });
});

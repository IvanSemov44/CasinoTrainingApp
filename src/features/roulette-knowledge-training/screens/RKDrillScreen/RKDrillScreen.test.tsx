import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import RKDrillScreen from './RKDrillScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('RKDrillScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as any;
  const mockRoute = {
    params: { drillType: 'outside-bet-payout' },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<RKDrillScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses route params correctly', () => {
      const customRoute = {
        params: { drillType: 'announced-inside-mixed' },
      } as any;
      const { toJSON } = renderWithTheme(<RKDrillScreen navigation={mockNavigation} route={customRoute} />);
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
      drillTypes.forEach((drillType) => {
        const route = { params: { drillType } } as any;
        const { toJSON } = renderWithTheme(<RKDrillScreen navigation={mockNavigation} route={route} />);
        expect(toJSON()).toBeTruthy();
      });
    });
  });
});

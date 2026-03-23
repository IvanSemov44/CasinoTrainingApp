import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import RKDrillScreen from './RKDrillScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('RKDrillScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<RKDrillScreen drillType="outside-bet-payout" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses props correctly', () => {
      const { toJSON } = renderWithTheme(<RKDrillScreen drillType="announced-inside-mixed" />);
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
        const { toJSON } = renderWithTheme(
          <RKDrillScreen
            drillType={
              drillType as
                | 'outside-bet-payout'
                | 'announced-chip-count'
                | 'bet-limits'
                | 'announced-inside-mixed'
            }
          />
        );
        expect(toJSON()).toBeTruthy();
      });
    });
  });
});

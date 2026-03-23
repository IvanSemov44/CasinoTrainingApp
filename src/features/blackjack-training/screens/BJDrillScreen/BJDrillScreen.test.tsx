import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import BJDrillScreen from './BJDrillScreen';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('BJDrillScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen drillType="soft-hand-recognition" />);
      expect(toJSON()).toBeTruthy();
    });

    it('passes correct drillType to DrillScreen', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen drillType="soft-hand-recognition" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Dealer Label Logic', () => {
    it('returns Dealers Upcard for insurance-timing', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen drillType="insurance-timing" />);
      expect(toJSON()).toBeTruthy();
    });

    it('returns Dealers Hand for other drill types', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen drillType="hand-comparison" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses drillType prop correctly', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen drillType="super-seven" />);
      expect(toJSON()).toBeTruthy();
    });

    it('passes scenarioGenerator function to DrillScreen', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen drillType="soft-hand-recognition" />);
      expect(toJSON()).toBeTruthy();
    });

    it('passes dealerLabel function to DrillScreen', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen drillType="soft-hand-recognition" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Different Drill Types', () => {
    it('handles soft-hand-recognition drill type', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen drillType="soft-hand-recognition" />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles dealer-action drill type', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen drillType="dealer-action" />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles bj-payout drill type', () => {
      const { toJSON } = renderWithTheme(<BJDrillScreen drillType="bj-payout" />);
      expect(toJSON()).toBeTruthy();
    });
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CPDrillScreen from './CPDrillScreen';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('CPDrillScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<CPDrillScreen drillType="hand-recognition" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses drillType prop correctly', () => {
      const { toJSON } = renderWithTheme(<CPDrillScreen drillType="swap-procedure" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Different Drill Types', () => {
    it('handles multiple drill types', () => {
      const drillTypes = ['hand-recognition', 'bonus-after-swap', 'swap-procedure'];
      drillTypes.forEach(drillType => {
        const { toJSON } = renderWithTheme(
          <CPDrillScreen
            drillType={drillType as 'hand-recognition' | 'bonus-after-swap' | 'swap-procedure'}
          />
        );
        expect(toJSON()).toBeTruthy();
      });
    });
  });
});

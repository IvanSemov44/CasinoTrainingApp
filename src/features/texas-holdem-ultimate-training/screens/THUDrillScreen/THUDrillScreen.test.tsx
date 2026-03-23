import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import THUDrillScreen from './THUDrillScreen';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('THUDrillScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<THUDrillScreen drillType="hand-recognition" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses drillType prop correctly', () => {
      const { toJSON } = renderWithTheme(<THUDrillScreen drillType="full-outcome" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Different Drill Types', () => {
    it('handles multiple drill types', () => {
      const drillTypes = ['hand-recognition', 'raise-sizing', 'blind-no-qualify', 'full-outcome'];
      drillTypes.forEach(drillType => {
        const { toJSON } = renderWithTheme(
          <THUDrillScreen
            drillType={
              drillType as 'hand-recognition' | 'raise-sizing' | 'blind-no-qualify' | 'full-outcome'
            }
          />
        );
        expect(toJSON()).toBeTruthy();
      });
    });
  });
});

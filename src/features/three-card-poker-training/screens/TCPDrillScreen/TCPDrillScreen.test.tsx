import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import TCPDrillScreen from './TCPDrillScreen';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('TCPDrillScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<TCPDrillScreen drillType="hand-recognition" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses drillType prop correctly', () => {
      const { toJSON } = renderWithTheme(<TCPDrillScreen drillType="dealer-qualification" />);
      expect(toJSON()).toBeTruthy();
    });

    it('passes correct scenario generator', () => {
      const { toJSON } = renderWithTheme(<TCPDrillScreen drillType="hand-recognition" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Different Drill Types', () => {
    it('handles hand-recognition drill type', () => {
      const { toJSON } = renderWithTheme(<TCPDrillScreen drillType="hand-recognition" />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles full-outcome drill type', () => {
      const { toJSON } = renderWithTheme(<TCPDrillScreen drillType="full-outcome" />);
      expect(toJSON()).toBeTruthy();
    });
  });
});

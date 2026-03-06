import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CPDrillScreen from './CPDrillScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('CPDrillScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as any;
  const mockRoute = {
    params: { drillType: 'hand-recognition' },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<CPDrillScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses route params correctly', () => {
      const customRoute = {
        params: { drillType: 'swap-procedure' },
      } as any;
      const { toJSON } = renderWithTheme(<CPDrillScreen navigation={mockNavigation} route={customRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Different Drill Types', () => {
    it('handles multiple drill types', () => {
      const drillTypes = ['hand-recognition', 'bonus-after-swap', 'swap-procedure'];
      drillTypes.forEach((drillType) => {
        const route = { params: { drillType } } as any;
        const { toJSON } = renderWithTheme(<CPDrillScreen navigation={mockNavigation} route={route} />);
        expect(toJSON()).toBeTruthy();
      });
    });
  });
});

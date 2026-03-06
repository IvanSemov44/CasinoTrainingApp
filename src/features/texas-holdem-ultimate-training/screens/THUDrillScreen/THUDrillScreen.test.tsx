import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import THUDrillScreen from './THUDrillScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('THUDrillScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as any;
  const mockRoute = {
    params: { drillType: 'hand-recognition' },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<THUDrillScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses route params correctly', () => {
      const customRoute = {
        params: { drillType: 'full-outcome' },
      } as any;
      const { toJSON } = renderWithTheme(<THUDrillScreen navigation={mockNavigation} route={customRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Different Drill Types', () => {
    it('handles multiple drill types', () => {
      const drillTypes = [
        'hand-recognition',
        'raise-sizing',
        'blind-no-qualify',
        'full-outcome',
      ];
      drillTypes.forEach((drillType) => {
        const route = { params: { drillType } } as any;
        const { toJSON } = renderWithTheme(<THUDrillScreen navigation={mockNavigation} route={route} />);
        expect(toJSON()).toBeTruthy();
      });
    });
  });
});

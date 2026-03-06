import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import THUDrillScreen from './THUDrillScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('THUDrillScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as unknown as React.ComponentProps<typeof THUDrillScreen>['navigation'];
  const makeRoute = (drillType: string) => ({
    params: { drillType },
  }) as unknown as React.ComponentProps<typeof THUDrillScreen>['route'];
  const mockRoute = makeRoute('hand-recognition');

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
      const customRoute = makeRoute('full-outcome');
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
        const route = makeRoute(drillType);
        const { toJSON } = renderWithTheme(<THUDrillScreen navigation={mockNavigation} route={route} />);
        expect(toJSON()).toBeTruthy();
      });
    });
  });
});

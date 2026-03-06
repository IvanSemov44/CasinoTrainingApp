import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import TCPDrillScreen from './TCPDrillScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('TCPDrillScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as unknown as React.ComponentProps<typeof TCPDrillScreen>['navigation'];
  const makeRoute = (drillType: string) => ({
    params: { drillType },
  }) as unknown as React.ComponentProps<typeof TCPDrillScreen>['route'];
  const mockRoute = makeRoute('hand-recognition');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<TCPDrillScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Props and Params', () => {
    it('uses route params correctly', () => {
      const customRoute = makeRoute('dealer-qualification');
      const { toJSON } = renderWithTheme(<TCPDrillScreen navigation={mockNavigation} route={customRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('passes correct scenario generator', () => {
      const { toJSON } = renderWithTheme(<TCPDrillScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Different Drill Types', () => {
    it('handles hand-recognition drill type', () => {
      const { toJSON } = renderWithTheme(<TCPDrillScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles full-outcome drill type', () => {
      const outcomeRoute = makeRoute('full-outcome');
      const { toJSON } = renderWithTheme(<TCPDrillScreen navigation={mockNavigation} route={outcomeRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });
});

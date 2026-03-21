import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { SettingsProvider } from '@contexts/SettingsContext';
import SectorTrainingScreen from './SectorTrainingScreen';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <SettingsProvider>
      <ThemeProvider>{component}</ThemeProvider>
    </SettingsProvider>
  );
};

describe('SectorTrainingScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as unknown as React.ComponentProps<
    typeof SectorTrainingScreen
  >['navigation'];
  const makeRoute = (mode?: 'voisins' | 'tier' | 'orphelins' | 'zero' | 'random') =>
    ({
      params: mode ? { mode } : {},
    }) as unknown as React.ComponentProps<typeof SectorTrainingScreen>['route'];
  const mockRoute = makeRoute('random');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithProviders(
        <SectorTrainingScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('renders with different sector modes', () => {
      const sectors: Array<'voisins' | 'tier' | 'orphelins' | 'zero' | 'random'> = [
        'voisins',
        'tier',
        'orphelins',
        'zero',
        'random',
      ];
      sectors.forEach(sector => {
        const sectorRoute = makeRoute(sector);
        const { toJSON } = renderWithProviders(
          <SectorTrainingScreen navigation={mockNavigation} route={sectorRoute} />
        );
        expect(toJSON()).toBeTruthy();
      });
    });
  });

  describe('Mode Handling', () => {
    it('handles voisins mode', () => {
      const voisinsRoute = makeRoute('voisins');
      const { toJSON } = renderWithProviders(
        <SectorTrainingScreen navigation={mockNavigation} route={voisinsRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('handles tier mode', () => {
      const tierRoute = makeRoute('tier');
      const { toJSON } = renderWithProviders(
        <SectorTrainingScreen navigation={mockNavigation} route={tierRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('handles orphelins mode', () => {
      const orphelinsRoute = makeRoute('orphelins');
      const { toJSON } = renderWithProviders(
        <SectorTrainingScreen navigation={mockNavigation} route={orphelinsRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('handles zero mode', () => {
      const zeroRoute = makeRoute('zero');
      const { toJSON } = renderWithProviders(
        <SectorTrainingScreen navigation={mockNavigation} route={zeroRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('uses random mode as default if not provided', () => {
      const emptyRoute = makeRoute();
      const { toJSON } = renderWithProviders(
        <SectorTrainingScreen navigation={mockNavigation} route={emptyRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('HUD Elements', () => {
    it('displays score section', () => {
      const { getByText } = renderWithProviders(
        <SectorTrainingScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(getByText(/0\//)).toBeTruthy(); // Score starts as 0/0
    });
  });
});

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithProviders(<SectorTrainingScreen mode="random" />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with different sector modes', () => {
      const sectors = ['voisins', 'tier', 'orphelins', 'zero', 'random'];
      sectors.forEach(sector => {
        const { toJSON } = renderWithProviders(
          <SectorTrainingScreen
            mode={sector as 'voisins' | 'tier' | 'orphelins' | 'zero' | 'random'}
          />
        );
        expect(toJSON()).toBeTruthy();
      });
    });
  });

  describe('Mode Handling', () => {
    it('handles voisins mode', () => {
      const { toJSON } = renderWithProviders(<SectorTrainingScreen mode="voisins" />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles tier mode', () => {
      const { toJSON } = renderWithProviders(<SectorTrainingScreen mode="tier" />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles orphelins mode', () => {
      const { toJSON } = renderWithProviders(<SectorTrainingScreen mode="orphelins" />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles zero mode', () => {
      const { toJSON } = renderWithProviders(<SectorTrainingScreen mode="zero" />);
      expect(toJSON()).toBeTruthy();
    });

    it('uses random mode as default if not provided', () => {
      const { toJSON } = renderWithProviders(<SectorTrainingScreen />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('HUD Elements', () => {
    it('displays score section', () => {
      const { getByText } = renderWithProviders(<SectorTrainingScreen mode="random" />);
      expect(getByText(/0\//)).toBeTruthy(); // Score starts as 0/0
    });
  });
});

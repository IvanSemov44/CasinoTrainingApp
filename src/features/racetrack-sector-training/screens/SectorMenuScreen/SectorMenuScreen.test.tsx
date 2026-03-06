import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import SectorMenuScreen from './SectorMenuScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('SectorMenuScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as unknown as React.ComponentProps<typeof SectorMenuScreen>['navigation'];
  const mockRoute = {} as unknown as React.ComponentProps<typeof SectorMenuScreen>['route'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders the title', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Racetrack Sectors')).toBeTruthy();
    });

    it('renders the subtitle', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Learn which sector contains each winning number')).toBeTruthy();
    });
  });

  describe('Sector Modes', () => {
    it('renders Voisins du Zéro mode', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Voisins du Zéro')).toBeTruthy();
    });

    it('renders Tier du Cylindre mode', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Tier du Cylindre')).toBeTruthy();
    });

    it('renders Orphelins mode', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Orphelins')).toBeTruthy();
    });

    it('renders Jeu Zéro mode', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Jeu Zéro')).toBeTruthy();
    });

    it('renders Random Training mode', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Random Training')).toBeTruthy();
    });
  });

  describe('Sector Reference', () => {
    it('renders Sector Reference section', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Sector Reference:')).toBeTruthy();
    });
  });

  describe('How to Play', () => {
    it('renders How to Play section', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('How to Play:')).toBeTruthy();
    });

    it('renders all instruction steps', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText(/A winning number is displayed/)).toBeTruthy();
      expect(getByText(/Tap the correct sector/)).toBeTruthy();
      expect(getByText(/Get feedback and try the next/)).toBeTruthy();
      expect(getByText(/Build your score/)).toBeTruthy();
    });
  });
});

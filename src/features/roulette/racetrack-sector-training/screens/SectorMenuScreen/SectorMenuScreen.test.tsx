import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import SectorMenuScreen from './SectorMenuScreen';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('SectorMenuScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<SectorMenuScreen />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders the title', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen />);
      expect(getByText('Racetrack Sectors')).toBeTruthy();
    });

    it('renders the subtitle', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen />);
      expect(getByText('Learn which sector contains each winning number')).toBeTruthy();
    });
  });

  describe('Sector Modes', () => {
    it('renders Voisins du Zéro mode', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen />);
      expect(getByText('Voisins du Zéro')).toBeTruthy();
    });

    it('renders Tier du Cylindre mode', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen />);
      expect(getByText('Tier du Cylindre')).toBeTruthy();
    });

    it('renders Orphelins mode', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen />);
      expect(getByText('Orphelins')).toBeTruthy();
    });

    it('renders Jeu Zéro mode', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen />);
      expect(getByText('Jeu Zéro')).toBeTruthy();
    });

    it('renders Random Training mode', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen />);
      expect(getByText('Random Training')).toBeTruthy();
    });
  });

  describe('Sector Reference', () => {
    it('renders Sector Reference section', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen />);
      expect(getByText('Sector Reference:')).toBeTruthy();
    });
  });

  describe('How to Play', () => {
    it('renders How to Play section', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen />);
      expect(getByText('How to Play:')).toBeTruthy();
    });

    it('renders all instruction steps', () => {
      const { getByText } = renderWithTheme(<SectorMenuScreen />);
      expect(getByText(/A winning number is displayed/)).toBeTruthy();
      expect(getByText(/Tap the correct sector/)).toBeTruthy();
      expect(getByText(/Get feedback and try the next/)).toBeTruthy();
      expect(getByText(/Build your score/)).toBeTruthy();
    });
  });
});

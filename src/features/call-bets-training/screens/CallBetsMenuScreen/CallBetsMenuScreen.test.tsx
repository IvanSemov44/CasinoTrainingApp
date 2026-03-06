import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CallBetsMenuScreen from './CallBetsMenuScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

describe('CallBetsMenuScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the title', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('Call Bets Training')).toBeTruthy();
    });

    it('should render the subtitle', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('Master announced roulette bets')).toBeTruthy();
    });

    it('should render the Tier mode button', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('Tier')).toBeTruthy();
    });

    it('should render the Orphelins mode button', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('Orphelins')).toBeTruthy();
    });

    it('should render the Voisins mode button', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('Voisins')).toBeTruthy();
    });

    it('should render the Zero mode button', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('Zero')).toBeTruthy();
    });

    it('should render the Random Mode button', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('Random Mode')).toBeTruthy();
    });

    it('should render mode descriptions', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('Learn the Tier bet (12 positions)')).toBeTruthy();
      expect(getByText('Learn the Orphelins bet (8 positions)')).toBeTruthy();
    });

    it('should render What Are Call Bets section', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('What Are Call Bets?')).toBeTruthy();
    });

    it('should render Call Bet Types section', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('Call Bet Types')).toBeTruthy();
    });

    it('should render How To Train section', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText('How To Train')).toBeTruthy();
    });

    it('should render bet type descriptions', () => {
      const { getByText } = renderWithTheme(<CallBetsMenuScreen />);
      expect(getByText(/Tier — covers 12 consecutive numbers/)).toBeTruthy();
      expect(getByText(/Orphelins — covers 8 non-adjacent numbers/)).toBeTruthy();
      expect(getByText(/Voisins — covers 17 consecutive numbers/)).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should have accessible Tier button', () => {
      const { getByLabelText } = renderWithTheme(<CallBetsMenuScreen />);
      const tierButton = getByLabelText('Start Tier training');
      expect(tierButton).toBeTruthy();
    });

    it('should have accessible Orphelins button', () => {
      const { getByLabelText } = renderWithTheme(<CallBetsMenuScreen />);
      const orphelinsButton = getByLabelText('Start Orphelins training');
      expect(orphelinsButton).toBeTruthy();
    });

    it('should have accessible Voisins button', () => {
      const { getByLabelText } = renderWithTheme(<CallBetsMenuScreen />);
      const voisinsButton = getByLabelText('Start Voisins training');
      expect(voisinsButton).toBeTruthy();
    });

    it('should have accessible Zero button', () => {
      const { getByLabelText } = renderWithTheme(<CallBetsMenuScreen />);
      const zeroButton = getByLabelText('Start Zero training');
      expect(zeroButton).toBeTruthy();
    });

    it('should have accessible Random Mode button', () => {
      const { getByLabelText } = renderWithTheme(<CallBetsMenuScreen />);
      const randomButton = getByLabelText('Start Random Mode training');
      expect(randomButton).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('all mode buttons should be touchable', () => {
      const { getByLabelText } = renderWithTheme(<CallBetsMenuScreen />);
      const buttons = [
        getByLabelText('Start Tier training'),
        getByLabelText('Start Orphelins training'),
        getByLabelText('Start Voisins training'),
        getByLabelText('Start Zero training'),
        getByLabelText('Start Random Mode training'),
      ];
      buttons.forEach((button) => {
        expect(button).toBeTruthy();
      });
    });
  });
});

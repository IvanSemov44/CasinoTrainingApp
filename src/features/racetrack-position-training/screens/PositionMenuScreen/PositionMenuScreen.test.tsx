import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PositionMenuScreen from './PositionMenuScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PositionMenuScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={{} as any} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders the title', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={{} as any} />);
      expect(getByText('Number → Position')).toBeTruthy();
    });

    it('renders the subtitle', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={{} as any} />);
      expect(getByText('Find the winning number on the racetrack')).toBeTruthy();
    });
  });

  describe('Mode Options', () => {
    it('renders Single Number mode', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={{} as any} />);
      expect(getByText('Single Number')).toBeTruthy();
      expect(getByText('Tap the exact number on the racetrack')).toBeTruthy();
    });

    it('renders Random Training mode', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={{} as any} />);
      expect(getByText('Random Training')).toBeTruthy();
      expect(getByText('Practice finding numbers randomly')).toBeTruthy();
    });
  });

  describe('Wheel Order Reference', () => {
    it('renders Wheel Order Reference section', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={{} as any} />);
      expect(getByText('Wheel Order Reference:')).toBeTruthy();
      expect(getByText('Numbers appear in this order around the wheel')).toBeTruthy();
    });

    it('renders wheel numbers', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={{} as any} />);
      expect(getByText('0')).toBeTruthy();
      expect(getByText('26')).toBeTruthy();
    });
  });

  describe('How to Play', () => {
    it('renders How to Play section', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={{} as any} />);
      expect(getByText('How to Play:')).toBeTruthy();
    });

    it('renders all instruction steps', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={{} as any} />);
      expect(getByText(/A winning number is displayed/)).toBeTruthy();
      expect(getByText(/Tap the exact number location/)).toBeTruthy();
      expect(getByText(/Get feedback and try the next/)).toBeTruthy();
      expect(getByText(/Build your score/)).toBeTruthy();
    });
  });
});

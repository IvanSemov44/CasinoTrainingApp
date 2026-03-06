import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PositionMenuScreen from './PositionMenuScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PositionMenuScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as unknown as React.ComponentProps<typeof PositionMenuScreen>['navigation'];
  const mockRoute = {} as unknown as React.ComponentProps<typeof PositionMenuScreen>['route'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders the title', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Number → Position')).toBeTruthy();
    });

    it('renders the subtitle', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Find the winning number on the racetrack')).toBeTruthy();
    });
  });

  describe('Mode Options', () => {
    it('renders Single Number mode', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Single Number')).toBeTruthy();
      expect(getByText('Tap the exact number on the racetrack')).toBeTruthy();
    });

    it('renders Random Training mode', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Random Training')).toBeTruthy();
      expect(getByText('Practice finding numbers randomly')).toBeTruthy();
    });
  });

  describe('Wheel Order Reference', () => {
    it('renders Wheel Order Reference section', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Wheel Order Reference:')).toBeTruthy();
      expect(getByText('Numbers appear in this order around the wheel')).toBeTruthy();
    });

    it('renders wheel numbers', () => {
      const { getByText, getAllByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('0')).toBeTruthy();
      expect(getAllByText('26').length).toBeGreaterThan(0);
    });
  });

  describe('How to Play', () => {
    it('renders How to Play section', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('How to Play:')).toBeTruthy();
    });

    it('renders all instruction steps', () => {
      const { getByText } = renderWithTheme(<PositionMenuScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText(/A winning number is displayed/)).toBeTruthy();
      expect(getByText(/Tap the exact number location/)).toBeTruthy();
      expect(getByText(/Get feedback and try the next/)).toBeTruthy();
      expect(getByText(/Build your score/)).toBeTruthy();
    });
  });
});

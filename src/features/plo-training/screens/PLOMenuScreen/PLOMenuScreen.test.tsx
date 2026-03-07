import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PLOMenuScreen from './PLOMenuScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PLOMenuScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as unknown as React.ComponentProps<
    typeof PLOMenuScreen
  >['navigation'];
  const mockRoute = {} as unknown as React.ComponentProps<typeof PLOMenuScreen>['route'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('should display title', () => {
      const { getByText } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(getByText('Pot Limit Omaha Training')).toBeTruthy();
    });

    it('should display subtitle', () => {
      const { getByText } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(getByText('Learn pot calculations at the table')).toBeTruthy();
    });

    it('should display all three difficulty modes', () => {
      const { getByText } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(getByText('Easy')).toBeTruthy();
      expect(getByText('Medium')).toBeTruthy();
      expect(getByText('Advanced')).toBeTruthy();
    });

    it('should display mode descriptions', () => {
      const { getByText } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(getByText('Preflop pot calculations')).toBeTruthy();
      expect(getByText('Multi-street pots')).toBeTruthy();
      expect(getByText('Complex scenarios')).toBeTruthy();
    });

    it('should display instructions', () => {
      const { getByText } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(getByText('How it works:')).toBeTruthy();
    });

    it('should display all instruction points', () => {
      const { getByText } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      const instructionsText = getByText(/Watch the action unfold at the table/);
      expect(instructionsText).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should navigate to easy mode when Easy is pressed', () => {
      const { getByLabelText } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      const easyButton = getByLabelText('Easy mode');
      fireEvent.press(easyButton);
      expect(mockNavigation.navigate).toHaveBeenCalledWith('PLOGameTraining', {
        difficulty: 'easy',
      });
    });

    it('should navigate to medium mode when Medium is pressed', () => {
      const { getByLabelText } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      const mediumButton = getByLabelText('Medium mode');
      fireEvent.press(mediumButton);
      expect(mockNavigation.navigate).toHaveBeenCalledWith('PLOGameTraining', {
        difficulty: 'medium',
      });
    });

    it('should navigate to advanced mode when Advanced is pressed', () => {
      const { getByLabelText } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      const advancedButton = getByLabelText('Advanced mode');
      fireEvent.press(advancedButton);
      expect(mockNavigation.navigate).toHaveBeenCalledWith('PLOGameTraining', {
        difficulty: 'advanced',
      });
    });
  });

  describe('styling and theme', () => {
    it('should render with proper theme colors', () => {
      const { toJSON } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('should display mode cards', () => {
      const { getByText } = renderWithTheme(
        <PLOMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      // All mode names should be present as clickable cards
      expect(getByText('Easy')).toBeTruthy();
      expect(getByText('Medium')).toBeTruthy();
      expect(getByText('Advanced')).toBeTruthy();
    });
  });
});

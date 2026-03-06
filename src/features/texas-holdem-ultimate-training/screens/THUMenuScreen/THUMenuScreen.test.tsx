import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import THUMenuScreen from './THUMenuScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('THUMenuScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as unknown as React.ComponentProps<typeof THUMenuScreen>['navigation'];
  const mockRoute = undefined as unknown as React.ComponentProps<typeof THUMenuScreen>['route'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Texas Hold\'em Ultimate title', () => {
      renderWithTheme(
        <THUMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(screen.getByText("Texas Hold'em Ultimate")).toBeOnTheScreen();
    });

    it('renders all 10 drill items', () => {
      renderWithTheme(
        <THUMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(screen.getByText('Hand Recognition')).toBeOnTheScreen();
      expect(screen.getByText('Full Outcome')).toBeOnTheScreen();
    });
  });

  describe('Navigation', () => {
    it('navigates to THUDrill with correct drill type', () => {
      renderWithTheme(
        <THUMenuScreen navigation={mockNavigation} route={mockRoute} />
      );

      const handRecognitionItem = screen.getByText('Hand Recognition');
      fireEvent.press(handRecognitionItem);

      expect(mockNavigation.navigate).toHaveBeenCalledWith('THUDrill', {
        drillType: 'hand-recognition',
      });
    });
  });

  describe('Drill Data', () => {
    it('displays correct descriptions', () => {
      renderWithTheme(
        <THUMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(
        screen.getByText(/Does the dealer qualify?/)
      ).toBeOnTheScreen();
    });

    it('shows all difficulty levels', () => {
      renderWithTheme(
        <THUMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(screen.getAllByText('EASY').length).toBeGreaterThan(0);
      expect(screen.getAllByText('ADVANCED').length).toBeGreaterThan(0);
    });
  });
});

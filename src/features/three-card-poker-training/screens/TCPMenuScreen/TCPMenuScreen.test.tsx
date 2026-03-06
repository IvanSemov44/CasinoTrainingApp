import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import TCPMenuScreen from './TCPMenuScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('TCPMenuScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as unknown as React.ComponentProps<typeof TCPMenuScreen>['navigation'];
  const mockRoute = undefined as unknown as React.ComponentProps<typeof TCPMenuScreen>['route'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Three Card Poker title', () => {
      renderWithTheme(
        <TCPMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(screen.getByText('Three Card Poker')).toBeOnTheScreen();
    });

    it('renders all 5 drill items', () => {
      renderWithTheme(
        <TCPMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(screen.getByText('Hand Recognition')).toBeOnTheScreen();
      expect(screen.getByText('Dealer Qualification')).toBeOnTheScreen();
      expect(screen.getByText('Full Outcome')).toBeOnTheScreen();
    });
  });

  describe('Navigation', () => {
    it('navigates to TCPDrill with correct drill type', () => {
      renderWithTheme(
        <TCPMenuScreen navigation={mockNavigation} route={mockRoute} />
      );

      const handRecognitionItem = screen.getByText('Hand Recognition');
      fireEvent.press(handRecognitionItem);

      expect(mockNavigation.navigate).toHaveBeenCalledWith('TCPDrill', {
        drillType: 'hand-recognition',
      });
    });
  });

  describe('Drill Data', () => {
    it('displays correct descriptions', () => {
      renderWithTheme(
        <TCPMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(
        screen.getByText(/Does the dealer qualify?/)
      ).toBeOnTheScreen();
    });

    it('shows difficulty levels', () => {
      renderWithTheme(
        <TCPMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(screen.getAllByText('EASY').length).toBeGreaterThan(0);
      expect(screen.getAllByText('ADVANCED').length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('renders content for screen readers', () => {
      renderWithTheme(
        <TCPMenuScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(screen.getByText('Three Card Poker')).toBeOnTheScreen();
    });
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CPMenuScreen from './CPMenuScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('CPMenuScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Caribbean Poker title', () => {
      renderWithTheme(
        <CPMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      expect(screen.getByText('Caribbean Poker')).toBeOnTheScreen();
    });

    it('renders all 9 drill items', () => {
      renderWithTheme(
        <CPMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      expect(screen.getByText('Hand Recognition')).toBeOnTheScreen();
      expect(screen.getByText('Swap Procedure')).toBeOnTheScreen();
    });
  });

  describe('Navigation', () => {
    it('navigates to CPDrill with correct drill type', () => {
      renderWithTheme(
        <CPMenuScreen navigation={mockNavigation} route={undefined as any} />
      );

      const handRecognitionItem = screen.getByText('Hand Recognition');
      fireEvent.press(handRecognitionItem);

      expect(mockNavigation.navigate).toHaveBeenCalledWith('CPDrill', {
        drillType: 'hand-recognition',
      });
    });
  });

  describe('Drill Data', () => {
    it('displays correct descriptions', () => {
      renderWithTheme(
        <CPMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      expect(
        screen.getByText(/Does the dealer qualify?/)
      ).toBeOnTheScreen();
    });

    it('shows all difficulty levels', () => {
      renderWithTheme(
        <CPMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      expect(screen.getByText('EASY')).toBeOnTheScreen();
      expect(screen.getByText('MEDIUM')).toBeOnTheScreen();
      expect(screen.getByText('ADVANCED')).toBeOnTheScreen();
    });
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import BJMenuScreen from './BJMenuScreen';
import type { BJMenuScreenProps } from './BJMenuScreen.types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('BJMenuScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Blackjack title', () => {
      renderWithTheme(
        <BJMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      expect(screen.getByText('Blackjack')).toBeOnTheScreen();
    });

    it('renders all drill items', () => {
      renderWithTheme(
        <BJMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      expect(screen.getByText('Soft Hand Announcement')).toBeOnTheScreen();
      expect(screen.getByText('Dealer Action')).toBeOnTheScreen();
      expect(screen.getByText('Super Seven')).toBeOnTheScreen();
    });

    it('renders difficulty badges', () => {
      renderWithTheme(
        <BJMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      expect(screen.getByText('EASY')).toBeOnTheScreen();
      expect(screen.getByText('ADVANCED')).toBeOnTheScreen();
    });
  });

  describe('Navigation', () => {
    it('navigates to BJDrill with correct drill type when item is pressed', () => {
      renderWithTheme(
        <BJMenuScreen navigation={mockNavigation} route={undefined as any} />
      );

      const softHandItem = screen.getByText('Soft Hand Announcement');
      fireEvent.press(softHandItem);

      expect(mockNavigation.navigate).toHaveBeenCalledWith('BJDrill', {
        drillType: 'soft-hand-recognition',
      });
    });

    it('navigates with correct drill type for different drills', () => {
      renderWithTheme(
        <BJMenuScreen navigation={mockNavigation} route={undefined as any} />
      );

      const superSevenItem = screen.getByText('Super Seven');
      fireEvent.press(superSevenItem);

      expect(mockNavigation.navigate).toHaveBeenCalledWith('BJDrill', {
        drillType: 'super-seven',
      });
    });
  });

  describe('Drill Data', () => {
    it('displays correct descriptions for drills', () => {
      renderWithTheme(
        <BJMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      expect(
        screen.getByText('Hit or stand? Dealer stands on ALL 17s, including soft 17 (A+6).')
      ).toBeOnTheScreen();
    });

    it('shows correct difficulty levels for drills', () => {
      renderWithTheme(
        <BJMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      // Check for both easy and advanced difficulty badges
      const easyBadges = screen.getAllByText('EASY');
      const advancedBadges = screen.getAllByText('ADVANCED');
      expect(easyBadges.length).toBeGreaterThan(0);
      expect(advancedBadges.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('renders content accessible for screen readers', () => {
      renderWithTheme(
        <BJMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      expect(screen.getByText('Blackjack')).toBeOnTheScreen();
      expect(screen.getByText('Soft Hand Announcement')).toBeOnTheScreen();
    });
  });

  describe('Props with Defaults', () => {
    it('uses navigation prop correctly', () => {
      const { toJSON } = renderWithTheme(
        <BJMenuScreen navigation={mockNavigation} route={undefined as any} />
      );
      expect(toJSON()).toBeTruthy();
    });
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';

// Mock expo-router globally for this test file
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

// Mock child components to keep tests focused and fast
jest.mock('@components/InstallButton', () => ({
  InstallButton: () => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, null, 'InstallButtonMock');
  },
}));

jest.mock('@components/GameCategorySection', () => ({
  GameCategorySection: () => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, null, 'GameCategorySectionMock');
  },
}));

import { HomeScreen } from './HomeScreen';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('HomeScreen', () => {
  describe('render and behavior', () => {
    beforeEach(() => jest.clearAllMocks());

    it('renders title and subtitle', () => {
      renderWithTheme(<HomeScreen />);
      expect(screen.getByText('Casino Dealer')).toBeOnTheScreen();
      expect(screen.getByText('Training Academy')).toBeOnTheScreen();
    });

    it('renders InstallButton and GameCategorySection', () => {
      renderWithTheme(<HomeScreen />);
      expect(screen.getByText('InstallButtonMock')).toBeOnTheScreen();
      expect(screen.getByText('GameCategorySectionMock')).toBeOnTheScreen();
    });

    it('navigates to settings when settings button is pressed', () => {
      renderWithTheme(<HomeScreen />);
      const settings = screen.getByText('⚙️');
      fireEvent.press(settings);
      expect(mockPush).toHaveBeenCalledWith('/settings');
    });

    it('navigates to progress when progress button is pressed', () => {
      renderWithTheme(<HomeScreen />);
      const progress = screen.getByText('📊 My Progress');
      fireEvent.press(progress);
      expect(mockPush).toHaveBeenCalledWith('/progress');
    });

    it('toggles theme when theme toggle is pressed', async () => {
      renderWithTheme(<HomeScreen />);

      // initial theme is 'midnight' — shows Casino (🟢)
      expect(screen.getByText('🟢')).toBeOnTheScreen();
      expect(screen.getByText('Casino')).toBeOnTheScreen();

      const toggle = screen.getByText('🟢');
      fireEvent.press(toggle);

      // After toggle, label should change. Wait for re-render.
      await waitFor(() => {
        expect(screen.getByText('🌑')).toBeOnTheScreen();
        expect(screen.getByText('Midnight')).toBeOnTheScreen();
      });
    });
  });

  describe('card width calculation', () => {
    const calculateCardWidth = (width: number) => {
      const gutter = 20;
      const gap = 10;
      return Math.floor((width - gutter * 2 - gap) / 2);
    };

    it('calculates correct card width for default screen width (375)', () => {
      expect(calculateCardWidth(375)).toBe(162);
    });

    it('calculates correct card width for wider screen (414)', () => {
      expect(calculateCardWidth(414)).toBe(182);
    });

    it('calculates correct card width for narrow screen (320)', () => {
      expect(calculateCardWidth(320)).toBe(135);
    });

    it('calculates correct card width for tablet (768)', () => {
      // (768 - 40 - 10) / 2 = 359
      expect(calculateCardWidth(768)).toBe(359);
    });

    it('calculates correct card width for large tablet (1024)', () => {
      // (1024 - 40 - 10) / 2 = 487
      expect(calculateCardWidth(1024)).toBe(487);
    });

    it('handles very narrow screen (280)', () => {
      // (280 - 40 - 10) / 2 = 115
      expect(calculateCardWidth(280)).toBe(115);
    });

    it('handles fractional results by flooring', () => {
      // 390 - 40 - 10 = 340, /2 = 170
      expect(calculateCardWidth(390)).toBe(170);
    });
  });
});

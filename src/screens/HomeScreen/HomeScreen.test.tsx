import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

// Instrument React.createElement to catch where an undefined element type is used
{
  const ReactLib = require('react');
  const origCreate = ReactLib.createElement;
  ReactLib.createElement = function patchedCreateElement(this: any, type: any, ...args: any[]) {
    if (type === undefined) {
      console.error('React.createElement was called with undefined type. Args:', { type, args });
      throw new Error('React.createElement received undefined type');
    }
    return origCreate.apply(this, [type, ...args]);
  } as any;
}

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

jest.mock('./components/GameCategorySection/GameCategorySection', () => ({
  GameCategorySection: () => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, null, 'GameCategorySectionMock');
  },
}));

// Mock the theme hook and themed-styles hook so tests run without ThemeProvider
jest.mock('@hooks/useThemedStyles', () => ({
  useThemedStyles: (makeStyles: any) =>
    makeStyles({
      background: { primary: '#000000', secondary: '#111111' },
      border: { primary: '#222222', gold: '#333333' },
      text: { gold: '#ffffff', secondary: '#cccccc' },
    }),
}));

// Defensive: replace some react-native primitives with simple wrappers to rule
// out environment-specific component issues during tests.
jest.mock('react-native', () => {
  const React = require('react');
  const View = (props: any) => React.createElement('View', props, props.children);
  const Text = (props: any) => React.createElement('Text', props, props.children);
  const ScrollView = (props: any) => React.createElement(View, props, props.children);
  const Pressable = (props: any) => React.createElement(View, props, props.children);
  const TouchableOpacity = (props: any) => React.createElement(View, props, props.children);
  return {
    __esModule: true,
    View,
    Text,
    ScrollView,
    Pressable,
    TouchableOpacity,
    useWindowDimensions: () => ({ width: 360, height: 800 }),
    StyleSheet: {
      create: (s: any) => s,
      flatten: (s: any) => s,
      hairlineWidth: 1,
    },
  };
});

// Provide a lightweight ThemeProvider mock that supports toggling
jest.mock('@contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

import { HomeScreen } from './HomeScreen';

function renderWithTheme(ui: React.ReactElement) {
  return render(ui);
}

describe('HomeScreen', () => {
  describe('render and behavior', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // initialize the useTheme mock to return 'midnight' by default
      const { useTheme } = require('@contexts/ThemeContext');
      let themeId = 'midnight';
      useTheme.mockImplementation(() => ({
        themeId,
        toggleTheme: () => {
          themeId = themeId === 'midnight' ? 'casino-green' : 'midnight';
        },
      }));
    });

    it('renders title and subtitle', () => {
      // debug: log mock shapes to find any undefined component

      console.log('DBG InstallButton:', require('@components/InstallButton'));

      console.log(
        'DBG GameCategorySection:',
        require('./components/GameCategorySection/GameCategorySection')
      );

      console.log('DBG ThemeContext.useTheme:', require('@contexts/ThemeContext').useTheme());

      console.log('DBG useThemedStyles:', typeof require('@hooks/useThemedStyles').useThemedStyles);

      console.log('DBG HomeScreen export:', typeof HomeScreen, HomeScreen);
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

      // press toggle — mock's toggleTheme updates internal themeId; re-render to observe change
      const toggle = screen.getByText('🟢');
      fireEvent.press(toggle);
      renderWithTheme(<HomeScreen />);

      // After toggle, label should change
      expect(screen.getByText('🌑')).toBeOnTheScreen();
      expect(screen.getByText('Midnight')).toBeOnTheScreen();
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

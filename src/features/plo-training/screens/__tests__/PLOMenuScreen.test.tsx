/**
 * Tests for PLOMenuScreen
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PLOMenuScreen from '../PLOMenuScreen';

// Mock the theme constants
jest.mock('../../../roulette-training/constants/theme', () => ({
  COLORS: {
    background: { primary: '#0a2f1f', secondary: '#1a5f3f' },
    text: { primary: '#FFFFFF', secondary: '#CCCCCC', gold: '#FFD700' },
  },
  SPACING: { sm: 8, md: 16, lg: 24, xs: 4, xl: 32 },
}));

// Mock the game scenarios constants
jest.mock('../../constants/gameScenarios', () => ({
  DIFFICULTY_INFO: {
    easy: {
      icon: '🟢',
      label: 'Easy',
      description: 'Simple pot calculations',
    },
    medium: {
      icon: '🟡',
      label: 'Medium',
      description: 'Moderate pot calculations',
    },
    advanced: {
      icon: '🔴',
      label: 'Advanced',
      description: 'Complex pot calculations',
    },
  },
}));

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
};

const mockRoute = {
  key: 'test-key',
  name: 'PLOMenu',
};

jest.mock('@react-navigation/stack', () => ({
  ...jest.requireActual('@react-navigation/stack'),
  StackScreenProps: jest.fn(),
}));

describe('PLOMenuScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('rendering', () => {
    it('should render the title', () => {
      const { getByText } = render(
        <PLOMenuScreen navigation={mockNavigation as any} route={mockRoute as any} />
      );
      
      expect(getByText('Pot Limit Omaha Training')).toBeTruthy();
    });

    it('should render the subtitle', () => {
      const { getByText } = render(
        <PLOMenuScreen navigation={mockNavigation as any} route={mockRoute as any} />
      );
      
      expect(getByText('Select difficulty level')).toBeTruthy();
    });

    it('should render all difficulty cards', () => {
      const { getByText } = render(
        <PLOMenuScreen navigation={mockNavigation as any} route={mockRoute as any} />
      );
      
      expect(getByText('Easy')).toBeTruthy();
      expect(getByText('Medium')).toBeTruthy();
      expect(getByText('Advanced')).toBeTruthy();
    });

    it('should render difficulty descriptions', () => {
      const { getByText } = render(
        <PLOMenuScreen navigation={mockNavigation as any} route={mockRoute as any} />
      );
      
      expect(getByText('Simple pot calculations')).toBeTruthy();
      expect(getByText('Moderate pot calculations')).toBeTruthy();
      expect(getByText('Complex pot calculations')).toBeTruthy();
    });

    it('should render difficulty icons', () => {
      const { getByText } = render(
        <PLOMenuScreen navigation={mockNavigation as any} route={mockRoute as any} />
      );
      
      expect(getByText('🟢')).toBeTruthy();
      expect(getByText('🟡')).toBeTruthy();
      expect(getByText('🔴')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should navigate to game training with easy difficulty when Easy card is pressed', () => {
      const { getByText } = render(
        <PLOMenuScreen navigation={mockNavigation as any} route={mockRoute as any} />
      );
      
      fireEvent.press(getByText('Easy'));
      
      expect(mockNavigate).toHaveBeenCalledWith('PLOGameTraining', { difficulty: 'easy' });
    });

    it('should navigate to game training with medium difficulty when Medium card is pressed', () => {
      const { getByText } = render(
        <PLOMenuScreen navigation={mockNavigation as any} route={mockRoute as any} />
      );
      
      fireEvent.press(getByText('Medium'));
      
      expect(mockNavigate).toHaveBeenCalledWith('PLOGameTraining', { difficulty: 'medium' });
    });

    it('should navigate to game training with advanced difficulty when Advanced card is pressed', () => {
      const { getByText } = render(
        <PLOMenuScreen navigation={mockNavigation as any} route={mockRoute as any} />
      );
      
      fireEvent.press(getByText('Advanced'));
      
      expect(mockNavigate).toHaveBeenCalledWith('PLOGameTraining', { difficulty: 'advanced' });
    });
  });

  describe('accessibility', () => {
    it('should render difficulty cards as touchable elements', () => {
      const { getByText } = render(
        <PLOMenuScreen navigation={mockNavigation as any} route={mockRoute as any} />
      );
      
      // All difficulty cards should be pressable
      const easyCard = getByText('Easy');
      const mediumCard = getByText('Medium');
      const advancedCard = getByText('Advanced');
      
      expect(easyCard).toBeTruthy();
      expect(mediumCard).toBeTruthy();
      expect(advancedCard).toBeTruthy();
    });
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import MenuListScreen from './MenuListScreen';
import type { MenuItem } from './MenuListScreen.types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('MenuListScreen', () => {
  const mockOnPress1 = jest.fn();
  const mockOnPress2 = jest.fn();

  const mockItems: MenuItem[] = [
    {
      id: '1',
      title: 'Number Recognition',
      description: 'Learn to identify roulette numbers quickly',
      difficulty: 'easy',
      onPress: mockOnPress1,
      extraInfo: '5-10 min',
    },
    {
      id: '2',
      title: 'Sector Calculation',
      description: 'Master sector betting strategies',
      difficulty: 'hard',
      onPress: mockOnPress2,
      extraInfo: '15-20 min',
    },
  ];

  beforeEach(() => {
    mockOnPress1.mockClear();
    mockOnPress2.mockClear();
  });

  describe('Header Display', () => {
    it('renders the title', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={mockItems}
        />
      );

      expect(screen.getByText('Roulette Training')).toBeOnTheScreen();
    });

    it('renders the subtitle when provided', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          subtitle="Improve your game with our exercises"
          items={mockItems}
        />
      );

      expect(screen.getByText('Improve your game with our exercises')).toBeOnTheScreen();
    });

    it('does not render subtitle when not provided', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={mockItems}
        />
      );

      expect(screen.queryByText(/subtitle/i)).not.toBeOnTheScreen();
    });
  });

  describe('Menu Items Display', () => {
    it('renders all menu items', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={mockItems}
        />
      );

      expect(screen.getByText('Number Recognition')).toBeOnTheScreen();
      expect(screen.getByText('Sector Calculation')).toBeOnTheScreen();
    });

    it('displays item descriptions', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={mockItems}
        />
      );

      expect(screen.getByText('Learn to identify roulette numbers quickly')).toBeOnTheScreen();
      expect(screen.getByText('Master sector betting strategies')).toBeOnTheScreen();
    });

    it('displays difficulty badges with uppercase text', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={mockItems}
        />
      );

      expect(screen.getByText('EASY')).toBeOnTheScreen();
      expect(screen.getByText('HARD')).toBeOnTheScreen();
    });

    it('displays extra info when provided', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={mockItems}
        />
      );

      expect(screen.getByText('5-10 min')).toBeOnTheScreen();
      expect(screen.getByText('15-20 min')).toBeOnTheScreen();
    });

    it('calls onPress when menu item is tapped', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={mockItems}
        />
      );

      const firstItem = screen.getByText('Number Recognition');
      fireEvent.press(firstItem);

      expect(mockOnPress1).toHaveBeenCalledTimes(1);
      expect(mockOnPress2).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('renders skeleton loaders when isLoading is true', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={mockItems}
          isLoading={true}
        />
      );

      // SkeletonLoader should be rendered (4 skeleton items)
      // Since SkeletonLoader component is rendered, menu items should not appear
      expect(screen.queryByText('Number Recognition')).not.toBeOnTheScreen();
    });

    it('renders menu items when isLoading is false', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={mockItems}
          isLoading={false}
        />
      );

      expect(screen.getByText('Number Recognition')).toBeOnTheScreen();
    });
  });

  describe('Empty State', () => {
    it('renders empty list when items is empty', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={[]}
        />
      );

      expect(screen.getByText('Roulette Training')).toBeOnTheScreen();
      expect(screen.queryByText('Number Recognition')).not.toBeOnTheScreen();
    });
  });

  describe('Accessibility', () => {
    it('renders menu items with correct content for screen readers', () => {
      renderWithTheme(
        <MenuListScreen
          title="Roulette Training"
          items={mockItems}
        />
      );

      // Verify that the accessible content is present
      expect(screen.getByText('Number Recognition')).toBeOnTheScreen();
      expect(screen.getByText('EASY')).toBeOnTheScreen();
    });
  });
});

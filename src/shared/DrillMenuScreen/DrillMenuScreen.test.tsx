import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { SettingsProvider } from '@contexts/SettingsContext';
import DrillMenuScreen from './DrillMenuScreen';
import type { DrillMenuItem } from './DrillMenuScreen.types';

describe('DrillMenuScreen', () => {
  const mockOnPress = jest.fn();

  const mockDrills: DrillMenuItem[] = [
    {
      drillType: 'basic-strategy',
      label: 'Basic Strategy',
      description: 'Learn optimal playing decisions',
      difficulty: 'easy',
    },
    {
      drillType: 'card-counting',
      label: 'Card Counting',
      description: 'Practice keeping count',
      difficulty: 'advanced',
    },
    {
      drillType: 'insurance',
      label: 'Insurance Decisions',
      description: 'When to take insurance',
      difficulty: 'medium',
    },
  ];

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>
      <SettingsProvider>{children}</SettingsProvider>
    </ThemeProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with title and drills', () => {
    render(
      <Wrapper>
        <DrillMenuScreen title="Blackjack Training" drills={mockDrills} onPress={mockOnPress} />
      </Wrapper>
    );

    const title = screen.getByText('Blackjack Training');
    expect(title).toBeTruthy();
  });

  it('displays all drill items', () => {
    render(
      <Wrapper>
        <DrillMenuScreen title="Training Menu" drills={mockDrills} onPress={mockOnPress} />
      </Wrapper>
    );

    expect(screen.getByText('Basic Strategy')).toBeTruthy();
    expect(screen.getByText('Card Counting')).toBeTruthy();
    expect(screen.getByText('Insurance Decisions')).toBeTruthy();
  });

  it('displays drill descriptions', () => {
    render(
      <Wrapper>
        <DrillMenuScreen title="Training Menu" drills={mockDrills} onPress={mockOnPress} />
      </Wrapper>
    );

    expect(screen.getByText('Learn optimal playing decisions')).toBeTruthy();
    expect(screen.getByText('Practice keeping count')).toBeTruthy();
    expect(screen.getByText('When to take insurance')).toBeTruthy();
  });

  it('displays difficulty badges', () => {
    render(
      <Wrapper>
        <DrillMenuScreen title="Training Menu" drills={mockDrills} onPress={mockOnPress} />
      </Wrapper>
    );

    expect(screen.getByText('EASY')).toBeTruthy();
    expect(screen.getByText('MEDIUM')).toBeTruthy();
    expect(screen.getByText('ADVANCED')).toBeTruthy();
  });

  it('calls onPress with correct drillType when drill is tapped', () => {
    render(
      <Wrapper>
        <DrillMenuScreen title="Training Menu" drills={mockDrills} onPress={mockOnPress} />
      </Wrapper>
    );

    const basicStrategyCard = screen.getByText('Basic Strategy');
    fireEvent.press(basicStrategyCard);

    expect(mockOnPress).toHaveBeenCalledWith('basic-strategy');
  });

  it('handles multiple drill presses', () => {
    render(
      <Wrapper>
        <DrillMenuScreen title="Training Menu" drills={mockDrills} onPress={mockOnPress} />
      </Wrapper>
    );

    fireEvent.press(screen.getByText('Basic Strategy'));
    fireEvent.press(screen.getByText('Card Counting'));

    expect(mockOnPress).toHaveBeenCalledTimes(2);
    expect(mockOnPress).toHaveBeenNthCalledWith(1, 'basic-strategy');
    expect(mockOnPress).toHaveBeenNthCalledWith(2, 'card-counting');
  });

  it('renders with empty drills array', () => {
    render(
      <Wrapper>
        <DrillMenuScreen title="Empty Menu" drills={[]} onPress={mockOnPress} />
      </Wrapper>
    );

    expect(screen.getByText('Empty Menu')).toBeTruthy();
    expect(screen.getByText('Select a drill type')).toBeTruthy();
  });

  it('renders subtitle', () => {
    render(
      <Wrapper>
        <DrillMenuScreen title="Test Menu" drills={mockDrills} onPress={mockOnPress} />
      </Wrapper>
    );

    expect(screen.getByText('Select a drill type')).toBeTruthy();
  });
});

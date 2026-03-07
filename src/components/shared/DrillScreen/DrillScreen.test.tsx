import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { SettingsProvider } from '@contexts/SettingsContext';
import DrillScreen from './DrillScreen';
import type { BaseDrillScenario } from '@hooks/useDrillState';

// Mock useDrillState hook
jest.mock('@hooks/useDrillState', () => ({
  useDrillState: jest.fn(),
}));

// Mock child components
jest.mock('@components/NumberPad', () => {
  const { Pressable, Text } = require('react-native');

  return function MockNumberPad({ onSubmit }: { onSubmit: (value: string) => void }) {
    return (
      <Pressable testID="number-pad" onPress={() => onSubmit('5')}>
        <Text>NumPad</Text>
      </Pressable>
    );
  };
});

jest.mock('@components/PlayingCard', () => {
  const { View, Text } = require('react-native');

  return function MockPlayingCard({ value, suit }: Record<string, unknown>) {
    return (
      <View testID="card">
        <Text>{`${String(value)}${String(suit)}`}</Text>
      </View>
    );
  };
});

import { useDrillState, type DrillState } from '@hooks/useDrillState';

describe('DrillScreen', () => {
  const mockUseDrillState = useDrillState as jest.MockedFunction<typeof useDrillState>;

  const mockScenario: BaseDrillScenario = {
    answerType: 'multiple-choice',
    options: ['A', 'B', 'C', 'D'],
    correctOption: 'A',
  };

  const mockDrillState: DrillState<BaseDrillScenario> = {
    scenario: mockScenario,
    setScenario: jest.fn(),
    phase: 'asking',
    setPhase: jest.fn(),
    selectedOption: null,
    setSelectedOption: jest.fn(),
    userAmountStr: '',
    setUserAmountStr: jest.fn(),
    isCorrect: false,
    setIsCorrect: jest.fn(),
    streak: 3,
    setStreak: jest.fn(),
    sessionPoints: 150,
    setSessionPoints: jest.fn(),
    sessionCorrect: 10,
    setSessionCorrect: jest.fn(),
    sessionTotal: 20,
    setSessionTotal: jest.fn(),
    accuracy: 75,
    upcomingMultiplier: 8,
    canSubmit: true,
    autoSubmit: false,
    handleSubmit: jest.fn(),
    handleNext: jest.fn(),
    resetSession: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDrillState.mockReturnValue(mockDrillState);
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>
      <SettingsProvider>{children}</SettingsProvider>
    </ThemeProvider>
  );

  it('renders the drill screen with phase asking', () => {
    render(
      <Wrapper>
        <DrillScreen scenarioGenerator={() => mockScenario} drillType="blackjack" />
      </Wrapper>
    );

    expect(screen.getByText('Check Answer')).toBeTruthy();
  });

  it('displays stats', () => {
    render(
      <Wrapper>
        <DrillScreen scenarioGenerator={() => mockScenario} drillType="blackjack" />
      </Wrapper>
    );

    expect(screen.getByText(/150\s*pts/i)).toBeTruthy();
    expect(screen.getByText(/75\s*%/i)).toBeTruthy();
  });

  it('calls handleSubmit when button is pressed', () => {
    render(
      <Wrapper>
        <DrillScreen scenarioGenerator={() => mockScenario} drillType="blackjack" />
      </Wrapper>
    );

    const submitButton = screen.getByText('Check Answer');
    fireEvent.press(submitButton);

    expect(mockDrillState.handleSubmit).toHaveBeenCalled();
  });

  it('renders with feedback phase', () => {
    mockUseDrillState.mockReturnValue({
      ...mockDrillState,
      phase: 'feedback',
    });

    render(
      <Wrapper>
        <DrillScreen scenarioGenerator={() => mockScenario} drillType="blackjack" />
      </Wrapper>
    );

    expect(screen.getByText('Next Question →')).toBeTruthy();
  });
});

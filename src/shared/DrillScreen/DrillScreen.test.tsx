import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react-native';
import { render } from '@test-utils/render';
import DrillScreen from './DrillScreen';
import type { BaseDrillScenario } from '@hooks/useDrillState';

// Mock useDrillState hook
jest.mock('@hooks/useDrillState', () => ({
  useDrillState: jest.fn(),
}));

// Mock child components
jest.mock('@shared/NumberPad', () => {
  const { Pressable, Text } = require('react-native');

  return function MockNumberPad({ onSubmit }: { onSubmit: (value: string) => void }) {
    return (
      <Pressable testID="number-pad" onPress={() => onSubmit('5')}>
        <Text>NumPad</Text>
      </Pressable>
    );
  };
});

jest.mock('@shared/PlayingCard', () => {
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
    question: 'Test question',
    explanation: 'Test explanation',
    options: ['A', 'B', 'C', 'D'],
    correctOption: 'A',
  };

  const mockDrillState: DrillState<BaseDrillScenario> = {
    scenario: mockScenario,
    phase: 'asking',
    selectedOption: null,
    setSelectedOption: jest.fn(),
    userAmountStr: '',
    setUserAmountStr: jest.fn(),
    isCorrect: false,
    streak: 3,
    sessionPoints: 150,
    sessionCorrect: 10,
    sessionTotal: 20,
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

  it('renders the drill screen with phase asking', async () => {
    render(<DrillScreen scenarioGenerator={() => mockScenario} drillType="blackjack" />);

    await waitFor(() => {
      expect(screen.getByText('Check Answer')).toBeTruthy();
    });
  });

  it('displays stats', async () => {
    render(<DrillScreen scenarioGenerator={() => mockScenario} drillType="blackjack" />);

    await waitFor(() => {
      expect(screen.getByText(/150\s*pts/i)).toBeTruthy();
      expect(screen.getByText(/75\s*%/i)).toBeTruthy();
    });
  });

  it('calls handleSubmit when button is pressed', async () => {
    render(<DrillScreen scenarioGenerator={() => mockScenario} drillType="blackjack" />);

    await waitFor(() => {
      expect(screen.getByText('Check Answer')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Check Answer'));

    await waitFor(() => {
      expect(mockDrillState.handleSubmit).toHaveBeenCalled();
    });
  });

  it('renders with feedback phase', async () => {
    mockUseDrillState.mockReturnValue({
      ...mockDrillState,
      phase: 'feedback',
    });

    render(<DrillScreen scenarioGenerator={() => mockScenario} drillType="blackjack" />);

    await waitFor(() => {
      expect(screen.getByText('Next Question →')).toBeTruthy();
    });
  });
});

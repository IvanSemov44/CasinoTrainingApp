import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import DrillResultPhase from './DrillResultPhase';
import type { BaseDrillScenario } from '@hooks/useDrillState';
import type { makeStyles } from './DrillScreen.styles';

const styles = {
  resultCard: {},
  resultCorrect: {},
  resultIncorrect: {},
  resultHeader: {},
  resultIcon: {},
  resultTitle: {},
  pointsEarned: {},
  answerRow: {},
  answerLabel: {},
  answerValue: {},
  correctHL: {},
  explanationBox: {},
  explanationText: {},
  streakNote: {},
  continueBtn: {},
  continueBtnText: {},
} as unknown as ReturnType<typeof makeStyles>;

describe('DrillResultPhase', () => {
  it('shows correct state with points and streak note', () => {
    const scenario = {
      answerType: 'numeric',
      correctAnswer: 42,
    } as unknown as BaseDrillScenario;

    const { getByText } = render(
      <DrillResultPhase
        isCorrect
        lastEarned={3}
        scenario={scenario}
        viewScenario={{ ...scenario, explanation: 'Use table conversion' }}
        userAmountStr="42"
        streak={3}
        upcomingMultiplier={2}
        handleNext={jest.fn()}
        styles={styles}
      />
    );

    expect(getByText('Correct!')).toBeTruthy();
    expect(getByText('+3 pts')).toBeTruthy();
    expect(getByText('Use table conversion')).toBeTruthy();
    expect(getByText('🔥 3 in a row — next answer ×2')).toBeTruthy();
  });

  it('shows incorrect state with correct answer and handles continue', () => {
    const handleNext = jest.fn();
    const scenario = {
      answerType: 'multiple-choice',
      correctOption: 'Split',
    } as unknown as BaseDrillScenario;

    const { getByText } = render(
      <DrillResultPhase
        isCorrect={false}
        lastEarned={0}
        scenario={scenario}
        viewScenario={{ ...scenario, explanation: 'Always split aces' }}
        userAmountStr=""
        streak={0}
        upcomingMultiplier={1}
        handleNext={handleNext}
        styles={styles}
      />
    );

    expect(getByText('Incorrect')).toBeTruthy();
    expect(getByText('Split')).toBeTruthy();
    fireEvent.press(getByText('Next Question →'));
    expect(handleNext).toHaveBeenCalledTimes(1);
  });
});

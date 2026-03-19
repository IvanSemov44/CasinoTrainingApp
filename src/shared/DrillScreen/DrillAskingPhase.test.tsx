import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import DrillAskingPhase from './DrillAskingPhase';
import type { BaseDrillScenario } from '@hooks/useDrillState';
import type { makeStyles } from './DrillScreen.styles';

jest.mock('@components/NumberPad', () => {
  const React = require('react');
  const { View, TouchableOpacity, Text } = require('react-native');

  interface MockNumberPadProps {
    onNumberPress: (value: string) => void;
    onClear: () => void;
    onBackspace: () => void;
  }

  return function MockNumberPad({ onNumberPress, onClear, onBackspace }: MockNumberPadProps) {
    return (
      <View>
        <TouchableOpacity onPress={() => onNumberPress('7')}>
          <Text>Num 7</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBackspace}>
          <Text>Backspace</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClear}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

const styles = {
  twoOptionRow: {},
  twoOptionBtn: {},
  twoOptionText: {},
  optionList: {},
  optionBtn: {},
  optionBtnSelected: {},
  optionText: {},
  optionTextSelected: {},
  submitBtn: {},
  submitBtnDisabled: {},
  submitBtnText: {},
  numericBlock: {},
  amountDisplay: {},
  amountLabel: {},
  amountValue: {},
} as unknown as ReturnType<typeof makeStyles>;

describe('DrillAskingPhase', () => {
  it('supports multi-choice selection and submit', () => {
    const setSelectedOption = jest.fn();
    const handleSubmit = jest.fn();
    const scenario = {
      answerType: 'multiple-choice',
      options: ['A', 'B'],
    } as unknown as BaseDrillScenario;

    const { getByText } = render(
      <DrillAskingPhase
        scenario={scenario}
        autoSubmit={false}
        selectedOption={null}
        setSelectedOption={setSelectedOption}
        handleSubmit={handleSubmit}
        userAmountStr=""
        setUserAmountStr={jest.fn()}
        canSubmit
        styles={styles}
      />
    );

    fireEvent.press(getByText('A'));
    fireEvent.press(getByText('Check Answer'));

    expect(setSelectedOption).toHaveBeenCalledWith('A');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('submits directly in auto-submit mode', () => {
    const setSelectedOption = jest.fn();
    const handleSubmit = jest.fn();
    const scenario = {
      answerType: 'multiple-choice',
      options: ['Yes', 'No'],
    } as unknown as BaseDrillScenario;

    const { getByText } = render(
      <DrillAskingPhase
        scenario={scenario}
        autoSubmit
        selectedOption={null}
        setSelectedOption={setSelectedOption}
        handleSubmit={handleSubmit}
        userAmountStr=""
        setUserAmountStr={jest.fn()}
        canSubmit
        styles={styles}
      />
    );

    fireEvent.press(getByText('Yes'));

    expect(setSelectedOption).toHaveBeenCalledWith('Yes');
    expect(handleSubmit).toHaveBeenCalledWith('Yes');
  });

  it('handles numeric input interactions', () => {
    const handleSubmit = jest.fn();
    const setUserAmountStr = jest.fn();
    const scenario = {
      answerType: 'numeric',
    } as unknown as BaseDrillScenario;

    const { getByText } = render(
      <DrillAskingPhase
        scenario={scenario}
        autoSubmit={false}
        selectedOption={null}
        setSelectedOption={jest.fn()}
        handleSubmit={handleSubmit}
        userAmountStr="12"
        setUserAmountStr={setUserAmountStr}
        canSubmit
        styles={styles}
      />
    );

    fireEvent.press(getByText('Num 7'));
    fireEvent.press(getByText('Backspace'));
    fireEvent.press(getByText('Clear'));
    fireEvent.press(getByText('Check Answer'));

    expect(setUserAmountStr).toHaveBeenCalledTimes(3);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});

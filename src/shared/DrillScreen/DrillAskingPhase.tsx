import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NumberPad from '@shared/NumberPad';
import type { BaseDrillScenario } from '@hooks/useDrillState';
import type { makeStyles } from './DrillScreen.styles';

interface DrillAskingPhaseProps {
  scenario: BaseDrillScenario;
  autoSubmit: boolean;
  selectedOption: string | null;
  setSelectedOption: (opt: string) => void;
  handleSubmit: (directOption?: string) => void;
  userAmountStr: string;
  setUserAmountStr: (updater: string | ((s: string) => string)) => void;
  canSubmit: boolean;
  styles: ReturnType<typeof makeStyles>;
}

export default function DrillAskingPhase({
  scenario,
  autoSubmit,
  selectedOption,
  setSelectedOption,
  handleSubmit,
  userAmountStr,
  setUserAmountStr,
  canSubmit,
  styles,
}: DrillAskingPhaseProps) {
  if (scenario.answerType === 'multiple-choice' && scenario.options) {
    return (
      <>
        {autoSubmit ? (
          <View style={styles.twoOptionRow}>
            {scenario.options.map(opt => (
              <TouchableOpacity
                key={opt}
                style={styles.twoOptionBtn}
                onPress={() => {
                  setSelectedOption(opt);
                  handleSubmit(opt);
                }}
                activeOpacity={0.75}
              >
                <Text style={styles.twoOptionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <>
            <View style={styles.optionList}>
              {scenario.options.map(opt => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optionBtn, selectedOption === opt && styles.optionBtnSelected]}
                  onPress={() => setSelectedOption(opt)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[styles.optionText, selectedOption === opt && styles.optionTextSelected]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
              onPress={() => handleSubmit()}
              disabled={!canSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitBtnText}>Check Answer</Text>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <View style={styles.numericBlock}>
        <View style={styles.amountDisplay}>
          <Text style={styles.amountLabel}>Your answer</Text>
          <Text style={styles.amountValue}>€{userAmountStr || '0'}</Text>
        </View>
        <NumberPad
          onNumberPress={num => setUserAmountStr(s => s + num)}
          onClear={() => setUserAmountStr('')}
          onBackspace={() => setUserAmountStr(s => s.slice(0, -1))}
        />
      </View>
      <TouchableOpacity
        style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
        onPress={() => handleSubmit()}
        disabled={!canSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.submitBtnText}>Check Answer</Text>
      </TouchableOpacity>
    </>
  );
}

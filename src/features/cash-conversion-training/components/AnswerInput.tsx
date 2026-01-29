import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import NumberPad from '../../roulette-training/components/NumberPad';

interface AnswerInputProps {
  totalBet: string;
  change: string;
  onTotalBetChange: (value: string) => void;
  onChangeChange: (value: string) => void;
  sectorName: string;
  activeInput: 'totalBet' | 'change';
  onInputFocus: (input: 'totalBet' | 'change') => void;
}

export default function AnswerInput({
  totalBet,
  change,
  onTotalBetChange,
  onChangeChange,
  sectorName,
  activeInput,
  onInputFocus,
}: AnswerInputProps) {
  const handleNumberPress = (num: string) => {
    if (activeInput === 'totalBet') {
      onTotalBetChange(totalBet + num);
    } else {
      onChangeChange(change + num);
    }
  };

  const handleClear = () => {
    if (activeInput === 'totalBet') {
      onTotalBetChange('');
    } else {
      onChangeChange('');
    }
  };

  const handleBackspace = () => {
    if (activeInput === 'totalBet') {
      onTotalBetChange(totalBet.slice(0, -1));
    } else {
      onChangeChange(change.slice(0, -1));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Response:</Text>
      
      <View style={styles.inputsContainer}>
        <View style={styles.inputGroup} onTouchEnd={() => onInputFocus('totalBet')}>
          <Text style={styles.label}>{sectorName} total:</Text>
          <View style={[styles.display, activeInput === 'totalBet' && styles.displayActive]}>
            <Text style={styles.displayText}>${totalBet || '0'}</Text>
          </View>
        </View>

        <View style={styles.inputGroup} onTouchEnd={() => onInputFocus('change')}>
          <Text style={styles.label}>Rest:</Text>
          <View style={[styles.display, activeInput === 'change' && styles.displayActive]}>
            <Text style={styles.displayText}>${change || '0'}</Text>
          </View>
        </View>
      </View>

      <NumberPad
        onNumberPress={handleNumberPress}
        onClear={handleClear}
        onBackspace={handleBackspace}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  inputsContainer: {
    marginBottom: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  display: {
    backgroundColor: COLORS.background.primary,
    borderWidth: 2,
    borderColor: COLORS.border.gold,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  displayActive: {
    borderColor: COLORS.text.gold,
    backgroundColor: '#1a1a2e',
  },
  displayText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.gold,
    textAlign: 'center',
  },
});

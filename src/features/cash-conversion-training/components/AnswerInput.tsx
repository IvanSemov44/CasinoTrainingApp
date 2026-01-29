import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';

interface AnswerInputProps {
  totalBet: string;
  change: string;
  onTotalBetChange: (value: string) => void;
  onChangeAmountChange: (value: string) => void;
  sectorName: string;
}

export default function AnswerInput({
  totalBet,
  change,
  onTotalBetChange,
  onChangeAmountChange,
  sectorName,
}: AnswerInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Response:</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{sectorName} total: $</Text>
        <TextInput
          style={styles.input}
          value={totalBet}
          onChangeText={onTotalBetChange}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={COLORS.text.secondary}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>and $</Text>
        <TextInput
          style={styles.input}
          value={change}
          onChangeText={onChangeAmountChange}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={COLORS.text.secondary}
        />
        <Text style={styles.label}>rest</Text>
      </View>
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
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginHorizontal: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.background.primary,
    borderWidth: 2,
    borderColor: COLORS.border.gold,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.gold,
    minWidth: 80,
    textAlign: 'center',
  },
});

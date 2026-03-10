import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { NumberInputConfig } from './BaseTrainingModal.types';
import { makeStyles } from './BaseTrainingModal.styles';

interface BaseTrainingModalNumberInputProps {
  numberInput: NumberInputConfig;
}

export default function BaseTrainingModalNumberInput({
  numberInput,
}: BaseTrainingModalNumberInputProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const selectedPreset = parseInt(numberInput.value, 10);

  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>{numberInput.number}</Text>
        </View>
        <Text style={styles.stepTitle}>{numberInput.title}</Text>
      </View>
      <View style={styles.numberInputContainer}>
        <TouchableOpacity
          style={[styles.dropdownTrigger, styles.numberInputTrigger]}
          onPress={numberInput.onToggleDropdown}
        >
          <Text style={styles.dropdownTriggerText}>
            {numberInput.value} {numberInput.presetLabel}
          </Text>
          <Text style={styles.dropdownArrow}>{numberInput.showDropdown ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        <View style={styles.customInputContainer}>
          <Text style={styles.customInputLabel}>Or enter custom:</Text>
          <TextInput
            style={styles.customInput}
            value={numberInput.value}
            onChangeText={numberInput.onChange}
            keyboardType="numeric"
            placeholder={numberInput.presets[0].toString()}
            placeholderTextColor={colors.text.placeholder}
            maxLength={3}
          />
        </View>
      </View>
      {numberInput.showDropdown && (
        <View style={styles.dropdownList}>
          {numberInput.presets.map(preset => {
            const isSelected = selectedPreset === preset;
            return (
              <TouchableOpacity
                key={preset}
                style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
                onPress={() => numberInput.onChange(preset.toString())}
              >
                <Text
                  style={[styles.dropdownItemText, isSelected && styles.dropdownItemTextSelected]}
                >
                  {preset} {numberInput.presetLabel}
                </Text>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

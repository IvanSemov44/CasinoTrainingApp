import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CHIP_VALUES } from '../constants/roulette.constants';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../features/roulette-training/constants/theme';

interface ChipSelectorProps {
  selectedValue: number;
  onSelectChip: (value: number) => void;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({ selectedValue, onSelectChip }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Chip Value</Text>
      <View style={styles.chipsContainer}>
        {CHIP_VALUES.map((chip) => {
          const isSelected = selectedValue === chip.value;
          return (
            <TouchableOpacity
              key={chip.value}
              style={[
                styles.chip,
                { backgroundColor: chip.color },
                isSelected && styles.selectedChip,
              ]}
              onPress={() => onSelectChip(chip.value)}
              accessibilityLabel={`Select $${chip.value} chip${isSelected ? ', selected' : ''}`}
              accessibilityHint="Double tap to select this chip value"
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text style={[
                styles.chipText,
                chip.color === '#FFFFFF' && styles.darkText,
              ]}>
                {chip.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.sm,
    borderRadius: BORDERS.radius.md,
    marginTop: SPACING.sm,
  },
  title: {
    color: COLORS.text.gold,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  chip: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.border.gold,
    margin: SPACING.xs,
  },
  selectedChip: {
    borderWidth: 4,
    borderColor: '#FFFF00',
    transform: [{ scale: 1.1 }],
  },
  chipText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: 'bold',
  },
  darkText: {
    color: COLORS.background.dark,
  },
});

export default ChipSelector;

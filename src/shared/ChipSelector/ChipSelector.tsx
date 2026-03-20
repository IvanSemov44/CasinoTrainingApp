import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CHIP_VALUES } from '@constants/roulette.constants';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

interface ChipSelectorProps {
  selectedValue: number;
  onSelectChip: (value: number) => void;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({ selectedValue, onSelectChip }) => {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Chip Value</Text>
      <View style={styles.chipsContainer}>
        {CHIP_VALUES.map((chip: { value: number; color: string }) => {
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
              <Text style={[styles.chipText, chip.color === '#FFFFFF' && styles.darkText]}>
                {chip.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      padding: 8,
      borderRadius: 10,
      marginTop: 8,
    },
    title: {
      color: colors.text.gold,
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
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
      borderColor: colors.border.gold,
      margin: 4,
    },
    selectedChip: {
      borderWidth: 4,
      borderColor: colors.text.gold,
      transform: [{ scale: 1.1 }],
    },
    chipText: {
      color: colors.text.primary,
      fontSize: 14,
      fontWeight: 'bold',
    },
    darkText: {
      color: colors.background.dark,
    },
  });
}

export default ChipSelector;

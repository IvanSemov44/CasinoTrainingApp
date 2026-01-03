import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CHIP_VALUES } from '../constants/roulette.constants';

interface ChipSelectorProps {
  selectedValue: number;
  onSelectChip: (value: number) => void;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({ selectedValue, onSelectChip }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Chip Value</Text>
      <View style={styles.chipsContainer}>
        {CHIP_VALUES.map((chip) => (
          <TouchableOpacity
            key={chip.value}
            style={[
              styles.chip,
              { backgroundColor: chip.color },
              selectedValue === chip.value && styles.selectedChip,
            ]}
            onPress={() => onSelectChip(chip.value)}
          >
            <Text style={[
              styles.chipText,
              chip.color === '#FFFFFF' && styles.darkText,
            ]}>
              {chip.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a5f3f',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
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
    borderColor: '#FFD700',
    margin: 5,
  },
  selectedChip: {
    borderWidth: 4,
    borderColor: '#FFFF00',
    transform: [{ scale: 1.1 }],
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#000000',
  },
});

export default ChipSelector;

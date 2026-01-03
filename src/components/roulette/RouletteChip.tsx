import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RouletteChipProps {
  amount: number;
  size: number;
  isAbsolute?: boolean;
}

const RouletteChip: React.FC<RouletteChipProps> = ({ amount, size, isAbsolute = true }) => {
  if (amount === 0) return null;

  const styles = getStyles(size);
  
  return (
    <View style={isAbsolute ? styles.chip : styles.chipRelative}>
      <Text style={styles.chipText}>{amount}</Text>
    </View>
  );
};

const getStyles = (chipSize: number) => StyleSheet.create({
  chip: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    borderRadius: 100,
    width: chipSize,
    height: chipSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipRelative: {
    backgroundColor: '#FFD700',
    borderRadius: 100,
    width: chipSize,
    height: chipSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    color: '#000000',
    fontSize: chipSize * 0.5,
    fontWeight: 'bold',
  },
});

export default RouletteChip;

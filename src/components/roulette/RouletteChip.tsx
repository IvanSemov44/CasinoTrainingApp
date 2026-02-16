import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RouletteChipProps {
  amount: number;
  size: number;
}

const RouletteChip: React.FC<RouletteChipProps> = ({ amount, size }) => {
  if (amount === 0) return null;

  const styles = getStyles(size);
  
  // Use absolute positioning to center chip and allow it to overflow parent
  return (
    <View style={styles.chip}>
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
    zIndex: 999,
    elevation: 999,
    left: '50%',
    top: '50%',
    marginLeft: -chipSize / 2,
    marginTop: -chipSize / 2,
  },
  chipText: {
    color: '#000000',
    fontSize: chipSize * 0.5,
    fontWeight: 'bold',
  },
});

export default RouletteChip;

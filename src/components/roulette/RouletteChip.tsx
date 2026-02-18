import React, { useMemo } from 'react';
import { View, Text, TextStyle, ViewStyle } from 'react-native';

interface RouletteChipProps {
  amount: number;
  size: number;
}

// Base styles that don't change
const baseChipStyle: ViewStyle = {
  position: 'absolute',
  backgroundColor: '#FFD700',
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
  elevation: 999,
  left: '50%',
  top: '50%',
};

const baseChipTextStyle: TextStyle = {
  color: '#000000',
  fontWeight: 'bold',
};

/**
 * RouletteChip component for displaying bet amounts on the roulette layout
 * 
 * @param amount - The chip amount to display (0 renders nothing)
 * @param size - The diameter of the chip in pixels
 */
const RouletteChip: React.FC<RouletteChipProps> = ({ amount, size }) => {
  // Memoize styles to prevent recreation on every render
  const chipStyle = useMemo<ViewStyle>(() => ({
    ...baseChipStyle,
    width: size,
    height: size,
    marginLeft: -size / 2,
    marginTop: -size / 2,
  }), [size]);

  const textStyle = useMemo<TextStyle>(() => ({
    ...baseChipTextStyle,
    fontSize: size * 0.5,
  }), [size]);

  if (amount === 0) return null;
  
  return (
    <View 
      style={chipStyle}
      accessibilityLabel={`$${amount} chip`}
      accessibilityRole="image"
    >
      <Text style={textStyle}>{amount}</Text>
    </View>
  );
};

export default React.memo(RouletteChip);

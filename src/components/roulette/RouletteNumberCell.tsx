import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { RouletteNumber, BetType } from '../../types/roulette.types';
import { getNumberColor } from '../../constants/roulette.constants';
import RouletteChip from './RouletteChip';
import { getRouletteStyles } from './styles/roulette.styles';

interface RouletteNumberCellProps {
  number: RouletteNumber;
  cellSize: number;
  betAmount: number;
  onNumberPress: (number: RouletteNumber) => void;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
}

/**
 * Individual number cell on the roulette layout
 * Memoized to prevent unnecessary re-renders when parent updates
 */
const RouletteNumberCell: React.FC<RouletteNumberCellProps> = React.memo(({
  number,
  cellSize,
  betAmount,
  onNumberPress,
  onBetAreaPress,
}) => {
  const color = getNumberColor(number);
  const styles = getRouletteStyles(cellSize);
  const chipSize = cellSize * 0.4;

  // Memoize the press handler
  const handlePress = useCallback(() => {
    onNumberPress(number);
    onBetAreaPress?.(BetType.STRAIGHT, [number]);
  }, [number, onNumberPress, onBetAreaPress]);

  // Memoize style arrays
  const cellStyle = useMemo(() => [
    styles.numberCell,
    color === 'green' && styles.greenCell,
  ], [styles.numberCell, styles.greenCell, color]);

  const textStyle = useMemo(() => [
    styles.numberText,
    color === 'red' && styles.redText,
    color === 'green' && styles.whiteText,
  ], [styles.numberText, styles.redText, styles.whiteText, color]);

  const accessibilityLabel = useMemo(() => {
    const colorName = color === 'red' ? 'red' : color === 'black' ? 'black' : 'green';
    const betInfo = betAmount > 0 ? `, $${betAmount} bet placed` : '';
    return `Number ${number}, ${colorName}${betInfo}`;
  }, [number, color, betAmount]);

  return (
    <TouchableOpacity 
      style={cellStyle} 
      onPress={handlePress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Double tap to place a bet on this number"
      accessibilityRole="button"
    >
      <Text style={textStyle}>{number}</Text>
      <RouletteChip amount={betAmount} size={chipSize} />
    </TouchableOpacity>
  );
});

RouletteNumberCell.displayName = 'RouletteNumberCell';

export default RouletteNumberCell;

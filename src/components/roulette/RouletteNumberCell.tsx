import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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

const RouletteNumberCell: React.FC<RouletteNumberCellProps> = ({
  number,
  cellSize,
  betAmount,
  onNumberPress,
  onBetAreaPress,
}) => {
  const color = getNumberColor(number);
  const styles = getRouletteStyles(cellSize);
  const chipSize = cellSize * 0.4;

  return (
    <TouchableOpacity
      style={[
        styles.numberCell,
        color === 'green' && styles.greenCell,
      ]}
      onPress={() => {
        onNumberPress(number);
        if (onBetAreaPress) {
          onBetAreaPress(BetType.STRAIGHT, [number]);
        }
      }}
    >
      <Text style={[
        styles.numberText,
        color === 'red' && styles.redText,
        color === 'green' && styles.whiteText,
      ]}>
        {number}
      </Text>
      <RouletteChip amount={betAmount} size={chipSize} isAbsolute />
    </TouchableOpacity>
  );
};

export default RouletteNumberCell;

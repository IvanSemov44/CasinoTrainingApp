import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RouletteNumber, BetType } from '../../types/roulette.types';
import RouletteChip from './RouletteChip';
import { getZeroColumnStyles, getRouletteStyles } from './styles/roulette.styles';

interface RouletteZeroColumnProps {
  cellSize: number;
  getBetAmount: (numbers: RouletteNumber[]) => number;
  onNumberPress: (number: RouletteNumber) => void;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
}

const RouletteZeroColumn: React.FC<RouletteZeroColumnProps> = ({
  cellSize,
  getBetAmount,
  onNumberPress,
  onBetAreaPress,
}) => {
  const styles = { ...getZeroColumnStyles(cellSize), ...getRouletteStyles(cellSize) };
  const chipSize = cellSize * 0.4;

  return (
    <View style={styles.zeroColumn}>
      {/* Zero cell */}
      <TouchableOpacity
        style={[styles.zeroCell, styles.greenCell]}
        onPress={() => {
          onNumberPress(0);
          if (onBetAreaPress) {
            onBetAreaPress(BetType.STRAIGHT, [0]);
          }
        }}
      >
        <Text style={styles.numberText}>0</Text>
        <RouletteChip amount={getBetAmount([0])} size={chipSize} />
      </TouchableOpacity>
    </View>
  );
};

export default RouletteZeroColumn;

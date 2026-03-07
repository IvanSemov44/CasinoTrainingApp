import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RouletteNumber, BetType } from '../../types/roulette.types';
import RouletteChip from './RouletteChip';
import { getZeroColumnStyles, getRouletteStyles } from './styles/roulette.styles';
import {
  getCallBetsZeroColumnStyles,
  getCallBetsRouletteStyles,
} from './styles/callBetsRouletteStyles';

interface RouletteZeroColumnProps {
  cellSize: number;
  getBetAmount: (numbers: RouletteNumber[]) => number;
  onNumberPress: (number: RouletteNumber) => void;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
  useCallBetsStyles?: boolean;
}

const RouletteZeroColumn: React.FC<RouletteZeroColumnProps> = ({
  cellSize,
  getBetAmount,
  onNumberPress,
  onBetAreaPress,
  useCallBetsStyles = false,
}) => {
  const getZeroFunc = useCallBetsStyles ? getCallBetsZeroColumnStyles : getZeroColumnStyles;
  const getRouletteFunc = useCallBetsStyles ? getCallBetsRouletteStyles : getRouletteStyles;
  const styles = { ...getZeroFunc(cellSize), ...getRouletteFunc(cellSize) };
  const chipSize = cellSize * 0.4;
  const betAmount = getBetAmount([0]);

  return (
    <View style={styles.zeroColumn}>
      {/* Zero cell */}
      <TouchableOpacity
        style={[styles.zeroCell, styles.greenCell]}
        accessibilityLabel="Zero, number 0"
        accessibilityRole="button"
        accessibilityState={betAmount > 0 ? { selected: true } : undefined}
        onPress={() => {
          onNumberPress(0);
          if (onBetAreaPress) {
            onBetAreaPress(BetType.STRAIGHT, [0]);
          }
        }}
      >
        <Text style={styles.numberText}>0</Text>
        <RouletteChip amount={betAmount} size={chipSize} />
      </TouchableOpacity>
    </View>
  );
};

export default RouletteZeroColumn;

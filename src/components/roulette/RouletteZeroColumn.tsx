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
        <RouletteChip amount={getBetAmount([0])} size={chipSize} isAbsolute />
      </TouchableOpacity>
      
      {/* Split with 3 (top row, first number) */}
      <TouchableOpacity
        style={[styles.zeroSplit, styles.zeroSplitTop]}
        onPress={() => {
          if (onBetAreaPress) {
            onBetAreaPress(BetType.SPLIT, [0, 3]);
          }
        }}
      >
        <RouletteChip amount={getBetAmount([0, 3])} size={chipSize} isAbsolute />
      </TouchableOpacity>
      
      {/* Split with 2 (middle row, first number) */}
      <TouchableOpacity
        style={[styles.zeroSplit, styles.zeroSplitMiddle]}
        onPress={() => {
          if (onBetAreaPress) {
            onBetAreaPress(BetType.SPLIT, [0, 2]);
          }
        }}
      >
        <RouletteChip amount={getBetAmount([0, 2])} size={chipSize} isAbsolute />
      </TouchableOpacity>
      
      {/* Split with 1 (bottom row, first number) */}
      <TouchableOpacity
        style={[styles.zeroSplit, styles.zeroSplitBottom]}
        onPress={() => {
          if (onBetAreaPress) {
            onBetAreaPress(BetType.SPLIT, [0, 1]);
          }
        }}
      >
        <RouletteChip amount={getBetAmount([0, 1])} size={chipSize} isAbsolute />
      </TouchableOpacity>
      
      {/* First corner: 0, 1, 2, 3 */}
      <TouchableOpacity
        style={styles.firstCorner}
        onPress={() => {
          if (onBetAreaPress) {
            onBetAreaPress(BetType.CORNER, [0, 1, 2, 3]);
          }
        }}
      >
        <RouletteChip amount={getBetAmount([0, 1, 2, 3])} size={chipSize} isAbsolute />
      </TouchableOpacity>
      
      {/* Street bet for 0, 1, 2 */}
      <TouchableOpacity
        style={styles.zeroStreetBet}
        onPress={() => {
          if (onBetAreaPress) {
            onBetAreaPress(BetType.STREET, [0, 1, 2]);
          }
        }}
      >
        <RouletteChip amount={getBetAmount([0, 1, 2])} size={chipSize} isAbsolute />
      </TouchableOpacity>
      
      {/* Street bet for 0, 2, 3 */}
      <TouchableOpacity
        style={styles.zeroStreetBet2}
        onPress={() => {
          if (onBetAreaPress) {
            onBetAreaPress(BetType.STREET, [0, 2, 3]);
          }
        }}
      >
        <RouletteChip amount={getBetAmount([0, 2, 3])} size={chipSize} isAbsolute />
      </TouchableOpacity>
    </View>
  );
};

export default RouletteZeroColumn;

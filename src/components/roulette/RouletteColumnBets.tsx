import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RouletteNumber, BetType } from '../../types/roulette.types';
import { LAYOUT_GRID } from '../../constants/roulette.constants';
import RouletteChip from './RouletteChip';
import { getColumnBetsStyles } from './styles/roulette.styles';

interface RouletteColumnBetsProps {
  cellSize: number;
  getBetAmount: (numbers: RouletteNumber[]) => number;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
}

const RouletteColumnBets: React.FC<RouletteColumnBetsProps> = ({
  cellSize,
  getBetAmount,
  onBetAreaPress,
}) => {
  const styles = getColumnBetsStyles(cellSize);
  const chipSize = cellSize * 0.4;

  return (
    <View style={styles.columnBetsContainer}>
      <TouchableOpacity 
        style={styles.columnBet}
        onPress={() => {
          if (onBetAreaPress) {
            onBetAreaPress(BetType.COLUMN, LAYOUT_GRID[0]);
          }
        }}
      >
        <Text style={styles.columnBetText}>2 to 1</Text>
        <RouletteChip amount={getBetAmount(LAYOUT_GRID[0])} size={chipSize} isAbsolute />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.columnBet}
        onPress={() => {
          if (onBetAreaPress) {
            onBetAreaPress(BetType.COLUMN, LAYOUT_GRID[1]);
          }
        }}
      >
        <Text style={styles.columnBetText}>2 to 1</Text>
        <RouletteChip amount={getBetAmount(LAYOUT_GRID[1])} size={chipSize} isAbsolute />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.columnBet}
        onPress={() => {
          if (onBetAreaPress) {
            onBetAreaPress(BetType.COLUMN, LAYOUT_GRID[2]);
          }
        }}
      >
        <Text style={styles.columnBetText}>2 to 1</Text>
        <RouletteChip amount={getBetAmount(LAYOUT_GRID[2])} size={chipSize} isAbsolute />
      </TouchableOpacity>
    </View>
  );
};

export default RouletteColumnBets;

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

const COLUMN_LABELS = ['Column 1', 'Column 2', 'Column 3'];

const RouletteColumnBets: React.FC<RouletteColumnBetsProps> = ({
  cellSize,
  getBetAmount,
  onBetAreaPress,
}) => {
  const styles = getColumnBetsStyles(cellSize);
  const chipSize = cellSize * 0.4;

  return (
    <View style={styles.columnBetsContainer}>
      {[0, 1, 2].map((columnIndex) => {
        const betAmount = getBetAmount(LAYOUT_GRID[columnIndex]);
        return (
          <TouchableOpacity 
            key={columnIndex}
            style={styles.columnBet}
            accessibilityLabel={`${COLUMN_LABELS[columnIndex]} bet, 2 to 1`}
            accessibilityRole="button"
            accessibilityState={betAmount > 0 ? { selected: true } : undefined}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.COLUMN, LAYOUT_GRID[columnIndex]);
              }
            }}
          >
            <Text style={styles.columnBetText}>2 to 1</Text>
            <RouletteChip amount={betAmount} size={chipSize} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RouletteColumnBets;

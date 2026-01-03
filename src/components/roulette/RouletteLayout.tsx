import React from 'react';
import { View, Dimensions } from 'react-native';
import { RouletteNumber, PlacedBet, BetType } from '../../types/roulette.types';
import { useRouletteBets } from './hooks/useRouletteBets';
import RouletteOutsideBets from './RouletteOutsideBets';
import RouletteZeroColumn from './RouletteZeroColumn';
import RouletteNumberGrid from './RouletteNumberGrid';
import RouletteColumnBets from './RouletteColumnBets';
import { getRouletteStyles } from './styles/roulette.styles';

interface RouletteLayoutProps {
  onNumberPress: (number: RouletteNumber) => void;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
  placedBets?: PlacedBet[];
  selectedChipValue?: number;
  cellSize?: number;
}

const RouletteLayout: React.FC<RouletteLayoutProps> = ({ 
  onNumberPress, 
  onBetAreaPress,
  placedBets = [],
  selectedChipValue = 5,
  cellSize
}) => {
  const { width } = Dimensions.get('window');
  const defaultCellSize = (width - 100) / 12;
  const numCellSize = cellSize || defaultCellSize;
  
  const { getBetAmount } = useRouletteBets(placedBets);
  const styles = getRouletteStyles(numCellSize);

  return (
    <View style={styles.container}>
      {/* Outside bets section */}
      <RouletteOutsideBets
        cellSize={numCellSize}
        getBetAmount={getBetAmount}
        onBetAreaPress={onBetAreaPress}
      />

      {/* Main layout with zero, grid, and columns */}
      <View style={styles.mainLayout}>
        <RouletteZeroColumn
          cellSize={numCellSize}
          getBetAmount={getBetAmount}
          onNumberPress={onNumberPress}
          onBetAreaPress={onBetAreaPress}
        />

        <RouletteNumberGrid
          cellSize={numCellSize}
          getBetAmount={getBetAmount}
          onNumberPress={onNumberPress}
          onBetAreaPress={onBetAreaPress}
        />

        <RouletteColumnBets
          cellSize={numCellSize}
          getBetAmount={getBetAmount}
          onBetAreaPress={onBetAreaPress}
        />
      </View>
    </View>
  );
};

export default RouletteLayout;

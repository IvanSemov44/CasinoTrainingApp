import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { RouletteNumber, PlacedBet, BetType } from '../../types/roulette.types';
import { useRouletteBets } from './hooks/useRouletteBets';
import RouletteOutsideBets from './RouletteOutsideBets';
import RouletteZeroColumn from './RouletteZeroColumn';
import RouletteNumberGrid from './RouletteNumberGrid';
import RouletteColumnBets from './RouletteColumnBets';
import RouletteChip from './RouletteChip';
import { getRouletteStyles, getZeroColumnStyles } from './styles/roulette.styles';

interface RouletteLayoutProps {
  onNumberPress: (number: RouletteNumber) => void;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
  placedBets?: PlacedBet[];
  selectedChipValue?: number;
  cellSize?: number;
  showOutsideBets?: boolean;
  showColumnBets?: boolean;
  maxColumns?: number;
}

const RouletteLayout: React.FC<RouletteLayoutProps> = ({ 
  onNumberPress, 
  onBetAreaPress,
  placedBets = [],
  selectedChipValue: _selectedChipValue = 5,
  cellSize,
  showOutsideBets = true,
  showColumnBets = true,
  maxColumns,
}) => {
  const { width } = Dimensions.get('window');
  const defaultCellSize = (width - 100) / 12;
  const numCellSize = cellSize || defaultCellSize;
  
  const { getBetAmount } = useRouletteBets(placedBets);
  const styles = getRouletteStyles(numCellSize);
  const zeroStyles = getZeroColumnStyles(numCellSize);
  const chipSize = numCellSize * 0.4;

  // Zero column bet areas that need to overlay the number grid
  const zeroBetAreas: React.ReactElement[] = [];
  
  // Split with 3 (top row, first number)
  zeroBetAreas.push(
    <TouchableOpacity
      key="zero-split-3"
      style={[zeroStyles.zeroSplit, zeroStyles.zeroSplitTop]}
      onPress={() => onBetAreaPress?.(BetType.SPLIT, [0, 3])}
    >
      <RouletteChip amount={getBetAmount([0, 3])} size={chipSize} />
    </TouchableOpacity>
  );
  
  // Split with 2 (middle row, first number)
  zeroBetAreas.push(
    <TouchableOpacity
      key="zero-split-2"
      style={[zeroStyles.zeroSplit, zeroStyles.zeroSplitMiddle]}
      onPress={() => onBetAreaPress?.(BetType.SPLIT, [0, 2])}
    >
      <RouletteChip amount={getBetAmount([0, 2])} size={chipSize} />
    </TouchableOpacity>
  );
  
  // Split with 1 (bottom row, first number)
  zeroBetAreas.push(
    <TouchableOpacity
      key="zero-split-1"
      style={[zeroStyles.zeroSplit, zeroStyles.zeroSplitBottom]}
      onPress={() => onBetAreaPress?.(BetType.SPLIT, [0, 1])}
    >
      <RouletteChip amount={getBetAmount([0, 1])} size={chipSize} />
    </TouchableOpacity>
  );
  
  // First corner: 0, 1, 2, 3
  zeroBetAreas.push(
    <TouchableOpacity
      key="zero-corner"
      style={zeroStyles.firstCorner}
      onPress={() => onBetAreaPress?.(BetType.CORNER, [0, 1, 2, 3])}
    >
      <RouletteChip amount={getBetAmount([0, 1, 2, 3])} size={chipSize} />
    </TouchableOpacity>
  );
  
  // Street bet for 0, 1, 2
  zeroBetAreas.push(
    <TouchableOpacity
      key="zero-street-1"
      style={zeroStyles.zeroStreetBet}
      onPress={() => onBetAreaPress?.(BetType.STREET, [0, 1, 2])}
    >
      <RouletteChip amount={getBetAmount([0, 1, 2])} size={chipSize} />
    </TouchableOpacity>
  );
  
  // Street bet for 0, 2, 3
  zeroBetAreas.push(
    <TouchableOpacity
      key="zero-street-2"
      style={zeroStyles.zeroStreetBet2}
      onPress={() => onBetAreaPress?.(BetType.STREET, [0, 2, 3])}
    >
      <RouletteChip amount={getBetAmount([0, 2, 3])} size={chipSize} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Outside bets section */}
      {showOutsideBets && (
        <RouletteOutsideBets
          cellSize={numCellSize}
          getBetAmount={getBetAmount}
          onBetAreaPress={onBetAreaPress}
        />
      )}

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
          maxColumns={maxColumns}
        />

        {showColumnBets && (
          <RouletteColumnBets
            cellSize={numCellSize}
            getBetAmount={getBetAmount}
            onBetAreaPress={onBetAreaPress}
          />
        )}
        
        {/* Zero column bet areas overlay - rendered on top of everything */}
        <View style={styles.betAreasLayer} pointerEvents="box-none">
          {zeroBetAreas}
        </View>
      </View>
    </View>
  );
};

export default RouletteLayout;

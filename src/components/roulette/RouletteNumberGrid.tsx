import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RouletteNumber, BetType } from '../../types/roulette.types';
import { LAYOUT_GRID } from '../../constants/roulette.constants';
import RouletteNumberCell from './RouletteNumberCell';
import RouletteChip from './RouletteChip';
import { getRouletteStyles } from './styles/roulette.styles';

interface RouletteNumberGridProps {
  cellSize: number;
  getBetAmount: (numbers: RouletteNumber[]) => number;
  onNumberPress: (number: RouletteNumber) => void;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
  maxColumns?: number;
}

const RouletteNumberGrid: React.FC<RouletteNumberGridProps> = ({
  cellSize,
  getBetAmount,
  onNumberPress,
  onBetAreaPress,
  maxColumns,
}) => {
  const styles = getRouletteStyles(cellSize);
  const chipSize = cellSize * 0.4;

  // Collect all bet areas for rendering in a separate layer
  const betAreas: React.ReactElement[] = [];
  
  LAYOUT_GRID.forEach((row, rowIndex) => {
    row.slice(0, maxColumns).forEach((num, colIndex) => {
      // Street bet
      if (rowIndex === 0) {
        const streetNumbers = [
          LAYOUT_GRID[0][colIndex],
          LAYOUT_GRID[1][colIndex],
          LAYOUT_GRID[2][colIndex]
        ] as RouletteNumber[];
        
        betAreas.push(
          <TouchableOpacity
            key={`street-${colIndex}`}
            style={[styles.streetBet, { left: colIndex * cellSize }]}
            onPress={() => onBetAreaPress?.(BetType.STREET, streetNumbers)}
          >
            <RouletteChip amount={getBetAmount(streetNumbers)} size={chipSize} />
          </TouchableOpacity>
        );
        
        // Six line bet
        if (colIndex < row.length - 1) {
          const sixLineNumbers = [
            LAYOUT_GRID[0][colIndex],
            LAYOUT_GRID[1][colIndex],
            LAYOUT_GRID[2][colIndex],
            LAYOUT_GRID[0][colIndex + 1],
            LAYOUT_GRID[1][colIndex + 1],
            LAYOUT_GRID[2][colIndex + 1]
          ] as RouletteNumber[];
          
          betAreas.push(
            <TouchableOpacity
              key={`sixline-${colIndex}`}
              style={[styles.sixLineBet, { left: colIndex * cellSize }]}
              onPress={() => onBetAreaPress?.(BetType.LINE, sixLineNumbers)}
            >
              <RouletteChip amount={getBetAmount(sixLineNumbers)} size={chipSize} />
            </TouchableOpacity>
          );
        }
      }
      
      // Horizontal split
      if (colIndex < row.length - 1) {
        betAreas.push(
          <TouchableOpacity
            key={`hsplit-${rowIndex}-${colIndex}`}
            style={[styles.horizontalSplit, { 
              left: colIndex * cellSize,
              top: rowIndex * cellSize 
            }]}
            onPress={() => onBetAreaPress?.(BetType.SPLIT, [num, row[colIndex + 1]])}
          >
            <RouletteChip amount={getBetAmount([num, row[colIndex + 1]])} size={chipSize} />
          </TouchableOpacity>
        );
      }
      
      // Vertical split
      if (rowIndex < LAYOUT_GRID.length - 1) {
        const bottomNum = LAYOUT_GRID[rowIndex + 1][colIndex];
        betAreas.push(
          <TouchableOpacity
            key={`vsplit-${rowIndex}-${colIndex}`}
            style={[styles.verticalSplit, { 
              left: colIndex * cellSize,
              top: rowIndex * cellSize 
            }]}
            onPress={() => onBetAreaPress?.(BetType.SPLIT, [num, bottomNum])}
          >
            <RouletteChip amount={getBetAmount([num, bottomNum])} size={chipSize} />
          </TouchableOpacity>
        );
      }
      
      // Corner bet
      if (rowIndex < LAYOUT_GRID.length - 1 && colIndex < row.length - 1) {
        const rightNum = row[colIndex + 1];
        const bottomNum = LAYOUT_GRID[rowIndex + 1][colIndex];
        const bottomRightNum = LAYOUT_GRID[rowIndex + 1][colIndex + 1];
        
        betAreas.push(
          <TouchableOpacity
            key={`corner-${rowIndex}-${colIndex}`}
            style={[styles.cornerBet, { 
              left: colIndex * cellSize,
              top: rowIndex * cellSize 
            }]}
            onPress={() => onBetAreaPress?.(BetType.CORNER, [num, rightNum, bottomNum, bottomRightNum])}
          >
            <RouletteChip 
              amount={getBetAmount([num, rightNum, bottomNum, bottomRightNum])} 
              size={chipSize} 
            />
          </TouchableOpacity>
        );
      }
    });
  });

  return (
    <View style={styles.gridContainer}>
      {/* Number cells layer */}
      <View>
        {LAYOUT_GRID.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.slice(0, maxColumns).map((num) => (
              <RouletteNumberCell
                key={num}
                number={num}
                cellSize={cellSize}
                betAmount={getBetAmount([num])}
                onNumberPress={onNumberPress}
                onBetAreaPress={onBetAreaPress}
              />
            ))}
          </View>
        ))}
      </View>
      
      {/* Bet areas layer - rendered on top */}
      <View style={styles.betAreasLayer}>
        {betAreas}
      </View>
    </View>
  );
};

export default RouletteNumberGrid;

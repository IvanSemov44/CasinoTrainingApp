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

  return (
    <View>
      {LAYOUT_GRID.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.slice(0, maxColumns).map((num, colIndex) => (
            <View key={num} style={styles.numberWrapper}>
              <RouletteNumberCell
                number={num}
                cellSize={cellSize}
                betAmount={getBetAmount([num])}
                onNumberPress={onNumberPress}
                onBetAreaPress={onBetAreaPress}
              />
              
              {/* Street bet (top side of first cell in each column) */}
              {rowIndex === 0 && (
                <>
                  <TouchableOpacity
                    style={styles.streetBet}
                    onPress={() => {
                      if (onBetAreaPress) {
                        const streetNumbers = [
                          LAYOUT_GRID[0][colIndex],
                          LAYOUT_GRID[1][colIndex],
                          LAYOUT_GRID[2][colIndex]
                        ];
                        onBetAreaPress(BetType.STREET, streetNumbers as RouletteNumber[]);
                      }
                    }}
                  >
                    <RouletteChip 
                      amount={getBetAmount([
                        LAYOUT_GRID[0][colIndex],
                        LAYOUT_GRID[1][colIndex],
                        LAYOUT_GRID[2][colIndex]
                      ] as RouletteNumber[])}
                      size={chipSize}
                      isAbsolute
                    />
                  </TouchableOpacity>
                  
                  {/* Six line bet (top-right corner between two streets) */}
                  {colIndex < row.length - 1 && (
                    <TouchableOpacity
                      style={styles.sixLineBet}
                      onPress={() => {
                        if (onBetAreaPress) {
                          const sixLineNumbers = [
                            LAYOUT_GRID[0][colIndex],
                            LAYOUT_GRID[1][colIndex],
                            LAYOUT_GRID[2][colIndex],
                            LAYOUT_GRID[0][colIndex + 1],
                            LAYOUT_GRID[1][colIndex + 1],
                            LAYOUT_GRID[2][colIndex + 1]
                          ];
                          onBetAreaPress(BetType.LINE, sixLineNumbers as RouletteNumber[]);
                        }
                      }}
                    >
                      <RouletteChip
                        amount={getBetAmount([
                          LAYOUT_GRID[0][colIndex],
                          LAYOUT_GRID[1][colIndex],
                          LAYOUT_GRID[2][colIndex],
                          LAYOUT_GRID[0][colIndex + 1],
                          LAYOUT_GRID[1][colIndex + 1],
                          LAYOUT_GRID[2][colIndex + 1]
                        ] as RouletteNumber[])}
                        size={chipSize}
                        isAbsolute
                      />
                    </TouchableOpacity>
                  )}
                </>
              )}
              
              {/* Horizontal split (right side) */}
              {colIndex < row.length - 1 && (
                <TouchableOpacity
                  style={styles.horizontalSplit}
                  onPress={() => {
                    if (onBetAreaPress) {
                      onBetAreaPress(BetType.SPLIT, [num, row[colIndex + 1]]);
                    }
                  }}
                >
                  <RouletteChip
                    amount={getBetAmount([num, row[colIndex + 1]])}
                    size={chipSize}
                    isAbsolute
                  />
                </TouchableOpacity>
              )}
                
              {/* Vertical split (bottom side) */}
              {rowIndex < LAYOUT_GRID.length - 1 && (
                <TouchableOpacity
                  style={styles.verticalSplit}
                  onPress={() => {
                    if (onBetAreaPress) {
                      const bottomNum = LAYOUT_GRID[rowIndex + 1][colIndex];
                      onBetAreaPress(BetType.SPLIT, [num, bottomNum]);
                    }
                  }}
                >
                  <RouletteChip
                    amount={getBetAmount([num, LAYOUT_GRID[rowIndex + 1][colIndex]])}
                    size={chipSize}
                    isAbsolute
                  />
                </TouchableOpacity>
              )}
                
              {/* Corner bet (bottom-right corner) */}
              {rowIndex < LAYOUT_GRID.length - 1 && colIndex < row.length - 1 && (
                <TouchableOpacity
                  style={styles.cornerBet}
                  onPress={() => {
                    if (onBetAreaPress) {
                      const rightNum = row[colIndex + 1];
                      const bottomNum = LAYOUT_GRID[rowIndex + 1][colIndex];
                      const bottomRightNum = LAYOUT_GRID[rowIndex + 1][colIndex + 1];
                      onBetAreaPress(BetType.CORNER, [num, rightNum, bottomNum, bottomRightNum]);
                    }
                  }}
                >
                  <RouletteChip
                    amount={getBetAmount([
                      num,
                      row[colIndex + 1],
                      LAYOUT_GRID[rowIndex + 1][colIndex],
                      LAYOUT_GRID[rowIndex + 1][colIndex + 1]
                    ])}
                    size={chipSize}
                    isAbsolute
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default RouletteNumberGrid;

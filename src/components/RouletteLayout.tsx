import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { RouletteNumber, PlacedBet, BetType } from '../types/roulette.types';
import { getNumberColor, LAYOUT_GRID } from '../constants/roulette.constants';

interface RouletteLayoutProps {
  onNumberPress: (number: RouletteNumber) => void;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
  highlightedNumbers?: RouletteNumber[];
  placedBets?: PlacedBet[];
  selectedChipValue?: number;
  cellSize?: number;
}

const RouletteLayout: React.FC<RouletteLayoutProps> = ({ 
  onNumberPress, 
  onBetAreaPress,
  highlightedNumbers = [],
  placedBets = [],
  selectedChipValue = 5,
  cellSize
}) => {
  const numCellSize = cellSize || defaultCellSize;
  const styles = getStyles(numCellSize);
  
  // Helper to get total bet amount on specific numbers
  const getBetAmount = (numbers: RouletteNumber[]) => {
    return placedBets
      .filter(bet => 
        bet.numbers.length === numbers.length &&
        bet.numbers.every(n => numbers.includes(n))
      )
      .reduce((sum, bet) => sum + bet.amount, 0);
  };
  
  // Render a chip if there's a bet on this number
  const renderChip = (number: RouletteNumber) => {
    const amount = getBetAmount([number]);
    if (amount === 0) return null;
    
    return (
      <View style={styles.chip}>
        <Text style={styles.chipText}>{amount}</Text>
      </View>
    );
  };
  
  // Render split chip between two numbers
  const renderSplitChip = (numbers: RouletteNumber[], position: 'horizontal' | 'vertical') => {
    const amount = getBetAmount(numbers);
    if (amount === 0) return null;
    
    return (
      <View style={[
        styles.splitChip,
        position === 'horizontal' ? styles.horizontalSplitChip : styles.verticalSplitChip
      ]}>
        <Text style={styles.splitChipText}>{amount}</Text>
      </View>
    );
  };
  
  // Render corner chip for four numbers
  const renderCornerChip = (numbers: RouletteNumber[]) => {
    const amount = getBetAmount(numbers);
    if (amount === 0) return null;
    
    return (
      <View style={styles.cornerChip}>
        <Text style={styles.cornerChipText}>{amount}</Text>
      </View>
    );
  };
  
  // Render street chip for three numbers
  const renderStreetChip = (numbers: RouletteNumber[]) => {
    const amount = getBetAmount(numbers);
    if (amount === 0) return null;
    
    return (
      <View style={styles.streetChip}>
        <Text style={styles.streetChipText}>{amount}</Text>
      </View>
    );
  };
  
  // Render six line chip for six numbers
  const renderSixLineChip = (numbers: RouletteNumber[]) => {
    const amount = getBetAmount(numbers);
    if (amount === 0) return null;
    
    return (
      <View style={styles.sixLineChip}>
        <Text style={styles.sixLineChipText}>{amount}</Text>
      </View>
    );
  };
  
  // Render outside bet chip (for dozens and even money bets)
  const renderOutsideBetChip = (numbers: RouletteNumber[]) => {
    const amount = getBetAmount(numbers);
    if (amount === 0) return null;
    
    return (
      <View style={styles.outsideBetChip}>
        <Text style={styles.outsideBetChipText}>{amount}</Text>
      </View>
    );
  };
  
  const renderNumber = (num: RouletteNumber) => {
    const color = getNumberColor(num);
    const isHighlighted = highlightedNumbers.includes(num);
    
    return (
      <TouchableOpacity
        key={num}
        style={[
          styles.numberCell,
          color === 'green' && styles.greenCell,
          isHighlighted && styles.highlightedCell,
        ]}
        onPress={() => {
          onNumberPress(num);
          if (onBetAreaPress) {
            onBetAreaPress(BetType.STRAIGHT, [num]);
          }
        }}
      >
        <Text style={[
          styles.numberText,
          color === 'red' && styles.redText,
          color === 'green' && styles.whiteText,
        ]}>{num}</Text>
        {renderChip(num)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Outside bets section - moved to top */}
      <View style={styles.outsideBetsRow}>
        <View style={styles.emptyCorner} />
        
        <View style={styles.evenMoneyRow}>
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            onPress={() => {
              if (onBetAreaPress) {
                const lowNumbers = Array.from({length: 18}, (_, i) => (i + 1) as RouletteNumber);
                onBetAreaPress(BetType.HIGH_LOW, lowNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>1-18</Text>
            {renderOutsideBetChip(Array.from({length: 18}, (_, i) => (i + 1) as RouletteNumber))}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            onPress={() => {
              if (onBetAreaPress) {
                const evenNumbers = Array.from({length: 18}, (_, i) => ((i + 1) * 2) as RouletteNumber);
                onBetAreaPress(BetType.EVEN_ODD, evenNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>EVEN</Text>
            {renderOutsideBetChip(Array.from({length: 18}, (_, i) => ((i + 1) * 2) as RouletteNumber))}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.evenMoneyBet, styles.redCell]}
            onPress={() => {
              if (onBetAreaPress) {
                const redNumbers: RouletteNumber[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
                onBetAreaPress(BetType.RED_BLACK, redNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>◆</Text>
            {renderOutsideBetChip([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.evenMoneyBet, styles.blackCell]}
            onPress={() => {
              if (onBetAreaPress) {
                const blackNumbers: RouletteNumber[] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
                onBetAreaPress(BetType.RED_BLACK, blackNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>◆</Text>
            {renderOutsideBetChip([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35])}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            onPress={() => {
              if (onBetAreaPress) {
                const oddNumbers = Array.from({length: 18}, (_, i) => ((i * 2) + 1) as RouletteNumber);
                onBetAreaPress(BetType.EVEN_ODD, oddNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>ODD</Text>
            {renderOutsideBetChip(Array.from({length: 18}, (_, i) => ((i * 2) + 1) as RouletteNumber))}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            onPress={() => {
              if (onBetAreaPress) {
                const highNumbers = Array.from({length: 18}, (_, i) => (i + 19) as RouletteNumber);
                onBetAreaPress(BetType.HIGH_LOW, highNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>19-36</Text>
            {renderOutsideBetChip(Array.from({length: 18}, (_, i) => (i + 19) as RouletteNumber))}
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyCorner} />
      </View>

      <View style={styles.outsideBetsRow}>
        <View style={styles.emptyCorner} />
        
        <View style={styles.dozensRow}>
          <TouchableOpacity 
            style={styles.dozenBet}
            onPress={() => {
              if (onBetAreaPress) {
                const dozenNumbers = Array.from({length: 12}, (_, i) => (i + 1) as RouletteNumber);
                onBetAreaPress(BetType.DOZEN, dozenNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>1st 12</Text>
            {renderOutsideBetChip(Array.from({length: 12}, (_, i) => (i + 1) as RouletteNumber))}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.dozenBet}
            onPress={() => {
              if (onBetAreaPress) {
                const dozenNumbers = Array.from({length: 12}, (_, i) => (i + 13) as RouletteNumber);
                onBetAreaPress(BetType.DOZEN, dozenNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>2nd 12</Text>
            {renderOutsideBetChip(Array.from({length: 12}, (_, i) => (i + 13) as RouletteNumber))}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.dozenBet}
            onPress={() => {
              if (onBetAreaPress) {
                const dozenNumbers = Array.from({length: 12}, (_, i) => (i + 25) as RouletteNumber);
                onBetAreaPress(BetType.DOZEN, dozenNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>3rd 12</Text>
            {renderOutsideBetChip(Array.from({length: 12}, (_, i) => (i + 25) as RouletteNumber))}
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyCorner} />
      </View>

      <View style={styles.mainLayout}>
        {/* Zero on the left side */}
        <View style={styles.zeroColumn}>
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
            {renderChip(0)}
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
            {renderSplitChip([0, 3], 'vertical')}
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
            {renderSplitChip([0, 2], 'vertical')}
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
            {renderSplitChip([0, 1], 'vertical')}
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
            {renderCornerChip([0, 1, 2, 3])}
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
            {renderStreetChip([0, 1, 2])}
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
            {renderStreetChip([0, 2, 3])}
          </TouchableOpacity>
        </View>

        {/* Main grid - 3 rows x 12 columns */}
        <View style={styles.gridContainer}>
          {LAYOUT_GRID.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((num, colIndex) => (
                <View key={num} style={styles.numberWrapper}>
                  {renderNumber(num)}
                  
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
                        {renderStreetChip([
                          LAYOUT_GRID[0][colIndex],
                          LAYOUT_GRID[1][colIndex],
                          LAYOUT_GRID[2][colIndex]
                        ] as RouletteNumber[])}
                      </TouchableOpacity>
                      
                      {/* Six line bet (top-left corner between two streets) */}
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
                          {renderSixLineChip([
                            LAYOUT_GRID[0][colIndex],
                            LAYOUT_GRID[1][colIndex],
                            LAYOUT_GRID[2][colIndex],
                            LAYOUT_GRID[0][colIndex + 1],
                            LAYOUT_GRID[1][colIndex + 1],
                            LAYOUT_GRID[2][colIndex + 1]
                          ] as RouletteNumber[])}
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
                      {renderSplitChip([num, row[colIndex + 1]], 'horizontal')}
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
                        {renderSplitChip([num, LAYOUT_GRID[rowIndex + 1][colIndex]], 'vertical')}
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
                        {renderCornerChip([num, row[colIndex + 1], LAYOUT_GRID[rowIndex + 1][colIndex], LAYOUT_GRID[rowIndex + 1][colIndex + 1]])}
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
            </View>
          ))}
        </View>

        {/* Column bets (2 to 1) on the right */}
        <View style={styles.columnBetsContainer}>
          <TouchableOpacity 
            style={styles.columnBet}
            onPress={() => {
              if (onBetAreaPress) {
                const columnNumbers = LAYOUT_GRID[0];
                onBetAreaPress(BetType.COLUMN, columnNumbers);
              }
            }}
          >
            <Text style={styles.columnBetText}>2 to 1</Text>
            {renderOutsideBetChip(LAYOUT_GRID[0])}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.columnBet}
            onPress={() => {
              if (onBetAreaPress) {
                const columnNumbers = LAYOUT_GRID[1];
                onBetAreaPress(BetType.COLUMN, columnNumbers);
              }
            }}
          >
            <Text style={styles.columnBetText}>2 to 1</Text>
            {renderOutsideBetChip(LAYOUT_GRID[1])}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.columnBet}
            onPress={() => {
              if (onBetAreaPress) {
                const columnNumbers = LAYOUT_GRID[2];
                onBetAreaPress(BetType.COLUMN, columnNumbers);
              }
            }}
          >
            <Text style={styles.columnBetText}>2 to 1</Text>
            {renderOutsideBetChip(LAYOUT_GRID[2])}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const defaultCellSize = (width - 100) / 12;

const getStyles = (numCellSize: number) => StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    padding: 0,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#000000',
    alignSelf: 'flex-start',
  },
  mainLayout: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    alignItems: 'flex-start',
  },
  zeroColumn: {
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 0,
    paddingLeft: 0,
  },
  zeroCell: {
    width: numCellSize * 1.5,
    height: numCellSize * 3 + 2, // Height of 3 rows plus gaps
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginLeft: 0,
  },
  gridContainer: {
    marginLeft: 0,
    paddingLeft: 0,
  },
  row: {
    flexDirection: 'row',
  },
  numberCell: {
    width: numCellSize,
    height: numCellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#000000',
  },
  redCell: {
    backgroundColor: '#DC143C',
  },
  blackCell: {
    backgroundColor: '#000000',
  },
  greenCell: {
    backgroundColor: '#008000',
  },
  highlightedCell: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: numCellSize * 0.45,
    fontWeight: 'bold',
  },
  redText: {
    color: '#DC143C',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  columnBetsContainer: {
    justifyContent: 'flex-start',
  },
  columnBet: {
    width: numCellSize * 1.5,
    height: numCellSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  columnBetText: {
    color: '#FFFFFF',
    fontSize: numCellSize * 0.45,
    fontWeight: 'bold',
  },
  outsideBetsRow: {
    flexDirection: 'row',
    backgroundColor: '#000000',
  },
  emptyCorner: {
    width: numCellSize * 1.5,
    backgroundColor: '#000000',
  },
  dozensRow: {
    flex: 1,
    flexDirection: 'row',
  },
  evenMoneyRow: {
    flex: 1,
    flexDirection: 'row',
  },
  dozenBet: {
    width: numCellSize * 4,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  evenMoneyBet: {
    width: numCellSize * 2,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  outsideBetText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  chip: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    borderRadius: 100,
    width: numCellSize * 0.4,
    height: numCellSize * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    color: '#000000',
    fontSize: numCellSize * 0.2,
    fontWeight: 'bold',
  },
  numberWrapper: {
    position: 'relative',
  },
  rowWrapper: {
    position: 'relative',
    flexDirection: 'row',
  },
  horizontalSplit: {
    position: 'absolute',
    right: -8,
    top: 0,
    width: 16,
    height: numCellSize,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  verticalSplit: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: numCellSize,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  zeroSplit: {
    position: 'absolute',
    right: -8,
    width: 16,
    height: numCellSize,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  zeroSplitTop: {
    top: 0,
  },
  zeroSplitMiddle: {
    top: numCellSize + 1,
  },
  zeroSplitBottom: {
    top: numCellSize * 2 + 2,
  },
  firstCorner: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  zeroStreetBet: {
    position: 'absolute',
    top: numCellSize * 2 - 12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  zeroStreetBet2: {
    position: 'absolute',
    top: numCellSize - 12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  splitChip: {
    backgroundColor: '#FFD700',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalSplitChip: {
    width: numCellSize * 0.4,
    height: numCellSize * 0.4,
  },
  verticalSplitChip: {
    width: numCellSize * 0.4,
    height: numCellSize * 0.4,
  },
  splitChipText: {
    color: '#000000',
    fontSize: numCellSize * 0.2,
    fontWeight: 'bold',
  },
  cornerBet: {
    position: 'absolute',
    bottom: -12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  cornerChip: {
    backgroundColor: '#FFD700',
    borderRadius: 100,
    width: numCellSize * 0.4,
    height: numCellSize * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerChipText: {
    color: '#000000',
    fontSize: numCellSize * 0.2,
    fontWeight: 'bold',
  },
  streetBet: {
    position: 'absolute',
    top: -12,
    left: 0,
    width: numCellSize,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  streetChip: {
    backgroundColor: '#FFD700',
    borderRadius: 100,
    width: numCellSize * 0.4,
    height: numCellSize * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streetChipText: {
    color: '#000000',
    fontSize: numCellSize * 0.2,
    fontWeight: 'bold',
  },
  sixLineBet: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
  },
  sixLineChip: {
    backgroundColor: '#FFD700',
    borderRadius: 100,
    width: numCellSize * 0.4,
    height: numCellSize * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sixLineChipText: {
    color: '#000000',
    fontSize: numCellSize * 0.2,
    fontWeight: 'bold',
  },
  outsideBetChip: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    borderRadius: 100,
    width: numCellSize * 0.4,
    height: numCellSize * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outsideBetChipText: {
    color: '#000000',
    fontSize: numCellSize * 0.2,
    fontWeight: 'bold',
  },
});

export default RouletteLayout;

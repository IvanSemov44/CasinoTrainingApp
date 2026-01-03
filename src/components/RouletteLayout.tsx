import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { RouletteNumber } from '../types/roulette.types';
import { getNumberColor, LAYOUT_GRID } from '../constants/roulette.constants';

interface RouletteLayoutProps {
  onNumberPress: (number: RouletteNumber) => void;
  highlightedNumbers?: RouletteNumber[];
  cellSize?: number;
}

const RouletteLayout: React.FC<RouletteLayoutProps> = ({ 
  onNumberPress, 
  highlightedNumbers = [],
  cellSize
}) => {
  const numCellSize = cellSize || defaultCellSize;
  const styles = getStyles(numCellSize);
  
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
        onPress={() => onNumberPress(num)}
      >
        <Text style={[
          styles.numberText,
          color === 'red' && styles.redText,
          color === 'green' && styles.whiteText,
        ]}>{num}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainLayout}>
        {/* Zero on the left side */}
        <View style={styles.zeroColumn}>
          <TouchableOpacity
            style={[styles.zeroCell, styles.greenCell]}
            onPress={() => onNumberPress(0)}
          >
            <Text style={styles.numberText}>0</Text>
          </TouchableOpacity>
        </View>

        {/* Main grid - 3 rows x 12 columns */}
        <View style={styles.gridContainer}>
          {LAYOUT_GRID.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((num) => renderNumber(num))}
            </View>
          ))}
        </View>

        {/* Column bets (2 to 1) on the right */}
        <View style={styles.columnBetsContainer}>
          <TouchableOpacity style={styles.columnBet}>
            <Text style={styles.columnBetText}>2 to 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.columnBet}>
            <Text style={styles.columnBetText}>2 to 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.columnBet}>
            <Text style={styles.columnBetText}>2 to 1</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Outside bets section */}
      <View style={styles.outsideBetsRow}>
        <View style={styles.emptyCorner} />
        
        <View style={styles.dozensRow}>
          <TouchableOpacity style={styles.dozenBet}>
            <Text style={styles.outsideBetText}>1st 12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dozenBet}>
            <Text style={styles.outsideBetText}>2nd 12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dozenBet}>
            <Text style={styles.outsideBetText}>3rd 12</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyCorner} />
      </View>

      <View style={styles.outsideBetsRow}>
        <View style={styles.emptyCorner} />
        
        <View style={styles.evenMoneyRow}>
          <TouchableOpacity style={styles.evenMoneyBet}>
            <Text style={styles.outsideBetText}>1-18</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.evenMoneyBet}>
            <Text style={styles.outsideBetText}>EVEN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.evenMoneyBet, styles.redCell]}>
            <Text style={styles.outsideBetText}>◆</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.evenMoneyBet, styles.blackCell]}>
            <Text style={styles.outsideBetText}>◆</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.evenMoneyBet}>
            <Text style={styles.outsideBetText}>ODD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.evenMoneyBet}>
            <Text style={styles.outsideBetText}>19-36</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyCorner} />
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
  },
  zeroColumn: {
    justifyContent: 'center',
  },
  zeroCell: {
    width: numCellSize * 1.5,
    height: numCellSize * 3 + 2, // Height of 3 rows plus gaps
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  gridContainer: {
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
    borderColor: '#FFFF00',
    borderWidth: 3,
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
});

export default RouletteLayout;

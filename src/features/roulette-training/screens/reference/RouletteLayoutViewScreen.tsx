import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { placeBet } from '../../../../store/rouletteSlice';
import RouletteLayout from '../../../../components/roulette/RouletteLayout';
import { RouletteNumber, BetType } from '../../../../types/roulette.types';

const { width, height } = Dimensions.get('window');

export default function RouletteLayoutViewScreen() {
  const dispatch = useAppDispatch();
  const selectedChipValue = useAppSelector(state => state.roulette.selectedChipValue);
  const placedBets = useAppSelector(state => state.roulette.placedBets);
  const [highlightedNumbers, setHighlightedNumbers] = useState<RouletteNumber[]>([]);
  
  // Calculate cell size to fill screen height when rotated (width becomes height after 90° rotation)
  // Total layout width = 15 * cellSize (1.5 + 12 + 1.5 for zero + numbers + columns)
  const cellSize = (height - 80) / 15;

  const handleNumberPress = (number: RouletteNumber) => {
    setHighlightedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      }
      return [...prev, number];
    });
  };

  const handleBetAreaPress = (betType: BetType, numbers: RouletteNumber[]) => {
    const bet = {
      id: `${Date.now()}-${numbers.join('-')}`,
      type: betType,
      numbers: numbers,
      amount: 1,
      payout: getPayout(betType),
      timestamp: Date.now(),
    };
    dispatch(placeBet(bet));
  };

  const getPayout = (betType: BetType) => {
    switch (betType) {
      case BetType.STRAIGHT: return 35;
      case BetType.SPLIT: return 17;
      case BetType.STREET: return 11;
      case BetType.CORNER: return 8;
      case BetType.LINE: return 5;
      case BetType.DOZEN:
      case BetType.COLUMN: return 2;
      default: return 1;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        minimumZoomScale={1}
        maximumZoomScale={3}
      >
        <View style={styles.layoutWrapper}>
          <RouletteLayout 
            onNumberPress={handleNumberPress}
            onBetAreaPress={handleBetAreaPress}
            placedBets={placedBets}
            selectedChipValue={selectedChipValue}
            cellSize={cellSize}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2f1f',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  layoutWrapper: {
    transform: [{ rotate: '90deg' }],
  },
});

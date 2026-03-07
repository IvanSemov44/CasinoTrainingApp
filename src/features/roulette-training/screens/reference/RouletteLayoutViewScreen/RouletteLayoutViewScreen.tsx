import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { placeBet } from '@store/rouletteSlice';
import RouletteLayout from '@components/roulette/RouletteLayout';
import { RouletteNumber, BetType } from '@app-types/roulette.types';
import { getPayoutForBetType } from '@features/roulette-training/constants/payouts';
import { useTheme } from '@contexts/ThemeContext';

const { height } = Dimensions.get('window');

export default function RouletteLayoutViewScreen() {
  const dispatch = useAppDispatch();
  const selectedChipValue = useAppSelector(state => state.roulette.selectedChipValue);
  const placedBets = useAppSelector(state => state.roulette.placedBets);
  const [_highlightedNumbers, setHighlightedNumbers] = useState<RouletteNumber[]>([]);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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
      payout: getPayoutForBetType(betType),
      timestamp: Date.now(),
    };
    dispatch(placeBet(bet));
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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
   
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 24,
    },
    layoutWrapper: {
      transform: [{ rotate: '90deg' }],
    },
  });
   
}

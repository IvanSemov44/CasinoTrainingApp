import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import RouletteLayout from '../components/RouletteLayout';
import { RouletteNumber } from '../types/roulette.types';

const { width, height } = Dimensions.get('window');

export default function RouletteLayoutViewScreen() {
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
            highlightedNumbers={highlightedNumbers}
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

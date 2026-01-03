import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import RouletteLayout from '../components/RouletteLayout';
import { RouletteNumber } from '../types/roulette.types';

const { width, height } = Dimensions.get('window');

export default function RouletteLayoutViewScreen() {
  const [highlightedNumbers, setHighlightedNumbers] = useState<RouletteNumber[]>([]);

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
    width: height - 100,
    height: width - 40,
  },
});

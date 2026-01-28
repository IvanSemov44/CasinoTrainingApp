import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { WHEEL_ORDER } from '../constants/roulette.constants';
import { RouletteNumber } from '../types/roulette.types';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../features/roulette-training/constants/theme';

interface RacetrackProps {
  onNumberPress: (number: RouletteNumber) => void;
  onNeighborBet?: (number: RouletteNumber, neighbors: number) => void;
  highlightedNumbers?: RouletteNumber[];
}

const Racetrack: React.FC<RacetrackProps> = ({ 
  onNumberPress,
  highlightedNumbers = [] 
}) => {
  const getNumberColor = (num: RouletteNumber): string => {
    if (num === 0) return '#006400';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? '#CC0000' : COLORS.background.dark;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Racetrack - Neighbor Bets</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.wheelContainer}
      >
        {WHEEL_ORDER.map((num) => {
          const isHighlighted = highlightedNumbers.includes(num);
          const backgroundColor = getNumberColor(num);
          
          return (
            <TouchableOpacity
              key={num}
              style={[
                styles.numberCell,
                { backgroundColor },
                isHighlighted && styles.highlightedCell,
              ]}
              onPress={() => onNumberPress(num)}
            >
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Special bet buttons */}
      <View style={styles.specialBetsContainer}>
        <TouchableOpacity style={styles.specialBet}>
          <Text style={styles.specialBetText}>Voisins du Zero</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.specialBet}>
          <Text style={styles.specialBetText}>Tiers du Cylindre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.specialBet}>
          <Text style={styles.specialBetText}>Orphelins</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.specialBet}>
          <Text style={styles.specialBetText}>Zero Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.primary,
    padding: SPACING.sm,
    borderRadius: BORDERS.radius.md,
    borderWidth: 3,
    borderColor: '#8B4513',
    marginTop: SPACING.sm,
  },
  title: {
    color: COLORS.text.gold,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  wheelContainer: {
    flexDirection: 'row',
    paddingVertical: SPACING.xs,
  },
  numberCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: BORDERS.width.thin,
    borderColor: COLORS.border.gold,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  highlightedCell: {
    borderColor: '#FFFF00',
    borderWidth: 3,
  },
  numberText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: 'bold',
  },
  specialBetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  specialBet: {
    backgroundColor: COLORS.background.secondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderRadius: BORDERS.radius.sm,
    borderWidth: BORDERS.width.thin,
    borderColor: COLORS.border.gold,
  },
  specialBetText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: 'bold',
  },
});

export default Racetrack;

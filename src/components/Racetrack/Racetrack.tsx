import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { WHEEL_ORDER } from '@constants/roulette.constants';
import type { RouletteNumber } from '@app-types/roulette.types';
import { useTheme } from '@contexts/ThemeContext';

interface RacetrackProps {
  onNumberPress: (number: RouletteNumber) => void;
  onNeighborBet?: (number: RouletteNumber, neighbors: number) => void;
  highlightedNumbers?: RouletteNumber[];
}

// Roulette ball colors - standard casino game colors
const ROULETTE_COLORS = {
  green: '#2D8659',  // Roulette wheel green (0)
  red: '#DC143C',    // Crimson red (red numbers)
};

const Racetrack: React.FC<RacetrackProps> = ({
  onNumberPress,
  highlightedNumbers = []
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const getNumberColor = (num: RouletteNumber): string => {
    if (num === 0) return ROULETTE_COLORS.green;
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? ROULETTE_COLORS.red : colors.background.dark;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Racetrack - Neighbor Bets</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.wheelContainer}
      >
        {WHEEL_ORDER.map((num: RouletteNumber) => {
          const isHighlighted = highlightedNumbers.includes(num);
          const backgroundColor = getNumberColor(num);
          const colorName = num === 0 ? 'green' : [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num) ? 'red' : 'black';

          return (
            <TouchableOpacity
              key={num}
              style={[
                styles.numberCell,
                { backgroundColor },
                isHighlighted && styles.highlightedCell,
              ]}
              onPress={() => onNumberPress(num)}
              accessibilityLabel={`Number ${num}, ${colorName}${isHighlighted ? ', highlighted' : ''}`}
              accessibilityHint="Double tap to select this number"
              accessibilityRole="button"
            >
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Special bet buttons */}
      {/*
        * DEVOPS MODE - REFERENCE ONLY *
        These buttons are intentionally non-functional and serve as visual reference only.
        DO NOT implement onPress handlers for these buttons.
        Implementation is complex and should be locked for future development.
        For actual announced bets functionality, use the dedicated Announced Bets Training feature.
      */}
      <View style={styles.specialBetsContainer}>
        <TouchableOpacity
          style={styles.specialBet}
          disabled
          accessibilityLabel="Voisins du Zero bet, disabled"
          accessibilityHint="This feature is not yet available"
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
        >
          <Text style={styles.specialBetText}>Voisins du Zero</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.specialBet}
          disabled
          accessibilityLabel="Tiers du Cylindre bet, disabled"
          accessibilityHint="This feature is not yet available"
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
        >
          <Text style={styles.specialBetText}>Tiers du Cylindre</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.specialBet}
          disabled
          accessibilityLabel="Orphelins bet, disabled"
          accessibilityHint="This feature is not yet available"
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
        >
          <Text style={styles.specialBetText}>Orphelins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.specialBet}
          disabled
          accessibilityLabel="Zero Game bet, disabled"
          accessibilityHint="This feature is not yet available"
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
        >
          <Text style={styles.specialBetText}>Zero Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.primary,
      padding: 8,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: '#8B4513',
      marginTop: 8,
    },
    title: {
      color: colors.text.gold,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
    },
    wheelContainer: {
      flexDirection: 'row',
      paddingVertical: 4,
    },
    numberCell: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border.gold,
      borderRadius: 20,
      marginHorizontal: 2,
    },
    highlightedCell: {
      borderColor: '#FFFF00',
      borderWidth: 3,
    },
    numberText: {
      color: colors.text.primary,
      fontSize: 14,
      fontWeight: 'bold',
    },
    specialBetsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
      gap: 4,
    },
    specialBet: {
      backgroundColor: colors.background.secondary,
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border.gold,
    },
    specialBetText: {
      color: colors.text.primary,
      fontSize: 12,
      fontWeight: 'bold',
    },
  });
  /* eslint-enable react-native/no-unused-styles */
}

export default Racetrack;

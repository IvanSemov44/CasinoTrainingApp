import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { RouletteLayout } from '../../../components/roulette';
import { RacetrackLayout } from '../../racetrack/components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function RouletteGameScreen() {
  const racetrackWidth = Math.min(screenWidth - 64, 600);
  // Calculate cellSize based on screen width - roulette has ~15 cells width (12 + zero column + column bets)
  const availableWidth = Math.min(screenWidth - 64, 450);
  const cellSize = Math.max(20, Math.min(30, availableWidth / 15));

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        {/* Racetrack at the top */}
        <View style={styles.racetrackContainer}>
          <RacetrackLayout width={racetrackWidth} />
        </View>

        {/* Roulette layout below */}
        <View style={styles.rouletteContainer}>
          <RouletteLayout 
            onNumberPress={(number) => {
              console.log('Number pressed:', number);
            }}
            onBetAreaPress={(betType, numbers) => {
              console.log('Bet placed:', betType, numbers);
            }}
            cellSize={cellSize}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: SPACING.lg,
  },
  gameContainer: {
    backgroundColor: '#1a472a',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FFD700',
    padding: SPACING.md,
    alignItems: 'center',
  },
  racetrackContainer: {
    marginBottom: SPACING.sm,
  },
  rouletteContainer: {
    alignItems: 'center',
  },
});
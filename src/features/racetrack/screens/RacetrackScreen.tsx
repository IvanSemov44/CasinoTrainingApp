import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../roulette-training/constants/theme';
import RacetrackLayout from '../components/RacetrackLayout';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function RacetrackScreen() {
  // Use height for width since we're rotating 90 degrees
  const racetrackWidth = Math.min(screenHeight - 150, 800);

  return (
    <View style={styles.container}>
      <View style={styles.rotatedContainer}>
        <RacetrackLayout width={racetrackWidth} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotatedContainer: {
    transform: [{ rotate: '90deg' }],
  },
});

import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { RacetrackLayout } from '../components';

const { height: screenHeight } = Dimensions.get('window');

export default function RacetrackScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.primary,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rotatedContainer: {
      transform: [{ rotate: '90deg' }],
    },
  });
}

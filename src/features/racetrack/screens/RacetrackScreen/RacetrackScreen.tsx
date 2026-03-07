import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { RacetrackLayout } from '../../components';

const { height: screenHeight } = Dimensions.get('window');

export default function RacetrackScreen() {
  const styles = useThemedStyles(makeStyles);

  const racetrackWidth = Math.min(screenHeight - 150, 800);

  return (
    <View style={styles.container}>
      <View style={styles.rotatedContainer}>
        <RacetrackLayout width={racetrackWidth} />
      </View>
    </View>
  );
}

function makeStyles(colors: AppColors) {
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

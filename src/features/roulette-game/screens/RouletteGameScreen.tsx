import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { RouletteLayout } from '../../../components/roulette';
import { RacetrackLayout } from '../../racetrack/components';
import { useAnnouncedBets } from '../../racetrack/hooks';
import { PlacedBet } from '../../../types/roulette.types';

const { width: screenWidth } = Dimensions.get('window');

export default function RouletteGameScreen() {
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
  const [selectedChipValue] = useState(5);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const racetrackWidth = Math.min(screenWidth - 64, 600);
  const availableWidth = Math.min(screenWidth - 64, 450);
  const cellSize = Math.max(20, Math.min(30, availableWidth / 15));

  // Callback for when bets are placed
  const handleBetsPlaced = useCallback((newBets: PlacedBet[]) => {
    setPlacedBets(prev => [...prev, ...newBets]);
  }, []);

  // Use the announced bets hook
  const { handleSectionPress, handleNumberPress } = useAnnouncedBets({
    selectedChipValue,
    onBetsPlaced: handleBetsPlaced,
  });

  // Handle number press from roulette layout
  const handleRouletteNumberPress = useCallback((number: number) => {
    // TODO: Implement bet placement logic for roulette numbers
    void number; // Placeholder until implementation
  }, []);

  // Handle bet area press from roulette layout
  const handleRouletteBetAreaPress = useCallback((betType: string, numbers: number[]) => {
    // TODO: Implement bet placement logic for bet areas
    void betType;
    void numbers; // Placeholder until implementation
  }, []);

  return (
    <View style={styles.container} testID="roulette-game-container">
      <View style={styles.gameContainer}>
        {/* Racetrack at the top */}
        <View style={styles.racetrackContainer}>
          <RacetrackLayout
            width={racetrackWidth}
            onSectionPress={handleSectionPress}
            onNumberPress={handleNumberPress}
          />
        </View>

        {/* Roulette layout below */}
        <View style={styles.rouletteContainer}>
          <RouletteLayout
            onNumberPress={handleRouletteNumberPress}
            onBetAreaPress={handleRouletteBetAreaPress}
            placedBets={placedBets}
            selectedChipValue={selectedChipValue}
            cellSize={cellSize}
          />
        </View>
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
      justifyContent: 'flex-start',
      paddingTop: 24,
    },
    gameContainer: {
      backgroundColor: '#1a472a',
      borderRadius: 12,
      borderWidth: 3,
      borderColor: colors.border.gold,
      padding: 16,
      alignItems: 'center',
    },
    racetrackContainer: {
      marginBottom: 8,
    },
    rouletteContainer: {
      alignItems: 'center',
    },
  });
}

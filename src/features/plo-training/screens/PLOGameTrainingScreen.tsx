import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import PokerTable from '../components/PokerTable';

export default function PLOGameTrainingScreen({ navigation }: any) {
  // Initial player data
  const initialPlayers = [
    { position: 1, name: 'CO', chipAmount: 290, isDealer: false },
    { position: 2, name: 'MP', chipAmount: 680, isDealer: false },
    { position: 3, name: 'UTG', chipAmount: 420, isDealer: false },
    { position: 4, name: 'BB', chipAmount: 350, isDealer: false },
    { position: 5, name: 'SB', chipAmount: 500, isDealer: false },
    { position: 6, name: 'D', chipAmount: 540, isDealer: true },
  ];

  const [players, setPlayers] = useState(initialPlayers);

  const rotateDealer = () => {
    setPlayers(prevPlayers => {
      // Get current names from players
      const currentNames = prevPlayers.map(p => p.name);
      
      // Rotate names counter-clockwise: shift right
      const rotatedNames = [...currentNames.slice(1), currentNames[0]];
      
      return prevPlayers.map((player, index) => ({
        ...player,
        name: rotatedNames[index],
        isDealer: rotatedNames[index] === 'D',
      }));
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.tableWrapper}>
        <PokerTable players={players} />
      </View>

      <TouchableOpacity style={styles.newHandButton} onPress={rotateDealer}>
        <Text style={styles.newHandButtonText}>New Hand (Rotate Dealer)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  tableWrapper: {
    marginTop: SPACING.md,
  },
  newHandButton: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  newHandButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a0a0a',
  },
});

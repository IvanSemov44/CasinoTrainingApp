import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';

interface PlayerPositionProps {
  position: number;
  chipAmount: number;
  name?: string;
  isDealer?: boolean;
}

export default function PlayerPosition({ position, chipAmount, name, isDealer }: PlayerPositionProps) {
  return (
    <View style={styles.playerContainer}>
      {isDealer && (
        <View style={styles.dealerButton}>
          <Text style={styles.dealerText}>D</Text>
        </View>
      )}
      <View style={styles.playerCard}>
        <Text style={styles.playerName}>{name || `Player ${position}`}</Text>
      </View>
      <View style={styles.chipsContainer}>
        <View style={styles.chipStack}>
          <Text style={styles.chipValue}>${chipAmount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playerContainer: {
    alignItems: 'center',
    position: 'absolute',
  },
  playerCard: {
    backgroundColor: COLORS.background.secondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
    minWidth: 80,
  },
  playerName: {
    color: COLORS.text.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  chipsContainer: {
    marginTop: SPACING.xs,
  },
  chipStack: {
    backgroundColor: '#2c3e50',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
  },
  chipValue: {
    color: COLORS.text.gold,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  dealerButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FFD700',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    zIndex: 10,
  },
  dealerText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
});

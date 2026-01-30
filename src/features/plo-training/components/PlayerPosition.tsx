import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { PlayerActionType } from '../types';

interface PlayerPositionProps {
  position: number;
  chipAmount?: number;
  name?: string;
  isDealer?: boolean;
  action?: PlayerActionType;
  betAmount?: number;
  isFolded?: boolean;
  isRequesting?: boolean;
}

export default function PlayerPosition({ 
  position, 
  chipAmount, 
  name, 
  isDealer,
  action,
  betAmount,
  isFolded,
  isRequesting,
}: PlayerPositionProps) {
  return (
    <View style={styles.playerContainer}>
      {isDealer && (
        <View style={styles.dealerButton}>
          <Text style={styles.dealerText}>D</Text>
        </View>
      )}
      <View style={[
        styles.playerCard,
        isFolded && styles.foldedCard,
        isRequesting && styles.requestingCard,
      ]}>
        <Text style={[styles.playerName, isFolded && styles.foldedText]}>
          {name || `Player ${position}`}
        </Text>
      </View>
      
      {/* Show bet amount if player has acted */}
      {betAmount !== undefined && betAmount > 0 && !isFolded && (
        <View style={styles.betContainer}>
          <View style={styles.betChip}>
            <Text style={styles.betAmount}>${betAmount}</Text>
          </View>
        </View>
      )}
      
      {/* Show action label */}
      {action && (
        <View style={[styles.actionLabel, isFolded && styles.foldedLabel]}>
          <Text style={[styles.actionText, isFolded && styles.foldedText]}>
            {action.toUpperCase()}
          </Text>
        </View>
      )}
      
      {/* Show "ASKS POT" indicator */}
      {isRequesting && (
        <View style={styles.requestingLabel}>
          <Text style={styles.requestingText}>ASKS POT</Text>
        </View>
      )}
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
  },
  foldedCard: {
    opacity: 0.4,
    borderColor: '#666',
  },
  requestingCard: {
    borderColor: '#FF4500',
    borderWidth: 3,
    backgroundColor: '#2a1a1a',
  },
  foldedText: {
    color: '#666',
  },
  betContainer: {
    marginTop: SPACING.xs,
  },
  betChip: {
    backgroundColor: '#FF4500',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  betAmount: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  actionLabel: {
    marginTop: 4,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  foldedLabel: {
    backgroundColor: '#666',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  requestingLabel: {
    marginTop: 4,
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  requestingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    zIndex: 10,
  },
  dealerText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
});

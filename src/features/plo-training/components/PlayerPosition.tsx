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
  // A folded player with chips in front = called then folded to a re-raise.
  // Their chips stay visible so the dealer can count them as dead money.
  const hasDeadChips = isFolded && betAmount !== undefined && betAmount > 0;

  return (
    <View style={styles.playerContainer}>
      {/* Dealer button */}
      {isDealer && (
        <View style={styles.dealerButton}>
          <Text style={styles.dealerText}>D</Text>
        </View>
      )}

      {/* Player card */}
      <View style={[
        styles.playerCard,
        isFolded     && styles.foldedCard,
        isRequesting && styles.requestingCard,
      ]}>
        {isFolded && (
          <View style={styles.foldBadge}>
            <Text style={styles.foldBadgeText}>FOLD</Text>
          </View>
        )}
        <Text style={[styles.playerName, isFolded && styles.foldedText]}>
          {name || `P${position}`}
        </Text>
        {chipAmount !== undefined && !isFolded && (
          <Text style={styles.chipAmount}>${chipAmount}</Text>
        )}
      </View>

      {/* Active bet chip */}
      {!isFolded && betAmount !== undefined && betAmount > 0 && (
        <View style={styles.betContainer}>
          <View style={styles.betChip}>
            <Text style={styles.betAmount}>${betAmount}</Text>
          </View>
        </View>
      )}

      {/* Dead-money chip: folded but had chips (called then folded) */}
      {hasDeadChips && (
        <View style={styles.betContainer}>
          <View style={styles.deadChip}>
            <Text style={styles.deadChipText}>DEAD</Text>
            <Text style={styles.deadChipAmount}>${betAmount}</Text>
          </View>
        </View>
      )}

      {/* Action label (for non-folded players with a displayed action) */}
      {action && !isFolded && (
        <View style={styles.actionLabel}>
          <Text style={styles.actionText}>{action.toUpperCase()}</Text>
        </View>
      )}

      {/* ASKS POT indicator */}
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

  // ── Player card ───────────────────────────────────────────────────────────
  playerCard: {
    backgroundColor: COLORS.background.secondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
    minWidth: 70,
    alignItems: 'center',
  },

  foldedCard: {
    opacity: 0.45,
    borderWidth: 1,
    borderColor: '#555',
    borderStyle: 'dashed',
    backgroundColor: '#111',
  },

  requestingCard: {
    borderColor: '#FF4500',
    borderWidth: 3,
    backgroundColor: '#1f0a00',
  },

  // ── FOLD badge (inside the card) ──────────────────────────────────────────
  foldBadge: {
    backgroundColor: '#4a4a4a',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 3,
  },
  foldBadgeText: {
    color: '#888',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },

  // ── Text ──────────────────────────────────────────────────────────────────
  playerName: {
    color: COLORS.text.primary,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  foldedText: {
    color: '#555',
  },
  chipAmount: {
    color: COLORS.text.gold,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 2,
  },

  // ── Dealer button ─────────────────────────────────────────────────────────
  dealerButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FFD700',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    zIndex: 10,
  },
  dealerText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '800',
  },

  // ── Active bet chip (orange) ──────────────────────────────────────────────
  betContainer: {
    marginTop: 4,
  },
  betChip: {
    backgroundColor: '#CC4400',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  betAmount: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },

  // ── Dead-money chip (gray, folded-with-chips) ─────────────────────────────
  deadChip: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    alignItems: 'center',
  },
  deadChipText: {
    color: '#666',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  deadChipAmount: {
    color: '#777',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  // ── Action label ──────────────────────────────────────────────────────────
  actionLabel: {
    marginTop: 4,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  actionText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },

  // ── ASKS POT label ────────────────────────────────────────────────────────
  requestingLabel: {
    marginTop: 4,
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  requestingText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
});

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import type { PlayerPositionProps } from './PlayerPosition.types';

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
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    playerContainer: {
      alignItems: 'center',
      position: 'absolute',
    },

    // ── Player card ───────────────────────────────────────────────────────────
    playerCard: {
      backgroundColor: colors.background.secondary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: colors.text.gold,
      minWidth: 70,
      alignItems: 'center',
    },

    foldedCard: {
      opacity: 0.45,
      borderWidth: 1,
      borderColor: colors.text.muted,
      borderStyle: 'dashed',
      backgroundColor: colors.background.darkGray,
    },

    requestingCard: {
      borderColor: colors.status.warning,
      borderWidth: 3,
      backgroundColor: colors.background.darkGray,
    },

    // ── FOLD badge (inside the card) ──────────────────────────────────────────
    foldBadge: {
      backgroundColor: colors.background.hint,
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginBottom: 3,
    },
    foldBadgeText: {
      color: colors.text.placeholder,
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1,
    },

    // ── Text ──────────────────────────────────────────────────────────────────
    playerName: {
      color: colors.text.primary,
      fontSize: 13,
      fontWeight: '600',
      textAlign: 'center',
    },
    foldedText: {
      color: colors.text.muted,
    },
    chipAmount: {
      color: colors.text.gold,
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
      backgroundColor: colors.text.gold,
      width: 22,
      height: 22,
      borderRadius: 11,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.background.dark,
      zIndex: 10,
    },
    dealerText: {
      color: colors.background.dark,
      fontSize: 11,
      fontWeight: '800',
    },

    // ── Active bet chip (orange) ──────────────────────────────────────────────
    betContainer: {
      marginTop: 4,
    },
    betChip: {
      backgroundColor: colors.status.warning,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.text.gold,
    },
    betAmount: {
      color: colors.text.primary,
      fontSize: 13,
      fontWeight: '700',
      textAlign: 'center',
    },

    // ── Dead-money chip (gray, folded-with-chips) ─────────────────────────────
    deadChip: {
      backgroundColor: colors.background.darkGray,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.text.muted,
      alignItems: 'center',
    },
    deadChipText: {
      color: colors.text.muted,
      fontSize: 8,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    deadChipAmount: {
      color: colors.text.secondary,
      fontSize: 12,
      fontWeight: '600',
      textAlign: 'center',
    },

    // ── Action label ──────────────────────────────────────────────────────────
    actionLabel: {
      marginTop: 4,
      backgroundColor: colors.status.success,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
    },
    actionText: {
      color: colors.text.primary,
      fontSize: 10,
      fontWeight: '700',
      textAlign: 'center',
    },

    // ── ASKS POT label ────────────────────────────────────────────────────────
    requestingLabel: {
      marginTop: 4,
      backgroundColor: colors.status.warning,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    requestingText: {
      color: colors.text.primary,
      fontSize: 11,
      fontWeight: '800',
      textAlign: 'center',
    },
  });
}

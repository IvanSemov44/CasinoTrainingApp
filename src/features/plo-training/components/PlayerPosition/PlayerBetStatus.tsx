import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import type { PlayerActionType } from '../../types';

interface PlayerBetStatusProps {
  isFolded?: boolean;
  betAmount?: number;
  isRequesting?: boolean;
  action?: PlayerActionType;
}

export default function PlayerBetStatus({
  isFolded,
  betAmount,
  isRequesting,
  action,
}: PlayerBetStatusProps) {
  const styles = useThemedStyles(makeStyles);
  const hasDeadChips = !!isFolded && betAmount !== undefined && betAmount > 0;

  return (
    <>
      {!isFolded && betAmount !== undefined && betAmount > 0 && (
        <View style={styles.betContainer}>
          <View style={styles.betChip}>
            <Text style={styles.betAmount}>${betAmount}</Text>
          </View>
        </View>
      )}

      {hasDeadChips && (
        <View style={styles.betContainer}>
          <View style={styles.deadChip}>
            <Text style={styles.deadChipText}>DEAD</Text>
            <Text style={styles.deadChipAmount}>${betAmount}</Text>
          </View>
        </View>
      )}

      {action && !isFolded && (
        <View style={styles.actionLabel}>
          <Text style={styles.actionText}>{action.toUpperCase()}</Text>
        </View>
      )}

      {isRequesting && (
        <View style={styles.requestingLabel}>
          <Text style={styles.requestingText}>ASKS POT</Text>
        </View>
      )}
    </>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
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

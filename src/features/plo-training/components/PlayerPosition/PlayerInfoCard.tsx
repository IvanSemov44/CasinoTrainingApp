import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

interface PlayerInfoCardProps {
  position: number;
  name?: string;
  chipAmount?: number;
  isDealer?: boolean;
  isFolded?: boolean;
  isRequesting?: boolean;
}

export default function PlayerInfoCard({
  position,
  name,
  chipAmount,
  isDealer,
  isFolded,
  isRequesting,
}: PlayerInfoCardProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <>
      {isDealer && (
        <View style={styles.dealerButton}>
          <Text style={styles.dealerText}>D</Text>
        </View>
      )}

      <View
        style={[
          styles.playerCard,
          isFolded && styles.foldedCard,
          isRequesting && styles.requestingCard,
        ]}
      >
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
    </>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
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
  });
}

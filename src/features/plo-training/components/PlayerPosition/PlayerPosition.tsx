import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import type { PlayerPositionProps } from './PlayerPosition.types';
import PlayerInfoCard from './PlayerInfoCard';
import PlayerBetStatus from './PlayerBetStatus';

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
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.playerContainer}>
      <PlayerInfoCard
        position={position}
        name={name}
        chipAmount={chipAmount}
        isDealer={isDealer}
        isFolded={isFolded}
        isRequesting={isRequesting}
      />

      <PlayerBetStatus
        isFolded={isFolded}
        betAmount={betAmount}
        isRequesting={isRequesting}
        action={action}
      />
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    playerContainer: {
      alignItems: 'center',
      position: 'absolute',
    },
  });
}

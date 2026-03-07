import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { getModeDisplayName } from '../../utils/validation';
import type { ChallengeDisplayProps } from './ChallengeDisplay.types';

export default function ChallengeDisplay({ mode, totalBets }: ChallengeDisplayProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Training Challenge</Text>
      <Text style={styles.challenge}>
        Place all chips for <Text style={styles.highlight}>{getModeDisplayName(mode)}</Text>
      </Text>
      <Text style={styles.info}>Required positions: {totalBets}</Text>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      padding: 16,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.text.gold,
      marginBottom: 16,
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.secondary,
      marginBottom: 4,
    },
    challenge: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 4,
      textAlign: 'center',
    },
    highlight: {
      color: colors.text.gold,
    },
    info: {
      fontSize: 14,
      color: colors.text.secondary,
    },
  });
}

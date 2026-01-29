import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { AnnouncedBetMode } from '../types';
import { getModeDisplayName } from '../utils/validation';

interface ChallengeDisplayProps {
  mode: Exclude<AnnouncedBetMode, 'random'>;
  totalBets: number;
}

export default function ChallengeDisplay({ mode, totalBets }: ChallengeDisplayProps) {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  challenge: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  highlight: {
    color: COLORS.text.gold,
  },
  info: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
});

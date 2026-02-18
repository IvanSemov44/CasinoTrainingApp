import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { CashRequest } from '../types';
import { SECTOR_NAMES } from '../constants/sectors';

interface RequestDisplayProps {
  request: CashRequest;
}

export default function RequestDisplay({ request }: RequestDisplayProps) {
  const sectorName = SECTOR_NAMES[request.sector];
  
  const requestText =
    request.requestType === 'for-the-money'
      ? `${sectorName} for the money`
      : `${sectorName} by $${request.specifiedAmount}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer says:</Text>
      <Text style={styles.request}>&ldquo;{requestText}&rdquo;</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  request: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text.gold,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { CashRequest } from '../../types';
import { SECTOR_NAMES } from '../../constants/sectors';
import type { RequestDisplayProps } from './RequestDisplay.types';

export default function RequestDisplay({ request }: RequestDisplayProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      padding: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border.gold,
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.secondary,
      marginBottom: 4,
      textAlign: 'center',
    },
    request: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text.gold,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });
}

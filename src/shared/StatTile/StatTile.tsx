import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

export interface StatTileProps {
  label: string;
  value: string | number;
  containerStyle?: object;
  labelStyle?: object;
  valueStyle?: object;
}

/**
 * Generic value+label tile used in headers/sidebars for session stats.
 */
export function StatTile({ label, value, containerStyle, labelStyle, valueStyle }: StatTileProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    label: {
      fontSize: 12,
      color: colors.text.secondary,
      marginBottom: 4,
    },
    value: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text.gold,
    },
  });
}

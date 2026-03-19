import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createTextStyles, createContainerStyles } from '@styles';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import type { ReactNode } from 'react';

export interface ReferenceCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * Shared reference card component
 * Used for displaying reference information in a consistent styled container
 */

export function ReferenceCard({ title, subtitle, children }: ReferenceCardProps) {
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  );
}

function makeStyles(colors: AppColors) {
  const textStyles = createTextStyles(colors);
  const containerStyles = createContainerStyles(colors);

  return StyleSheet.create({
    container: {
      ...containerStyles.secondaryCard,
      marginBottom: 24,
    },
    title: {
      ...textStyles.goldTitle,
      fontSize: 16,
      marginBottom: 4,
    },
    subtitle: {
      ...textStyles.secondaryText,
      fontSize: 13,
      marginBottom: 12,
    },
  });
}

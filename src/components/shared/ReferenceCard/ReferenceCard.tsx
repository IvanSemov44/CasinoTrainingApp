import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { createTextStyles } from '@styles';
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
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  const textStyles = createTextStyles(colors);
  
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border.primary,
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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import type { ReactNode } from 'react';

export interface FeedbackSectionProps {
  title: string;
  children: ReactNode;
  containerStyle?: object;
  titleStyle?: object;
}

/**
 * Shared feedback section block with a titled body.
 */
export function FeedbackSection({
  title,
  children,
  containerStyle,
  titleStyle,
}: FeedbackSectionProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {children}
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.secondary,
      marginBottom: 4,
    },
  });
}

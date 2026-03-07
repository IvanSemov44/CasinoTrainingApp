import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import type { ReactNode } from 'react';

export interface FeedbackShellProps {
  isCorrect: boolean;
  correctTitle: string;
  incorrectTitle: string;
  mode?: 'container' | 'header';
  children: ReactNode;
  containerStyle?: object;
  contentStyle?: object;
  titleStyle?: object;
  headerStyle?: object;
}

/**
 * Shared feedback shell for result cards with success/error status treatment.
 */
export function FeedbackShell({
  isCorrect,
  correctTitle,
  incorrectTitle,
  mode = 'header',
  children,
  containerStyle,
  contentStyle,
  titleStyle,
  headerStyle,
}: FeedbackShellProps) {
  const styles = useThemedStyles(makeStyles);
  const title = isCorrect ? correctTitle : incorrectTitle;

  return (
    <View
      style={[
        styles.container,
        mode === 'header' ? styles.headerModeContainer : null,
        mode === 'container'
          ? isCorrect
            ? styles.containerCorrect
            : styles.containerIncorrect
          : null,
        containerStyle,
      ]}
    >
      {mode === 'header' ? (
        <View
          style={[
            styles.header,
            isCorrect ? styles.headerCorrect : styles.headerIncorrect,
            headerStyle,
          ]}
        >
          <Text style={[styles.headerText, titleStyle]}>{title}</Text>
        </View>
      ) : (
        <Text style={[styles.containerTitle, titleStyle]}>{title}</Text>
      )}

      <View style={contentStyle}>{children}</View>
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      borderRadius: 12,
      borderWidth: 2,
      overflow: 'hidden',
    },
    headerModeContainer: {
      backgroundColor: colors.background.secondary,
      borderColor: colors.border.gold,
    },
    containerCorrect: {
      backgroundColor: colors.status.successAlt,
      borderColor: colors.status.success,
    },
    containerIncorrect: {
      backgroundColor: colors.status.errorAlt,
      borderColor: colors.status.error,
    },
    header: {
      padding: 16,
      alignItems: 'center',
    },
    headerCorrect: {
      backgroundColor: colors.status.success,
    },
    headerIncorrect: {
      backgroundColor: colors.status.error,
    },
    headerText: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text.primary,
    },
    containerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text.primary,
      textAlign: 'center',
      marginBottom: 8,
    },
  });
}

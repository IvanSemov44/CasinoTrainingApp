import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { calculateAccuracy } from '@utils/accuracy';

export interface ScoreAccuracyTextProps {
  correct: number;
  total: number;
  textStyle?: object;
  containerStyle?: object;
  compact?: boolean;
}

/**
 * Shared score + accuracy text renderer.
 * Keeps display format consistent across training surfaces.
 */
export function ScoreAccuracyText({
  correct,
  total,
  textStyle,
  containerStyle,
  compact = false,
}: ScoreAccuracyTextProps) {
  const styles = useThemedStyles(makeStyles);
  const accuracy = calculateAccuracy(correct, total);

  if (compact) {
    return (
      <Text style={[styles.text, textStyle]}>
        Score: {correct}/{total} ({accuracy}%)
      </Text>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>
        Score: {correct}/{total}
      </Text>
      <Text style={[styles.text, textStyle]}>Accuracy: {accuracy}%</Text>
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    text: {
      color: colors.text.secondary,
    },
  });
}

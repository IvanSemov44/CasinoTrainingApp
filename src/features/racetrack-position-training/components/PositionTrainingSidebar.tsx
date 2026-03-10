import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import PositionSidebarHeader from './PositionSidebarHeader';
import PositionSidebarFeedback from './PositionSidebarFeedback';
import type { PositionValidationResult, TrainingStats } from '../types';

export interface PositionTrainingSidebarProps {
  stats: TrainingStats;
  currentWinningNumber: number;
  result: PositionValidationResult | null;
  isProcessing: boolean;
  wheelPosition: number;
  accuracyColor: string;
  percentage: number;
  onSkip: () => void;
}

/**
 * Sidebar HUD for position training screen
 * Displays stats, target number, instructions, and feedback
 */
export function PositionTrainingSidebar({
  stats,
  currentWinningNumber,
  result,
  isProcessing,
  wheelPosition,
  accuracyColor,
  percentage,
  onSkip,
}: PositionTrainingSidebarProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <PositionSidebarHeader
          stats={stats}
          percentage={percentage}
          accuracyColor={accuracyColor}
          currentWinningNumber={currentWinningNumber}
        />

        <PositionSidebarFeedback
          result={result}
          wheelPosition={wheelPosition}
          isProcessing={isProcessing}
          onSkip={onSkip}
        />
      </ScrollView>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      width: 172,
      backgroundColor: colors.background.secondary,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
      overflow: 'hidden',
    },
    content: {
      padding: 12,
      paddingBottom: 24,
    },
  });
}

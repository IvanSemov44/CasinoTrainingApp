import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RouletteLayout from '@features/roulette-training/components/roulette-ui/RouletteLayout';
import SkeletonLoader from '@shared/SkeletonLoader';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import type { PlacedBet } from '@app-types/roulette.types';

interface ExerciseVisualReferenceProps {
  placedBets: PlacedBet[];
  cellSize: number;
  maxColumns: number;
  isLoading: boolean;
}

export default function ExerciseVisualReference({
  placedBets,
  cellSize,
  maxColumns,
  isLoading,
}: ExerciseVisualReferenceProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.layoutContainer}>
      <Text style={styles.layoutLabel}>Visual Reference:</Text>
      {isLoading ? (
        <View style={styles.layoutSkeletonContainer}>
          <SkeletonLoader width="100%" height={120} borderRadius={8} />
        </View>
      ) : (
        <ScrollView
          horizontal
          style={styles.layoutScrollView}
          contentContainerStyle={styles.layoutWrapper}
        >
          <RouletteLayout
            onNumberPress={() => {}}
            placedBets={placedBets}
            cellSize={cellSize}
            showOutsideBets={false}
            showColumnBets={false}
            maxColumns={maxColumns}
          />
        </ScrollView>
      )}
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    layoutContainer: {
      margin: 16,
      marginTop: 0,
    },
    layoutLabel: {
      fontSize: 16,
      color: colors.text.gold,
      marginBottom: 8,
      fontWeight: '600',
    },
    layoutScrollView: {
      backgroundColor: colors.background.darkGray,
      borderRadius: 8,
    },
    layoutWrapper: {
      alignItems: 'center',
      paddingVertical: 0,
      paddingHorizontal: 8,
    },
    layoutSkeletonContainer: {
      backgroundColor: colors.background.darkGray,
      borderRadius: 8,
      padding: 8,
    },
  });
}

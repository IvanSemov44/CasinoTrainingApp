import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

export interface SectorTrainingHeaderProps {
  correct: number;
  total: number;
  percentage: number;
  accuracyColor: string;
  currentWinningNumber: number;
}

/**
 * Header bar for sector training screen
 * Displays score, accuracy bar, and current target number
 */
export function SectorTrainingHeader({
  correct,
  total,
  percentage,
  accuracyColor,
  currentWinningNumber,
}: SectorTrainingHeaderProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.topBar}>
      <View style={styles.scoreDisplay}>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreText}>
            {correct}/{total}
          </Text>
          <Text style={[styles.scoreLabel, { color: accuracyColor }]}>{percentage}%</Text>
        </View>
        <View style={styles.accuracyBarBg}>
          <View
            style={[
              styles.accuracyBar,
              { width: `${percentage}%`, backgroundColor: accuracyColor },
            ]}
          />
        </View>
      </View>
      <View style={styles.targetDisplay}>
        <View style={styles.targetCircle}>
          <Text style={styles.targetNumber}>{currentWinningNumber}</Text>
        </View>
      </View>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    topBar: {
      flexDirection: 'column',
      backgroundColor: colors.background.secondary,
      paddingHorizontal: 6,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 12,
      borderLeftWidth: 1.5,
      borderLeftColor: colors.border.gold,
      width: 54,
    },
    scoreDisplay: {
      alignItems: 'center',
      gap: 4,
      flexDirection: 'column',
      transform: [{ rotate: '90deg' }],
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    scoreRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    scoreText: {
      fontSize: 14,
      fontWeight: '900',
      color: colors.text.gold,
      letterSpacing: 0.3,
    },
    scoreLabel: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.3,
    },
    accuracyBarBg: {
      width: 60,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: colors.background.tertiary,
      overflow: 'hidden',
    },
    accuracyBar: {
      height: 3,
      borderRadius: 1.5,
    },
    targetDisplay: {
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ rotate: '90deg' }],
    },
    targetCircle: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.text.gold,
      borderWidth: 2.5,
      borderColor: colors.border.gold,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.text.gold,
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 4,
    },
    targetNumber: {
      fontSize: 16,
      fontWeight: '900',
      color: colors.background.primary,
    },
  });
}

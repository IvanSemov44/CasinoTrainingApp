import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

export interface PositionWheelOrderCardProps {
  wheelOrder: number[];
}

/**
 * Reference card showing the racetrack wheel order
 */
export function PositionWheelOrderCard({ wheelOrder }: PositionWheelOrderCardProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wheel Order Reference:</Text>
      <Text style={styles.subtitle}>Numbers appear in this order around the wheel</Text>
      <View style={styles.wheelOrderContainer}>
        {wheelOrder.map((num, index) => (
          <View key={num} style={styles.wheelNumberBadge}>
            <Text style={styles.wheelNumberText}>{num}</Text>
            <Text style={styles.wheelPositionText}>{index + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
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
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.gold,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 13,
      color: colors.text.secondary,
      marginBottom: 12,
    },
    wheelOrderContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    wheelNumberBadge: {
      backgroundColor: colors.background.primary,
      borderRadius: 8,
      padding: 8,
      minWidth: 42,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    wheelNumberText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.gold,
    },
    wheelPositionText: {
      fontSize: 10,
      color: colors.text.muted,
      marginTop: 2,
    },
  });
}

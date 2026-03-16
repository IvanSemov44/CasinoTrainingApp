import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { ReferenceCard } from '@components/shared/ReferenceCard';
import type { AppColors } from '@styles/themes';

export interface PositionWheelOrderCardProps {
  wheelOrder: number[];
}

/**
 * Reference card showing the racetrack wheel order
 */
export function PositionWheelOrderCard({ wheelOrder }: PositionWheelOrderCardProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <ReferenceCard
      title="Wheel Order Reference:"
      subtitle="Numbers appear in this order around the wheel"
    >
      <View style={styles.wheelOrderContainer}>
        {wheelOrder.map((num, index) => (
          <View key={num} style={styles.wheelNumberBadge}>
            <Text style={styles.wheelNumberText}>{num}</Text>
            <Text style={styles.wheelPositionText}>{index + 1}</Text>
          </View>
        ))}
      </View>
    </ReferenceCard>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
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

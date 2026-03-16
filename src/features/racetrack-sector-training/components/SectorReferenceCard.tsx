import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { useTheme } from '@contexts/ThemeContext';
import { ReferenceCard } from '@components/shared/ReferenceCard';
import type { AppColors } from '@styles/themes';

export interface SectorReferenceCardProps {
  sectorOptions: Array<{ sector: string; name: string; numbers: number[] }>;
  sectorColors: Record<string, string>;
}

/**
 * Reference card showing all sector names and numbers
 */
export function SectorReferenceCard({ sectorOptions, sectorColors }: SectorReferenceCardProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <ReferenceCard title="Sector Reference:">
      {sectorOptions.map(option => (
        <View key={option.sector} style={styles.row}>
          <Text
            style={[styles.name, { color: sectorColors[option.sector] || colors.text.primary }]}
          >
            {option.name}:
          </Text>
          <Text style={styles.numbers}>{option.numbers.join(', ')}</Text>
        </View>
      ))}
    </ReferenceCard>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    name: {
      fontSize: 14,
      fontWeight: '600',
      width: 140,
    },
    numbers: {
      fontSize: 14,
      color: colors.text.secondary,
      flex: 1,
    },
  });
}

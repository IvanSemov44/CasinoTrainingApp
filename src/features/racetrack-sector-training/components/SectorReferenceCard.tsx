import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

export interface SectorReferenceCardProps {
  sectorOptions: Array<{ sector: string; name: string; numbers: number[] }>;
  sectorColors: Record<string, string>;
}

/**
 * Reference card showing all sector names and numbers
 */
export function SectorReferenceCard({ sectorOptions, sectorColors }: SectorReferenceCardProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sector Reference:</Text>
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
      marginBottom: 8,
    },
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

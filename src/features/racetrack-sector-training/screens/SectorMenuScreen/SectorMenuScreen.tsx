import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { SectorMode } from '../../types';
import { getSectorOptions } from '../../utils/validation';
import { SectorReferenceCard } from '../../components/SectorReferenceCard';
import { SectorInfoBox } from '../../components/SectorInfoBox';
import type { SectorMenuScreenProps } from './SectorMenuScreen.types';

interface ModeOption {
  mode: SectorMode;
  title: string;
  description: string;
  color: string;
}

// Accent colors for racetrack sectors - visual hierarchy indicators
const SECTOR_ACCENT_COLORS: Record<SectorMode, string> = {
  voisins: '#3b82f6',    // Blue
  tier: '#ef4444',       // Red
  orphelins: '#f59e0b',  // Amber
  zero: '#8b5cf6',       // Purple
  random: '#10b981',     // Green
};

const MODE_OPTIONS: ModeOption[] = [
  {
    mode: 'voisins',
    title: 'Voisins du Zéro',
    description: '17 numbers: 0, 2, 3, 4, 7, 12, 15, 18, 19, 21, 22, 25, 26, 28, 29, 32, 35',
    color: SECTOR_ACCENT_COLORS.voisins,
  },
  {
    mode: 'tier',
    title: 'Tier du Cylindre',
    description: '12 numbers: 5, 8, 10, 11, 13, 16, 23, 24, 27, 30, 33, 36',
    color: SECTOR_ACCENT_COLORS.tier,
  },
  {
    mode: 'orphelins',
    title: 'Orphelins',
    description: '8 numbers: 1, 6, 9, 14, 17, 20, 31, 34',
    color: SECTOR_ACCENT_COLORS.orphelins,
  },
  {
    mode: 'zero',
    title: 'Jeu Zéro',
    description: '7 numbers: 0, 3, 12, 15, 26, 32, 35',
    color: SECTOR_ACCENT_COLORS.zero,
  },
  {
    mode: 'random',
    title: 'Random Training',
    description: 'Practice all sectors randomly',
    color: SECTOR_ACCENT_COLORS.random,
  },
];

export default function SectorMenuScreen({ navigation }: SectorMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const handleModeSelect = (mode: SectorMode) => {
    navigation.navigate('SectorTraining', { mode });
  };

  const sectorOptions = getSectorOptions();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Racetrack Sectors</Text>
        <Text style={styles.subtitle}>
          Learn which sector contains each winning number
        </Text>
      </View>

      <SectorReferenceCard sectorOptions={sectorOptions} sectorColors={SECTOR_ACCENT_COLORS} />

      <View style={styles.modesContainer}>
        <Text style={styles.sectionTitle}>Select Training Mode:</Text>
        {MODE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.mode}
            style={styles.modeCard}
            onPress={() => handleModeSelect(option.mode)}
            activeOpacity={0.75}
          >
            <View style={[styles.accentBar, { backgroundColor: option.color }]} />
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.modeTitle}>{option.title}</Text>
                <Text style={styles.arrow}>›</Text>
              </View>
              <Text style={styles.modeDescription}>{option.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <SectorInfoBox />
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    contentContainer: {
      padding: 24,
      paddingBottom: 32,
    },
    header: {
      marginBottom: 24,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 4,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    modesContainer: {
      gap: 16,
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 8,
    },
    modeCard: {
      flexDirection: 'row',
      backgroundColor: colors.background.secondary,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border.primary,
      overflow: 'hidden',
      marginBottom: 12,
    },
    accentBar: {
      width: 4,
    },
    cardBody: {
      flex: 1,
      padding: 14,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    modeTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.primary,
      flex: 1,
    },
    arrow: {
      fontSize: 20,
      color: colors.text.muted,
    },
    modeDescription: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 18,
    },
  });
}

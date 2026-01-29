import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { SectorType, DifficultyLevel } from '../types';
import { SECTOR_NAMES, SECTOR_POSITIONS } from '../constants/sectors';

export default function SectorSelectionScreen({ route, navigation }: any) {
  const { difficulty } = route.params;

  const handleSectorSelect = (sector: SectorType) => {
    navigation.navigate('CashConversionTraining', { difficulty, sector });
  };

  const sectors: { key: SectorType; icon: string }[] = [
    { key: 'tier', icon: '🎯' },
    { key: 'orphelins', icon: '🎪' },
    { key: 'voisins', icon: '🎭' },
    { key: 'zero', icon: '⭕' },
    { key: 'neighbors', icon: '👥' },
    { key: 'random', icon: '🎲' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Select Sector</Text>
      <Text style={styles.subtitle}>Difficulty: {difficulty.toUpperCase()}</Text>

      {sectors.map((sector) => (
        <TouchableOpacity
          key={sector.key}
          style={styles.card}
          onPress={() => handleSectorSelect(sector.key)}
        >
          <Text style={styles.cardIcon}>{sector.icon}</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              {sector.key === 'random' ? 'Random' : SECTOR_NAMES[sector.key as Exclude<SectorType, 'random'>]}
            </Text>
            {sector.key !== 'random' && (
              <Text style={styles.cardDescription}>
                {SECTOR_POSITIONS[sector.key as Exclude<SectorType, 'random'>]} positions
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text.gold,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 40,
    marginRight: SPACING.md,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
});

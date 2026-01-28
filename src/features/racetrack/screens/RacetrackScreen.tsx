import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../../roulette-training/constants/theme';

export default function RacetrackScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Racetrack</Text>
        <Text style={styles.description}>
          The racetrack (or "announced bets" area) is a special section on the roulette table
          that allows players to place bets on specific sections of the roulette wheel.
        </Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Common Racetrack Bets:</Text>
          <View style={styles.betList}>
            <Text style={styles.betItem}>• Voisins du Zéro (Neighbors of Zero)</Text>
            <Text style={styles.betItem}>• Tiers du Cylindre (Third of the Wheel)</Text>
            <Text style={styles.betItem}>• Orphelins (Orphans)</Text>
            <Text style={styles.betItem}>• Zero Game</Text>
            <Text style={styles.betItem}>• Neighbors Bets</Text>
          </View>
        </View>

        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            🏁 Racetrack betting feature coming soon!
          </Text>
          <Text style={styles.placeholderSubtext}>
            This section will include interactive training for racetrack bets and announced bets.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl * 1.5,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    lineHeight: 24,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: BORDERS.radius.md,
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.border.gold,
    marginBottom: SPACING.xl,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.md,
  },
  betList: {
    paddingLeft: SPACING.sm,
  },
  betItem: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    lineHeight: 22,
  },
  placeholderContainer: {
    backgroundColor: COLORS.background.tertiary,
    padding: SPACING.xl,
    borderRadius: BORDERS.radius.md,
    borderWidth: BORDERS.width.thin,
    borderColor: COLORS.border.primary,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  placeholderText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text.gold,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

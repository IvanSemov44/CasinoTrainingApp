import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../../roulette-training/constants/theme';
import RacetrackLayout from '../components/RacetrackLayout';

const { width: screenWidth } = Dimensions.get('window');

export default function RacetrackScreen() {
  const racetrackWidth = Math.min(screenWidth - 32, 800);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Racetrack</Text>
        <Text style={styles.description}>
          The racetrack layout shows numbers in their wheel order, allowing for announced bets.
        </Text>
        
        <View style={styles.racetrackContainer}>
          <RacetrackLayout width={racetrackWidth} />
        </View>

        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Betting Sections:</Text>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFD700' }]} />
            <Text style={styles.legendText}>
              <Text style={styles.legendBold}>Tier (Tiers du Cylindre)</Text> - 12 numbers opposite zero
            </Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFD700' }]} />
            <Text style={styles.legendText}>
              <Text style={styles.legendBold}>Orphelins</Text> - 8 numbers in two slices
            </Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFD700' }]} />
            <Text style={styles.legendText}>
              <Text style={styles.legendBold}>Voisins (Voisins du Zéro)</Text> - 17 numbers around zero
            </Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFD700' }]} />
            <Text style={styles.legendText}>
              <Text style={styles.legendBold}>Zero Game</Text> - 7 numbers closest to zero
            </Text>
          </View>
        </View>

        <View style={styles.colorLegend}>
          <Text style={styles.legendTitle}>Number Colors:</Text>
          <View style={styles.colorRow}>
            <View style={styles.colorItem}>
              <View style={[styles.colorBox, { backgroundColor: '#FF0000' }]} />
              <Text style={styles.colorText}>Red</Text>
            </View>
            <View style={styles.colorItem}>
              <View style={[styles.colorBox, { backgroundColor: '#000000' }]} />
              <Text style={styles.colorText}>Black</Text>
            </View>
            <View style={styles.colorItem}>
              <View style={[styles.colorBox, { backgroundColor: '#4EA72E' }]} />
              <Text style={styles.colorText}>Zero</Text>
            </View>
          </View>
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
    padding: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl * 1.5,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    lineHeight: 22,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  racetrackContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  legendContainer: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: BORDERS.radius.md,
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.border.gold,
    marginBottom: SPACING.lg,
  },
  legendTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
    marginTop: 6,
  },
  legendText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    lineHeight: 22,
  },
  legendBold: {
    fontWeight: 'bold',
    color: COLORS.text.gold,
  },
  colorLegend: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: BORDERS.radius.md,
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.border.gold,
    marginBottom: SPACING.xl,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorItem: {
    alignItems: 'center',
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: SPACING.xs,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  colorText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.primary,
  },
});

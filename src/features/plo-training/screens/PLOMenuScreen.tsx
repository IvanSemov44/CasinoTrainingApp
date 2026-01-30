import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';

export default function PLOMenuScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Pot Limit Omaha Training</Text>
      <Text style={styles.subtitle}>Select training mode</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('PLOGameTraining')}
      >
        <Text style={styles.cardIcon}>🃏</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Game Training</Text>
          <Text style={styles.cardDescription}>Practice PLO gameplay scenarios</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('PLOTraining', { mode: 'basic' })}
      >
        <Text style={styles.cardIcon}>🎮</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Basic Training</Text>
          <Text style={styles.cardDescription}>Learn the fundamentals</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('PLOTraining', { mode: 'advanced' })}
      >
        <Text style={styles.cardIcon}>🎯</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Advanced Training</Text>
          <Text style={styles.cardDescription}>Master complex scenarios</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('PLOPotCalculation')}
      >
        <Text style={styles.cardIcon}>💰</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Pot Calculation</Text>
          <Text style={styles.cardDescription}>Practice dealer pot calculations</Text>
        </View>
      </TouchableOpacity>
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

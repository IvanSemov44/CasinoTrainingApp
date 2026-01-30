import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';

export default function PLOTrainingScreen({ route }: any) {
  const { mode } = route.params || { mode: 'basic' };
  const [score, setScore] = useState(0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.modeText}>{mode.toUpperCase()} MODE</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          PLO Training Screen
        </Text>
        <Text style={styles.placeholderSubtext}>
          Training content will be implemented here
        </Text>
      </View>
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
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modeText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  placeholder: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.xl,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.gold,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});

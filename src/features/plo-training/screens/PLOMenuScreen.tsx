import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import type { PLOStackParamList } from '../navigation';
import { DIFFICULTY_INFO } from '../constants/gameScenarios';
import type { PLODifficulty } from '../types';

type PLOMenuScreenProps = StackScreenProps<PLOStackParamList, 'PLOMenu'>;

const DIFFICULTIES: PLODifficulty[] = ['easy', 'medium', 'advanced'];

export default function PLOMenuScreen({ navigation }: PLOMenuScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Pot Limit Omaha Training</Text>
      <Text style={styles.subtitle}>Select difficulty level</Text>

      {DIFFICULTIES.map((difficulty) => {
        const info = DIFFICULTY_INFO[difficulty];
        return (
          <TouchableOpacity
            key={difficulty}
            style={[styles.card, styles[`${difficulty}Card`]]}
            onPress={() => navigation.navigate('PLOGameTraining', { difficulty })}
          >
            <Text style={styles.cardIcon}>{info.icon}</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{info.label}</Text>
              <Text style={styles.cardDescription}>{info.description}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  easyCard: {
    borderColor: '#4CAF50',
  },
  mediumCard: {
    borderColor: '#FF9800',
  },
  advancedCard: {
    borderColor: '#f44336',
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
    fontSize: 14,
    color: COLORS.text.secondary,
  },
});

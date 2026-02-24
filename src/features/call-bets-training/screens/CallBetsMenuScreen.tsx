import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { CallBetMode } from '../types';
import type { CallBetsStackParamList } from '../navigation';

type Props = StackScreenProps<CallBetsStackParamList, 'CallBetsMenu'>;

interface ModeOption {
  mode: CallBetMode;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const MODE_OPTIONS: ModeOption[] = [
  {
    mode: 'tier',
    title: 'Tier du Cylindre',
    description: '6 split bets on the wheel opposite to zero',
    icon: '🎯',
    color: '#ef4444',
  },
  {
    mode: 'orphelins',
    title: 'Orphelins',
    description: '1 straight + 4 splits on the orphan numbers',
    icon: '🎲',
    color: '#f59e0b',
  },
  {
    mode: 'voisins',
    title: 'Voisins du Zéro',
    description: '9 bets covering neighbors of zero',
    icon: '👥',
    color: '#3b82f6',
  },
  {
    mode: 'zero',
    title: 'Jeu Zéro',
    description: '1 straight + 3 splits close to zero',
    icon: '0️⃣',
    color: '#8b5cf6',
  },
  {
    mode: 'random',
    title: 'Random Training',
    description: 'Practice all call bets randomly',
    icon: '🎰',
    color: '#10b981',
  },
];

export default function CallBetsMenuScreen({ navigation }: Props) {
  const handleModeSelect = (mode: CallBetMode) => {
    navigation.navigate('CallBetsTraining', { mode });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Call Bets Training</Text>
        <Text style={styles.subtitle}>
          Learn where to place chips for each racetrack bet
        </Text>
      </View>

      <View style={styles.modesContainer}>
        {MODE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.mode}
            style={[styles.modeCard, { borderColor: option.color }]}
            onPress={() => handleModeSelect(option.mode)}
            activeOpacity={0.7}
          >
            <View style={styles.modeHeader}>
              <Text style={styles.modeIcon}>{option.icon}</Text>
              <Text style={[styles.modeTitle, { color: option.color }]}>
                {option.title}
              </Text>
            </View>
            <Text style={styles.modeDescription}>{option.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How to Play:</Text>
        <Text style={styles.infoText}>1. Select a training mode</Text>
        <Text style={styles.infoText}>2. Place chips on the roulette layout</Text>
        <Text style={styles.infoText}>3. Click &quot;Check Answer&quot; when ready</Text>
        <Text style={styles.infoText}>4. Review feedback and try the next challenge</Text>
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
    paddingBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  modesContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  modeCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    borderWidth: 3,
    padding: SPACING.md,
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  modeIcon: {
    fontSize: 32,
    marginRight: SPACING.sm,
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  modeDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 48,
  },
  infoBox: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.gold,
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
});

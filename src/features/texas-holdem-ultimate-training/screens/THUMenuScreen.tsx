import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import type { THUStackParamList } from '../navigation';
import type { THUDrillType } from '../types';

type THUMenuScreenProps = StackScreenProps<THUStackParamList, 'THUMenu'>;

interface DrillInfo {
  drillType: THUDrillType;
  label: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

const DRILLS: DrillInfo[] = [
  {
    drillType: 'hand-recognition',
    label: 'Hand Recognition',
    description: 'Identify the best 5-card hand from 2 hole cards + 5 community cards.',
    difficulty: 'easy',
  },
  {
    drillType: 'dealer-qualification',
    label: 'Dealer Qualification',
    description: 'Does the dealer qualify? Needs One Pair or better.',
    difficulty: 'easy',
  },
  {
    drillType: 'basic-outcome',
    label: 'Basic Outcome',
    description: 'Who wins? Dealer no-qualify → Ante returned. Identify the correct outcome.',
    difficulty: 'easy',
  },
  {
    drillType: 'raise-sizing',
    label: 'Raise Sizing',
    description: 'Pre-flop: 3× or 4×. Flop: 2×. Turn+River: 1×. Calculate the Play bet.',
    difficulty: 'medium',
  },
  {
    drillType: 'blind-payout',
    label: 'Blind Payout',
    description: 'Blind pays when player wins ≥ Straight. RF=500:1, SF=50:1, FoaK=10:1, FH=3:1, Flush=3:2, Straight=1:1.',
    difficulty: 'medium',
  },
  {
    drillType: 'trips-plus-payout',
    label: 'Trips Plus Payout',
    description: 'Independent side bet. ToaK=3:1, Straight=4:1, Flush=7:1, FH=8:1, FoaK=30:1, SF=40:1, RF=50:1.',
    difficulty: 'medium',
  },
  {
    drillType: 'no-qualify-scenario',
    label: 'No-Qualify Scenario',
    description: 'Ante is ALWAYS returned when dealer doesn\'t qualify — even if dealer wins comparison.',
    difficulty: 'medium',
  },
  {
    drillType: 'blind-push',
    label: 'Blind Push Rule',
    description: 'Player wins with less than Straight → Blind pushes (returned). Not collected, not paid.',
    difficulty: 'medium',
  },
  {
    drillType: 'blind-no-qualify',
    label: 'Blind + No Qualify',
    description: 'Dealer doesn\'t qualify but player wins with Straight — Blind still pays 1:1. Dealer qualification never affects Blind.',
    difficulty: 'advanced',
  },
  {
    drillType: 'full-outcome',
    label: 'Full Outcome',
    description: 'Resolve all bets: Ante, Blind, Play, and Trips Plus simultaneously across complex scenarios.',
    difficulty: 'advanced',
  },
];

const DIFFICULTY_COLOR: Record<DrillInfo['difficulty'], string> = {
  easy:     '#4CAF50',
  medium:   '#FF9800',
  advanced: '#f44336',
};

export default function THUMenuScreen({ navigation }: THUMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Texas Hold'em Ultimate</Text>
        <Text style={styles.subtitle}>Select a drill type</Text>
      </View>

      {DRILLS.map(drill => (
        <TouchableOpacity
          key={drill.drillType}
          style={styles.card}
          onPress={() => navigation.navigate('THUDrill', { drillType: drill.drillType })}
          activeOpacity={0.75}
        >
          <View style={[styles.accentBar, { backgroundColor: DIFFICULTY_COLOR[drill.difficulty] }]} />
          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{drill.label}</Text>
              <View style={[styles.badge, { backgroundColor: DIFFICULTY_COLOR[drill.difficulty] + '22' }]}>
                <Text style={[styles.badgeText, { color: DIFFICULTY_COLOR[drill.difficulty] }]}>
                  {drill.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.cardDesc}>{drill.description}</Text>
            <Text style={styles.cardArrow}>›</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary },
    content: { padding: 20, paddingBottom: 40 },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 26,
      fontWeight: '800',
      color: colors.text.gold,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      marginBottom: 10,
      overflow: 'hidden',
    },
    accentBar: {
      width: 4,
    },
    cardBody: {
      flex: 1,
      padding: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text.primary,
      flex: 1,
      marginRight: 8,
    },
    badge: {
      borderRadius: 6,
      paddingHorizontal: 7,
      paddingVertical: 2,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    cardDesc: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 19,
      marginBottom: 8,
    },
    cardArrow: {
      fontSize: 20,
      color: colors.text.muted,
      textAlign: 'right',
    },
  });
}

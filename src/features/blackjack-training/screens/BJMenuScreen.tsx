import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import type { BJStackParamList } from '../navigation';
import type { BJDrillType } from '../types';

type BJMenuScreenProps = StackScreenProps<BJStackParamList, 'BJMenu'>;

interface DrillInfo {
  drillType: BJDrillType;
  label: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

const DRILLS: DrillInfo[] = [
  {
    drillType: 'soft-hand-recognition',
    label: 'Soft Hand Announcement',
    description: 'Announce the correct hand total for soft hands: "A+5 = 6 or 16".',
    difficulty: 'easy',
  },
  {
    drillType: 'dealer-action',
    label: 'Dealer Action',
    description: 'Hit or stand? Dealer stands on ALL 17s, including soft 17 (A+6).',
    difficulty: 'easy',
  },
  {
    drillType: 'hand-comparison',
    label: 'Hand Comparison',
    description: 'Compare player and dealer hands — who wins? Natural BJ beats 21.',
    difficulty: 'easy',
  },
  {
    drillType: 'bj-payout',
    label: 'Blackjack Payout (3:2)',
    description: 'Calculate the 3:2 payout for Natural Blackjack on even bets.',
    difficulty: 'medium',
  },
  {
    drillType: 'side-bet-payout',
    label: 'Side Bet Payout',
    description: 'BJ Side Bet pays 15:1. Pair Side Bet pays 11:1. Independent of the main hand.',
    difficulty: 'medium',
  },
  {
    drillType: 'insurance-timing',
    label: 'Insurance & Ace Bet Timing',
    description: 'Ace → offer Insurance (2:1). 10/J/Q/K → player may request Ace Bet (11:1). 2–9 → no action.',
    difficulty: 'medium',
  },
  {
    drillType: 'surrender',
    label: 'Surrender',
    description: 'Return half the bet. Only valid before the player draws any additional card.',
    difficulty: 'medium',
  },
  {
    drillType: 'split-scenario',
    label: 'Split Rules',
    description: 'Same RANK can split (J+Q cannot — different ranks). Split Aces: one card each.',
    difficulty: 'medium',
  },
  {
    drillType: 'super-seven',
    label: 'Super Seven',
    description: '1 Seven=3:1 · 2 Diff Suit=30:1 · 2 Same Suit=100:1 · 3 Mixed=500:1 · 3 Same=5000:1',
    difficulty: 'advanced',
  },
  {
    drillType: 'odd-bj-payout',
    label: 'Odd Bet BJ Payout (3:2)',
    description: 'Fractional 3:2 payouts for odd bets: €15→€22.50, €25→€37.50, €35→€52.50…',
    difficulty: 'advanced',
  },
];

const DIFFICULTY_COLOR: Record<DrillInfo['difficulty'], string> = {
  easy:     '#4CAF50',
  medium:   '#FF9800',
  advanced: '#f44336',
};

export default function BJMenuScreen({ navigation }: BJMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Blackjack</Text>
        <Text style={styles.subtitle}>Select a drill type</Text>
      </View>

      {DRILLS.map(drill => (
        <TouchableOpacity
          key={drill.drillType}
          style={styles.card}
          onPress={() => navigation.navigate('BJDrill', { drillType: drill.drillType })}
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
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    content: {
      padding: 20,
      paddingBottom: 40,
    },
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

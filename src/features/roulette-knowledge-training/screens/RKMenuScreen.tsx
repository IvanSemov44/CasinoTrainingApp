import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import type { RKStackParamList } from '../navigation';
import type { RKDrillType } from '../types';

type RKMenuScreenProps = StackScreenProps<RKStackParamList, 'RKMenu'>;

interface DrillInfo {
  drillType: RKDrillType;
  label: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

const DRILLS: DrillInfo[] = [
  {
    drillType: 'outside-bet-payout',
    label: 'Outside Bet Payout',
    description: 'Calculate even-money (1:1) and 2:1 outside bet payouts for Red, Column, Dozen, and more.',
    difficulty: 'easy',
  },
  {
    drillType: 'dozen-vs-column',
    label: 'Dozen vs Column',
    description: 'Which numbers are in Dozen 1? What does Column 2 cover? Both pay 2:1 — know the difference.',
    difficulty: 'easy',
  },
  {
    drillType: 'zero-rule',
    label: 'Zero Rule',
    description: '0 wins → ALL outside bets lose. No La Partage, no En Prison. Inside bets on 0 still pay.',
    difficulty: 'easy',
  },
  {
    drillType: 'outside-bet-recognition',
    label: 'Outside Bet Recognition',
    description: 'Identify the bet type from its description — which numbers it covers and what it pays.',
    difficulty: 'easy',
  },
  {
    drillType: 'bet-limits',
    label: 'Bet Limits',
    description: 'Standard/high table limits: inside max €200 (both tables), Dozen/Column max €500, even-money max €1,000.',
    difficulty: 'easy',
  },
  {
    drillType: 'announced-chip-count',
    label: 'Announced Bet Chip Count',
    description: 'Voisins=9, Tiers=6, Orphelins=5, Jeu Zéro=4, Neighbors=5. Know all five chip counts.',
    difficulty: 'medium',
  },
  {
    drillType: 'announced-numbers',
    label: 'Announced Bet Coverage',
    description: 'Voisins=17 numbers, Tiers=12, Orphelins=8, Jeu Zéro=7, Neighbors=5. Numbers covered by each bet.',
    difficulty: 'medium',
  },
  {
    drillType: 'announced-composition',
    label: 'Announced Bet Composition',
    description: 'What individual bets (splits, streets, corners, straights) make up each announced bet?',
    difficulty: 'medium',
  },
  {
    drillType: 'mixed-outside-payout',
    label: 'Mixed Outside Payout',
    description: 'Two outside bets on the same winning number — calculate the combined total payout.',
    difficulty: 'medium',
  },
  {
    drillType: 'announced-inside-mixed',
    label: 'Announced Bet Net Win',
    description: 'Calculate net win from an announced bet: winning component payout minus losing chips collected.',
    difficulty: 'advanced',
  },
];

const DIFFICULTY_COLOR: Record<DrillInfo['difficulty'], string> = {
  easy:     '#4CAF50',
  medium:   '#FF9800',
  advanced: '#f44336',
};

export default function RKMenuScreen({ navigation }: RKMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Roulette Knowledge</Text>
        <Text style={styles.subtitle}>Select a drill type</Text>
      </View>

      {DRILLS.map(drill => (
        <TouchableOpacity
          key={drill.drillType}
          style={styles.card}
          onPress={() => navigation.navigate('RKDrill', { drillType: drill.drillType })}
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

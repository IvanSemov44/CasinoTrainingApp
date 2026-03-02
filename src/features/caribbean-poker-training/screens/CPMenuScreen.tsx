import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import type { CPStackParamList } from '../navigation';
import type { CPDrillType } from '../types';

type CPMenuScreenProps = StackScreenProps<CPStackParamList, 'CPMenu'>;

interface DrillInfo {
  drillType: CPDrillType;
  label: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

const DRILLS: DrillInfo[] = [
  {
    drillType: 'hand-recognition',
    label: 'Hand Recognition',
    description: 'Identify the 5-card poker hand: Royal Flush, Straight Flush, Four of a Kind, etc.',
    difficulty: 'easy',
  },
  {
    drillType: 'dealer-qualification',
    label: 'Dealer Qualification',
    description: 'Does the dealer qualify? Needs Ace-King or better (pair, or high-card with both A and K).',
    difficulty: 'easy',
  },
  {
    drillType: 'basic-outcome',
    label: 'Basic Outcome',
    description: 'What is the result? No qualify / Player wins / Dealer wins / Tie.',
    difficulty: 'easy',
  },
  {
    drillType: 'call-bet-payout',
    label: 'Call Bet Payout',
    description: 'Calculate the Call bet payout. Call = 2× Ante; multiplier applied to the Call bet amount.',
    difficulty: 'medium',
  },
  {
    drillType: 'bonus-payout',
    label: 'Bonus Payout',
    description: 'Fixed €1 side bet. Pays RF=€5000, SF=€1000, FoaK=€300, FH=€150, Flush=€100.',
    difficulty: 'medium',
  },
  {
    drillType: 'bonus-after-swap',
    label: 'Bonus After Swap',
    description: 'Player swapped a card → ALL Bonus payouts are halved. How much does it pay now?',
    difficulty: 'medium',
  },
  {
    drillType: 'no-qualify-outcome',
    label: 'No Qualify Outcome',
    description: 'Dealer does not qualify → Ante 1:1, Call returned. Call does NOT pay the hand table.',
    difficulty: 'medium',
  },
  {
    drillType: 'bonus-on-fold',
    label: 'Bonus on Fold',
    description: 'Key rule: Bonus pays even if the player folded their Ante. Test this common mistake.',
    difficulty: 'advanced',
  },
  {
    drillType: 'swap-procedure',
    label: 'Swap Procedure',
    description: 'Two-phase swap mechanic: fee (1× Ante), Phase 2 order, Bonus independence after swap.',
    difficulty: 'advanced',
  },
];

const DIFFICULTY_COLOR: Record<DrillInfo['difficulty'], string> = {
  easy:     '#4CAF50',
  medium:   '#FF9800',
  advanced: '#f44336',
};

export default function CPMenuScreen({ navigation }: CPMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Caribbean Poker</Text>
        <Text style={styles.subtitle}>Select a drill type</Text>
      </View>

      {DRILLS.map(drill => (
        <TouchableOpacity
          key={drill.drillType}
          style={styles.card}
          onPress={() => navigation.navigate('CPDrill', { drillType: drill.drillType })}
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

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import { colorWithOpacity } from '@styles';
import type { TCPStackParamList } from '../navigation';
import type { TCPDrillType } from '../types';

type TCPMenuScreenProps = StackScreenProps<TCPStackParamList, 'TCPMenu'>;

interface DrillInfo {
  drillType: TCPDrillType;
  label: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

const DRILLS: DrillInfo[] = [
  {
    drillType: 'hand-recognition',
    label: 'Hand Recognition',
    description: 'Identify the hand rank: Straight Flush, Three of a Kind, Straight, Flush, Pair, or High Card.',
    difficulty: 'easy',
  },
  {
    drillType: 'dealer-qualification',
    label: 'Dealer Qualification',
    description: 'Does the dealer qualify? Dealer needs Queen-high or better.',
    difficulty: 'easy',
  },
  {
    drillType: 'pair-plus-payout',
    label: 'Pair Plus Payout',
    description: 'Calculate the Pair Plus payout: SF 40:1 · Three of a Kind 30:1 · Straight 6:1 · Flush 3:1 · Pair 1:1.',
    difficulty: 'medium',
  },
  {
    drillType: 'ante-bonus',
    label: 'Ante Bonus',
    description: 'Calculate the Ante Bonus: SF 4:1 · Three of a Kind 3:1 · Straight 1:1. Pays even when player loses.',
    difficulty: 'medium',
  },
  {
    drillType: 'full-outcome',
    label: 'Full Outcome',
    description: 'Decide what happens to the Ante and Play bets after both hands are revealed.',
    difficulty: 'advanced',
  },
];

export default function TCPMenuScreen({ navigation }: TCPMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const difficultyColors: Record<DrillInfo['difficulty'], string> = {
    easy: colors.difficulty.easy,
    medium: colors.difficulty.medium,
    advanced: colors.difficulty.hard,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Three Card Poker</Text>
        <Text style={styles.subtitle}>Select a drill type</Text>
      </View>

      {DRILLS.map(drill => (
        <TouchableOpacity
          key={drill.drillType}
          style={styles.card}
          onPress={() => navigation.navigate('TCPDrill', { drillType: drill.drillType })}
          activeOpacity={0.75}
        >
          <View style={[styles.accentBar, { backgroundColor: difficultyColors[drill.difficulty] }]} />
          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{drill.label}</Text>
              <View style={[styles.badge, { backgroundColor: colorWithOpacity(difficultyColors[drill.difficulty], 0.13) }]}>
                <Text style={[styles.badgeText, { color: difficultyColors[drill.difficulty] }]}>
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

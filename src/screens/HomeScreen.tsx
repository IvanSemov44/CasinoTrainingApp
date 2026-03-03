import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  useWindowDimensions, Pressable,
} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import type { NavigationProp } from '../types/navigation.types';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Route = keyof Omit<RootStackParamList, 'Home' | 'Progress'>;

type GameCard = {
  route: Route;
  title: string;
  emoji: string;
  tags: string;
};

interface GameEntry {
  route: Route;
  emoji: string;
  title: string;
  tags: string;
}

const CATEGORIES: { label: string; games: GameEntry[] }[] = [
  {
    label: 'ROULETTE',
    games: [
      { route: 'RouletteExercises',                title: 'Roulette Training',       emoji: '🎰', tags: 'Payouts · Splits · Streets' },
      { route: 'CallBetsMenu',                     title: 'Call Bets',               emoji: '📣', tags: 'Voisins · Tiers · Orphelins' },
      { route: 'SectorTraining',                   title: 'Sector Training',         emoji: '🎯', tags: 'Number → Sector' },
      { route: 'PositionTraining',                 title: 'Position Training',       emoji: '📍', tags: 'Number → Position' },
      { route: 'CashConversionDifficultySelection',title: 'Cash Conversion',         emoji: '💰', tags: 'Chip exchange' },
      { route: 'RKMenu',                           title: 'Roulette Knowledge',      emoji: '📚', tags: 'Rules · Limits · Announced' },
    ],
  },
  {
    label: 'POKER',
    games: [
      { route: 'PLOMenu',  title: 'Pot Limit Omaha',       emoji: '♠️', tags: 'Dealing · Pot calc' },
      { route: 'TCPMenu',  title: 'Three Card Poker',      emoji: '🃏', tags: 'Qualify · Payouts' },
      { route: 'BJMenu',   title: 'Blackjack',             emoji: '🂡', tags: 'Payout · Insurance · 3:2' },
      { route: 'CPMenu',   title: 'Caribbean Poker',       emoji: '🌴', tags: 'Swap · Bonus · A-K' },
      { route: 'THUMenu',  title: "Texas Hold'em Ultimate",emoji: '🤠', tags: 'Blind · Trips · Raise' },
    ],
  },
];

export default function HomeScreen({ navigation }: { navigation: NavigationProp<keyof RootStackParamList> }) {
  const { colors, themeId, toggleTheme } = useTheme();
  const { width } = useWindowDimensions();

  const cardWidth = useMemo(() => {
    const gutter = 20;
    const gap = 10;
    return Math.floor((width - gutter * 2 - gap) / 2);
  }, [width]);

  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Casino Dealer</Text>
          <Text style={styles.appSubtitle}>Training Academy</Text>
        </View>
        <Pressable style={styles.themeToggle} onPress={toggleTheme}>
          <Text style={styles.themeToggleText}>
            {themeId === 'midnight' ? '🟢' : '🌑'}
          </Text>
          <Text style={styles.themeToggleLabel}>
            {themeId === 'midnight' ? 'Casino' : 'Midnight'}
          </Text>
        </Pressable>
      </View>

      {/* ── Divider ─────────────────────────────────────────────────── */}
      <View style={styles.divider} />

      {/* ── Category sections ───────────────────────────────────────── */}
      {CATEGORIES.map(cat => (
        <View key={cat.label} style={styles.section}>
          <Text style={styles.sectionLabel}>{cat.label}</Text>
          <View style={styles.grid}>
            {cat.games.map(g => (
              <TouchableOpacity
                key={g.route}
                style={[styles.card, { width: cardWidth }]}
                onPress={() => navigation.navigate(g.route as any)}
                activeOpacity={0.75}
              >
                <Text style={styles.cardEmoji}>{g.emoji}</Text>
                <Text style={styles.cardTitle}>{g.title}</Text>
                <Text style={styles.cardTags}>{g.tags}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* ── Progress button ──────────────────────────────────────────── */}
      <TouchableOpacity
        style={styles.progressBtn}
        onPress={() => navigation.navigate('Progress')}
        activeOpacity={0.8}
      >
        <Text style={styles.progressBtnText}>📊  My Progress</Text>
      </TouchableOpacity>
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
      paddingHorizontal: 20,
      paddingTop: 28,
      paddingBottom: 40,
    },

    // ── Header
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    appTitle: {
      fontSize: 30,
      fontWeight: '800',
      color: colors.text.gold,
      letterSpacing: 0.3,
      lineHeight: 34,
    },
    appSubtitle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text.secondary,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      marginTop: 2,
    },
    themeToggle: {
      alignItems: 'center',
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.border.primary,
      gap: 2,
    },
    themeToggleText: { fontSize: 18 },
    themeToggleLabel: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.text.secondary,
      letterSpacing: 0.5,
    },

    divider: {
      height: 1,
      backgroundColor: colors.border.primary,
      marginBottom: 24,
    },

    // ── Sections
    section: {
      marginBottom: 28,
    },
    sectionLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.text.muted,
      letterSpacing: 1.8,
      marginBottom: 12,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },

    // ── Game card
    card: {
      backgroundColor: colors.background.secondary,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border.primary,
      padding: 16,
      minHeight: 110,
      justifyContent: 'flex-end',
    },
    cardEmoji: {
      fontSize: 28,
      marginBottom: 8,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.primary,
      lineHeight: 18,
      marginBottom: 4,
    },
    cardTags: {
      fontSize: 11,
      color: colors.text.muted,
      lineHeight: 15,
    },

    // ── Progress button
    progressBtn: {
      backgroundColor: colors.background.secondary,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border.gold,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 4,
    },
    progressBtnText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.gold,
    },
  });
}

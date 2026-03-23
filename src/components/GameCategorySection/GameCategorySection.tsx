import React, { useMemo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { GameCard } from '@components/GameCard';
import { useRouter } from 'expo-router';
import { CATEGORIES } from './navigation.constants';
import type { Route } from './navigation.constants';

export function GameCategorySection() {
  const { width } = useWindowDimensions();

  const cardWidth = useMemo(() => {
    const gutter = 20;
    const gap = 10;
    return Math.floor((width - gutter * 2 - gap) / 2);
  }, [width]);
  const router = useRouter();

  const routeToPath: Record<string, string> = {
    RouletteExercises: '/roulette',
    SectorTraining: '/racetrack-sector',
    PositionTraining: '/racetrack-position',
    CashConversionDifficultySelection: '/cash-conversion',
    RKMenu: '/roulette-knowledge',
    TCPMenu: '/tcp',
    BJMenu: '/blackjack',
    CPMenu: '/cp',
    THUMenu: '/thu',
    CallBetsMenu: '/call-bets',
    PLOMenu: '/plo',
  };

  const handleNavigate = (route: Route) => {
    const path = routeToPath[route];
    if (path) router.push(path);
  };
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.section}>
      {CATEGORIES.map(category => (
        <React.Fragment key={category.label}>
          <Text style={styles.sectionLabel}>{category.label}</Text>
          <View style={styles.grid}>
            {category.games.map(game => (
              <GameCard
                key={game.route}
                emoji={game.emoji}
                title={game.title}
                tags={game.tags}
                width={cardWidth}
                onPress={() => handleNavigate(game.route)}
              />
            ))}
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
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
  });
}

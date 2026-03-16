import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import GameCard from './GameCard';
import type { GameCategory, Route } from '@constants/navigation.constants';

interface GameCategorySectionProps {
  category: GameCategory;
  cardWidth: number;
  onSelectGame: (route: Route) => void;
}

export default function GameCategorySection({
  category,
  cardWidth,
  onSelectGame,
}: GameCategorySectionProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{category.label}</Text>
      <View style={styles.grid}>
        {category.games.map(game => (
          <GameCard
            key={game.route}
            emoji={game.emoji}
            title={game.title}
            tags={game.tags}
            width={cardWidth}
            onPress={() => onSelectGame(game.route)}
          />
        ))}
      </View>
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

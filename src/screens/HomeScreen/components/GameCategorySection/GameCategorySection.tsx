import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { GameCard } from '../GameCard';
import { CATEGORIES } from './navigation.constants';

export function GameCategorySection() {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.section}>
      {CATEGORIES.map(category => (
        <React.Fragment key={category.label}>
          <Text style={styles.sectionLabel}>{category.label}</Text>
          <View style={styles.grid}>
            {category.games.map(game => (
              <GameCard
                key={game.link}
                emoji={game.emoji}
                title={game.title}
                tags={game.tags}
                link={game.link}
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

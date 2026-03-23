import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { useRouter } from 'expo-router';
import type { AppColors } from '@styles/themes';

export interface GameCardProps {
  emoji: string;
  title: string;
  tags: string;
  link?: string;
}

export function GameCard({ emoji, title, tags, link }: GameCardProps) {
  const styles = useThemedStyles(makeStyles);
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter();

  const computedWidth = useMemo(() => {
    const gutter = 20;
    const gap = 10;
    return Math.floor((windowWidth - gutter * 2 - gap) / 2);
  }, [windowWidth]);

  const handlePress = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: computedWidth }]}
      onPress={handlePress}
      activeOpacity={0.75}
    >
      <Text style={styles.cardEmoji}>{emoji}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardTags}>{tags}</Text>
    </TouchableOpacity>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
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
  });
}

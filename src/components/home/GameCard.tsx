import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

interface GameCardProps {
  emoji: string;
  title: string;
  tags: string;
  width: number;
  onPress: () => void;
}

export default function GameCard({ emoji, title, tags, width, onPress }: GameCardProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <TouchableOpacity style={[styles.card, { width }]} onPress={onPress} activeOpacity={0.75}>
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

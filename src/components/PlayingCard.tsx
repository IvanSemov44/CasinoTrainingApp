import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Card } from '@utils/cardUtils';
import { isRed } from '@utils/cardUtils';

type Size = 'sm' | 'md' | 'lg';

interface PlayingCardProps {
  card: Card;
  faceDown?: boolean;
  size?: Size;
}

const DIMENSIONS: Record<Size, { width: number; height: number; cornerFont: number; centerFont: number }> = {
  sm: { width: 44,  height: 60,  cornerFont: 10, centerFont: 16 },
  md: { width: 56,  height: 76,  cornerFont: 12, centerFont: 20 },
  lg: { width: 72,  height: 96,  cornerFont: 15, centerFont: 26 },
};

const SUIT_SYMBOL: Record<string, string> = {
  spades:   '♠',
  hearts:   '♥',
  diamonds: '♦',
  clubs:    '♣',
};

export default function PlayingCard({ card, faceDown = false, size = 'md' }: PlayingCardProps) {
  const d = DIMENSIONS[size];

  if (faceDown) {
    return (
      <View style={[styles.card, { width: d.width, height: d.height }, styles.faceDown]} />
    );
  }

  const symbol = SUIT_SYMBOL[card.suit];
  const color  = isRed(card.suit) ? '#CC0000' : '#111111';

  return (
    <View style={[styles.card, { width: d.width, height: d.height }]}>
      <Text style={[styles.cornerTL, { fontSize: d.cornerFont, color }]}>{card.rank}</Text>
      <Text style={[styles.suitCenter, { fontSize: d.centerFont, color }]}>{symbol}</Text>
      <Text style={[styles.cornerBR, { fontSize: d.cornerFont, color }]}>{card.rank}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceDown: {
    backgroundColor: '#1A237E',
    borderColor: '#283593',
  },
  cornerTL: {
    position: 'absolute',
    top: 3,
    left: 5,
    fontWeight: '700',
    lineHeight: 16,
  },
  suitCenter: {
    fontWeight: '400',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 3,
    right: 5,
    fontWeight: '700',
    lineHeight: 16,
    transform: [{ rotate: '180deg' }],
  },
});

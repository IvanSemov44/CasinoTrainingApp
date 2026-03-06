import React from 'react';
import DrillMenuScreen from '@components/shared/DrillMenuScreen';
import type { TCPDrillType } from '../../types';
import type { TCPMenuScreenProps } from './TCPMenuScreen.types';

const DRILLS: { drillType: TCPDrillType; label: string; description: string; difficulty: 'easy' | 'medium' | 'advanced' }[] = [
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
  return (
    <DrillMenuScreen
      title="Three Card Poker"
      drills={DRILLS}
      onPress={(drillType) => navigation.navigate('TCPDrill', { drillType })}
    />
  );
}

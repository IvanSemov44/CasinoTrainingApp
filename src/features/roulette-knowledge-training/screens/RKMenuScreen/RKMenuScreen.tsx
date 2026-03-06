import React from 'react';
import DrillMenuScreen from '@components/shared/DrillMenuScreen';
import type { RKDrillType } from '../../types';
import type { RKMenuScreenProps } from './RKMenuScreen.types';

const DRILLS: { drillType: RKDrillType; label: string; description: string; difficulty: 'easy' | 'medium' | 'advanced' }[] = [
  {
    drillType: 'outside-bet-payout',
    label: 'Outside Bet Payout',
    description: 'Calculate even-money (1:1) and 2:1 outside bet payouts for Red, Column, Dozen, and more.',
    difficulty: 'easy',
  },
  {
    drillType: 'dozen-vs-column',
    label: 'Dozen vs Column',
    description: 'Which numbers are in Dozen 1? What does Column 2 cover? Both pay 2:1 — know the difference.',
    difficulty: 'easy',
  },
  {
    drillType: 'zero-rule',
    label: 'Zero Rule',
    description: '0 wins → ALL outside bets lose. No La Partage, no En Prison. Inside bets on 0 still pay.',
    difficulty: 'easy',
  },
  {
    drillType: 'outside-bet-recognition',
    label: 'Outside Bet Recognition',
    description: 'Identify the bet type from its description — which numbers it covers and what it pays.',
    difficulty: 'easy',
  },
  {
    drillType: 'bet-limits',
    label: 'Bet Limits',
    description: 'Standard/high table limits: inside max €200 (both tables), Dozen/Column max €500, even-money max €1,000.',
    difficulty: 'easy',
  },
  {
    drillType: 'announced-chip-count',
    label: 'Announced Bet Chip Count',
    description: 'Voisins=9, Tiers=6, Orphelins=5, Jeu Zéro=4, Neighbors=5. Know all five chip counts.',
    difficulty: 'medium',
  },
  {
    drillType: 'announced-numbers',
    label: 'Announced Bet Coverage',
    description: 'Voisins=17 numbers, Tiers=12, Orphelins=8, Jeu Zéro=7, Neighbors=5. Numbers covered by each bet.',
    difficulty: 'medium',
  },
  {
    drillType: 'announced-composition',
    label: 'Announced Bet Composition',
    description: 'What individual bets (splits, streets, corners, straights) make up each announced bet?',
    difficulty: 'medium',
  },
  {
    drillType: 'mixed-outside-payout',
    label: 'Mixed Outside Payout',
    description: 'Two outside bets on the same winning number — calculate the combined total payout.',
    difficulty: 'medium',
  },
  {
    drillType: 'announced-inside-mixed',
    label: 'Announced Bet Net Win',
    description: 'Calculate net win from an announced bet: winning component payout minus losing chips collected.',
    difficulty: 'advanced',
  },
];

export default function RKMenuScreen({ navigation }: RKMenuScreenProps) {
  return (
    <DrillMenuScreen
      title="Roulette Knowledge"
      drills={DRILLS}
      onPress={(drillType) => navigation.navigate('RKDrill', { drillType })}
    />
  );
}

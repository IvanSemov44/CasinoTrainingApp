import React, { useMemo } from 'react';
import MenuListScreen, { type MenuItem } from '../../components/MenuListScreen';

const POSITION_CATEGORIES = [
  {
    id: '1',
    type: 'STRAIGHT_UP',
    title: 'Straight Up',
    description: 'Single number bets (35:1). Includes payout calculations and cash handling.',
    difficulty: 'easy' as const,
  },
  {
    id: '2',
    type: 'SPLIT',
    title: 'Split',
    description: 'Two adjacent numbers (17:1). Payout calculations.',
    difficulty: 'easy' as const,
  },
  {
    id: '3',
    type: 'STREET',
    title: 'Street',
    description: 'Three numbers in a row (11:1). Payout calculations.',
    difficulty: 'easy' as const,
  },
  {
    id: '4',
    type: 'CORNER',
    title: 'Corner',
    description: 'Four numbers (8:1). Payout calculations.',
    difficulty: 'easy' as const,
  },
  {
    id: '5',
    type: 'SIX_LINE',
    title: 'Six Line',
    description: 'Six numbers - double street (5:1). Payout calculations.',
    difficulty: 'easy' as const,
  },
  {
    id: '6',
    type: 'MIXED_CALCULATION',
    title: 'Mixed Bets - Straight & Split',
    description: 'Calculate total payouts combining straight ups (35:1) and splits (17:1).',
    difficulty: 'medium' as const,
  },
  {
    id: '7',
    type: 'TRIPLE_MIXED_CALCULATION',
    title: 'Mixed Bets - Triple Mix',
    description: 'Combines straight ups (35:1), splits (17:1), and corners (8:1).',
    difficulty: 'hard' as const,
  },
  {
    id: '8',
    type: 'ALL_POSITIONS_CALCULATION',
    title: 'All Positions - Master Level',
    description: 'Calculate total payouts combining all bet types: straight ups, splits, corners, streets, and six lines.',
    difficulty: 'hard' as const,
  },
];

export default function RouletteExercisesScreen({ navigation }: any) {
  const menuItems: MenuItem[] = useMemo(() => 
    POSITION_CATEGORIES.map((category) => ({
      id: category.id,
      title: category.title,
      description: category.description,
      difficulty: category.difficulty,
      onPress: () => navigation.navigate('PositionSelection', { positionType: category.type }),
    })),
    [navigation]
  );

  return (
    <MenuListScreen 
      title="Roulette Exercises"
      items={menuItems}
      theme="green"
    />
  );
}

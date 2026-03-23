/**
 * Local navigation types and categories for GameCategorySection
 * Kept here because they are only used by the home category UI.
 */
export type Route =
  | 'RouletteExercises'
  | 'SectorTraining'
  | 'PositionTraining'
  | 'CashConversionDifficultySelection'
  | 'RKMenu'
  | 'TCPMenu'
  | 'BJMenu'
  | 'CPMenu'
  | 'THUMenu'
  | 'CallBetsMenu'
  | 'PLOMenu';

export interface GameEntry {
  route: Route;
  emoji: string;
  title: string;
  tags: string;
}

export interface GameCategory {
  label: string;
  games: GameEntry[];
}

export const CATEGORIES: GameCategory[] = [
  {
    label: 'ROULETTE',
    games: [
      {
        route: 'RouletteExercises',
        title: 'Roulette Training',
        emoji: '🎰',
        tags: 'Payouts · Splits · Streets',
      },
      {
        route: 'SectorTraining',
        title: 'Sector Training',
        emoji: '🎯',
        tags: 'Number → Sector',
      },
      {
        route: 'PositionTraining',
        title: 'Position Training',
        emoji: '📍',
        tags: 'Number → Position',
      },
      {
        route: 'CashConversionDifficultySelection',
        title: 'Cash Conversion',
        emoji: '💰',
        tags: 'Chip exchange',
      },
      {
        route: 'RKMenu',
        title: 'Roulette Knowledge',
        emoji: '📚',
        tags: 'Rules · Limits · Announced',
      },
      {
        route: 'CallBetsMenu',
        title: 'Call Bets',
        emoji: '📣',
        tags: 'Voisins · Tiers · Orphelins',
      },
    ],
  },
  {
    label: 'POKER',
    games: [
      {
        route: 'TCPMenu',
        title: 'Three Card Poker',
        emoji: '🃏',
        tags: 'Qualify · Payouts',
      },
      {
        route: 'BJMenu',
        title: 'Blackjack',
        emoji: '🂡',
        tags: 'Payout · Insurance · 3:2',
      },
      {
        route: 'CPMenu',
        title: 'Caribbean Poker',
        emoji: '🌴',
        tags: 'Swap · Bonus · A-K',
      },
      {
        route: 'THUMenu',
        title: "Texas Hold'em Ultimate",
        emoji: '🤠',
        tags: 'Blind · Trips · Raise',
      },
      {
        route: 'PLOMenu',
        title: 'Pot Limit Omaha',
        emoji: '♠️',
        tags: 'Dealing · Pot calc',
      },
    ],
  },
];

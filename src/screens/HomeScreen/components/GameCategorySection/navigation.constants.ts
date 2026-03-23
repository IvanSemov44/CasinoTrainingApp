/**
 * Local navigation types and categories for GameCategorySection
 * Kept here because they are only used by the home category UI.
 */
export interface GameEntry {
  /** Direct path for this entry — used for navigation */
  link: string;
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
        title: 'Roulette Training',
        emoji: '🎰',
        tags: 'Payouts · Splits · Streets',
        link: '/roulette',
      },
      {
        title: 'Sector Training',
        emoji: '🎯',
        tags: 'Number → Sector',
        link: '/racetrack-sector',
      },
      {
        title: 'Position Training',
        emoji: '📍',
        tags: 'Number → Position',
        link: '/racetrack-position',
      },
      {
        title: 'Cash Conversion',
        emoji: '💰',
        tags: 'Chip exchange',
        link: '/cash-conversion',
      },
      {
        title: 'Roulette Knowledge',
        emoji: '📚',
        tags: 'Rules · Limits · Announced',
        link: '/roulette-knowledge',
      },
      {
        title: 'Call Bets',
        emoji: '📣',
        tags: 'Voisins · Tiers · Orphelins',
        link: '/call-bets',
      },
    ],
  },
  {
    label: 'POKER',
    games: [
      {
        title: 'Three Card Poker',
        emoji: '🃏',
        tags: 'Qualify · Payouts',
        link: '/tcp',
      },
      {
        title: 'Blackjack',
        emoji: '🂡',
        tags: 'Payout · Insurance · 3:2',
        link: '/blackjack',
      },
      {
        title: 'Caribbean Poker',
        emoji: '🌴',
        tags: 'Swap · Bonus · A-K',
        link: '/cp',
      },
      {
        title: "Texas Hold'em Ultimate",
        emoji: '🤠',
        tags: 'Blind · Trips · Raise',
        link: '/thu',
      },
      {
        title: 'Pot Limit Omaha',
        emoji: '♠️',
        tags: 'Dealing · Pot calc',
        link: '/plo',
      },
    ],
  },
];

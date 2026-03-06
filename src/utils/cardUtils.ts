import { shuffleArray } from './randomUtils';

export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

export interface Card {
  rank: Rank;
  suit: Suit;
}

export const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
export const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];

export function buildDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

export function dealCards(n: number): Card[] {
  return shuffleArray(buildDeck()).slice(0, n);
}

export function isRed(suit: Suit): boolean {
  return suit === 'hearts' || suit === 'diamonds';
}

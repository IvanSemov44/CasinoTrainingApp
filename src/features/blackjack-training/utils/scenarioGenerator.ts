import { dealCards, RANKS, SUITS, type Card } from '@utils/cardUtils';
import {
  cardBJValue,
  handTotal,
  softAnnouncement,
  dealerMustHit,
  isNaturalBlackjack,
  canSplit,
  superSevenInfo,
} from '@utils/blackjackEvaluator';
import { getRandomElement, shuffleArray, getRandomInt } from '@utils/randomUtils';
import {
  bjPayout,
  bjSideBetPayout,
  pairSideBetPayout,
  surrenderReturn,
  formatEuro,
} from './payouts';
import type { BJScenario, BJDrillType } from '../types';

// ── Helpers ───────────────────────────────────────────────────────────────────

function pick<T>(arr: readonly T[]): T {
  return getRandomElement([...arr]);
}

function suitLabel(suit: string): string {
  const s: Record<string, string> = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };
  return s[suit] ?? suit;
}

function cardLabel(card: Card): string {
  return `${card.rank}${suitLabel(card.suit)}`;
}

function handLabel(cards: Card[]): string {
  return cards.map(cardLabel).join(' ');
}

// ── soft-hand-recognition ─────────────────────────────────────────────────────

function generateSoftHandRecognition(): BJScenario {
  // Force one Ace + one non-Ace card
  const nonAceRanks = RANKS.filter(r => r !== 'A');
  const aceCard: Card = { rank: 'A', suit: pick(SUITS) };
  const otherCard: Card = { rank: pick(nonAceRanks), suit: pick(SUITS) };
  const cards = [aceCard, otherCard];

  const { hard, soft } = handTotal(cards);
  const announcement = softAnnouncement(cards)!; // always soft for 2 cards with Ace ≤ 11

  // Build wrong options: vary the numbers by ±1 and ±2
  const wrongHards = [hard - 1, hard + 1, hard + 2].filter(v => v > 0 && v < 21);
  const wrongOptions = wrongHards
    .map(h => `${h} or ${h + 10}`)
    .filter(o => o !== announcement)
    .slice(0, 3);
  // Pad if needed
  while (wrongOptions.length < 3) {
    const h = hard + wrongOptions.length + 2;
    const o = `${h} or ${h + 10}`;
    if (o !== announcement && !wrongOptions.includes(o)) wrongOptions.push(o);
  }

  const options = shuffleArray([announcement, ...wrongOptions.slice(0, 3)]);

  return {
    drillType: 'soft-hand-recognition',
    playerCards: cards,
    question: 'What is the hand total? Announce correctly.',
    answerType: 'multiple-choice',
    options,
    correctOption: announcement,
    explanation: `${handLabel(cards)}: Ace counts as 11. Hard = ${hard}, Soft = ${soft}. Announce: "${announcement}".`,
  };
}

// ── dealer-action ─────────────────────────────────────────────────────────────

function generateDealerAction(): BJScenario {
  // Deal 2–3 cards, possibly with an Ace
  const count = getRandomInt(0, 99) < 70 ? 2 : 3;
  const cards = dealCards(count);
  const mustHit = dealerMustHit(cards);
  const correct = mustHit ? 'Hit' : 'Stand';

  const { hard, soft } = handTotal(cards);
  const totalStr = soft !== null ? `${hard} or ${soft} (soft)` : `${hard}`;

  const rule = mustHit
    ? `Total is ${totalStr} — dealer hits on 16 or below.`
    : soft !== null
      ? `Total is ${totalStr} — dealer stands on ALL 17s, including soft 17.`
      : `Total is ${hard} — dealer stands on 17 or above.`;

  return {
    drillType: 'dealer-action',
    dealerCards: cards,
    question: 'What does the dealer do?',
    answerType: 'multiple-choice',
    options: ['Hit', 'Stand'],
    correctOption: correct,
    explanation: `${handLabel(cards)} = ${totalStr}. ${rule}`,
  };
}

// ── hand-comparison ───────────────────────────────────────────────────────────

function compareHands(
  playerCards: Card[],
  dealerCards: Card[],
): { outcome: string; explanation: string } {
  const playerBJ = isNaturalBlackjack(playerCards);
  const dealerBJ = isNaturalBlackjack(dealerCards);

  if (playerBJ && dealerBJ) {
    return {
      outcome: 'Push',
      explanation: 'Both have Natural Blackjack — Push.',
    };
  }
  if (playerBJ) {
    return {
      outcome: 'Player wins',
      explanation: `Player has Natural Blackjack. Beats dealer's ${handLabel(dealerCards)}.`,
    };
  }
  if (dealerBJ) {
    return {
      outcome: 'Dealer wins',
      explanation: `Dealer has Natural Blackjack. Player's ${handLabel(playerCards)} loses.`,
    };
  }

  const { hard: ph, soft: ps } = handTotal(playerCards);
  const { hard: dh, soft: ds } = handTotal(dealerCards);
  const pBust = ph > 21;
  const dBust = dh > 21;
  const pTotal = ps ?? ph;
  const dTotal = ds ?? dh;

  if (pBust && dBust) return { outcome: 'Push', explanation: 'Both bust — Push.' };
  if (pBust) return { outcome: 'Dealer wins', explanation: `Player busts (${ph}). Dealer wins.` };
  if (dBust) return { outcome: 'Player wins', explanation: `Dealer busts (${dh}). Player wins.` };

  if (pTotal > dTotal) return { outcome: 'Player wins', explanation: `Player ${pTotal} beats dealer ${dTotal}.` };
  if (dTotal > pTotal) return { outcome: 'Dealer wins', explanation: `Dealer ${dTotal} beats player ${pTotal}.` };
  return { outcome: 'Push', explanation: `Both have ${pTotal} — Push.` };
}

function generateHandComparison(): BJScenario {
  // Deal fresh hands that don't both bust (re-try if needed)
  let playerCards: Card[];
  let dealerCards: Card[];
  let attempts = 0;
  do {
    const all = dealCards(6);
    playerCards = all.slice(0, 3);
    dealerCards = all.slice(3, 6);
    attempts++;
  } while (
    attempts < 10 &&
    handTotal(playerCards).hard > 21 &&
    handTotal(dealerCards).hard > 21
  );

  const { outcome, explanation } = compareHands(playerCards, dealerCards);

  const options = shuffleArray(['Player wins', 'Dealer wins', 'Push']);

  return {
    drillType: 'hand-comparison',
    playerCards,
    dealerCards,
    question: 'Who wins?',
    answerType: 'multiple-choice',
    options,
    correctOption: outcome,
    explanation,
  };
}

// ── bj-payout (even bets) ─────────────────────────────────────────────────────

const EVEN_BETS = [20, 30, 40, 50, 60, 80, 100] as const;

function generateBJPayout(): BJScenario {
  const bet = pick(EVEN_BETS);
  const payout = bjPayout(bet); // always integer for even bets

  return {
    drillType: 'bj-payout',
    betAmount: bet,
    question: `Player has Natural Blackjack with a €${bet} bet.\nWhat is the payout? (3:2)`,
    answerType: 'numeric',
    correctAnswer: payout,
    explanation: `€${bet} × 3/2 = €${payout}. Return to player: €${bet + payout} (bet + winnings).`,
  };
}

// ── odd-bj-payout (fractional) ────────────────────────────────────────────────

const ODD_BETS = [15, 25, 35, 45, 55, 75] as const;

function generateOddBJPayout(): BJScenario {
  const bet = pick(ODD_BETS);
  const payout = bjPayout(bet); // may be fractional
  const correctOption = formatEuro(payout);

  // Build 3 wrong options: ±5, ±10 from payout
  const wrongs = [-10, -5, +5, +10]
    .map(d => payout + d)
    .filter(v => v > 0 && v !== payout)
    .map(v => formatEuro(v));
  const uniqueWrongs = [...new Set(wrongs)].filter(o => o !== correctOption).slice(0, 3);

  const options = shuffleArray([correctOption, ...uniqueWrongs]);

  return {
    drillType: 'odd-bj-payout',
    betAmount: bet,
    question: `Player has Natural Blackjack with a €${bet} bet.\nWhat is the payout? (3:2)`,
    answerType: 'multiple-choice',
    options,
    correctOption,
    explanation: `€${bet} × 3/2 = ${correctOption}. Return to player: ${formatEuro(bet + payout)} (bet + winnings).`,
  };
}

// ── side-bet-payout ───────────────────────────────────────────────────────────

function generateSideBetPayout(): BJScenario {
  const roll = getRandomInt(0, 99);

  if (roll < 40) {
    // BJ side bet — need Ace + 10-value
    const tenRanks: Card['rank'][] = ['10', 'J', 'Q', 'K'];
    const aceCard: Card = { rank: 'A', suit: pick(SUITS) };
    const tenCard: Card = { rank: pick(tenRanks), suit: pick(SUITS) };
    const cards = [aceCard, tenCard];
    const bet = pick([5, 10, 15, 20, 25] as const);
    const payout = bjSideBetPayout(bet);

    return {
      drillType: 'side-bet-payout',
      playerCards: cards,
      betAmount: bet,
      question: `Player bet €${bet} on the BJ Side Bet.\nWhat is the payout?`,
      answerType: 'numeric',
      correctAnswer: payout,
      explanation: `${handLabel(cards)} = Natural Blackjack. BJ Side Bet pays 15:1. €${bet} × 15 = €${payout}.`,
    };
  }

  if (roll < 80) {
    // Pair side bet — two cards same rank
    const rank = pick(RANKS);
    const [s1, s2] = shuffleArray([...SUITS]).slice(0, 2) as [typeof SUITS[number], typeof SUITS[number]];
    const cards: Card[] = [{ rank, suit: s1 }, { rank, suit: s2 }];
    const bet = pick([5, 10, 15, 20, 25] as const);
    const payout = pairSideBetPayout(bet);

    return {
      drillType: 'side-bet-payout',
      playerCards: cards,
      betAmount: bet,
      question: `Player bet €${bet} on the Pair Side Bet.\nWhat is the payout?`,
      answerType: 'numeric',
      correctAnswer: payout,
      explanation: `${handLabel(cards)} = Pair of ${rank}s. Pair Side Bet pays 11:1. €${bet} × 11 = €${payout}.`,
    };
  }

  // Neither — no qualifying hand, payout is €0
  let cards = dealCards(2);
  while (isNaturalBlackjack(cards) || canSplit(cards)) {
    cards = dealCards(2);
  }
  const bet = pick([5, 10, 20] as const);
  const betType = getRandomInt(0, 99) < 50 ? 'BJ Side Bet' : 'Pair Side Bet';

  return {
    drillType: 'side-bet-payout',
    playerCards: cards,
    betAmount: bet,
    question: `Player bet €${bet} on the ${betType}.\nWhat is the payout?`,
    answerType: 'numeric',
    correctAnswer: 0,
    explanation: `${handLabel(cards)} — not a Natural Blackjack or a pair. ${betType} does not pay. Payout: €0.`,
  };
}

// ── insurance-timing ──────────────────────────────────────────────────────────

const INSURANCE_OPTIONS = [
  'Dealer offers Insurance to all players',
  'Player may request the Ace Bet — dealer does not offer it',
  'No action — continue with play',
];

function generateInsuranceTiming(): BJScenario {
  const roll = getRandomInt(0, 99);
  let upcard: Card;
  let correctOption: string;
  let explanation: string;

  if (roll < 33) {
    // Dealer Ace
    upcard = { rank: 'A', suit: pick(SUITS) };
    correctOption = INSURANCE_OPTIONS[0];
    explanation = 'Dealer shows Ace → dealer actively offers Insurance to all players (pays 2:1). Max = half of player main bet.';
  } else if (roll < 66) {
    // 10-value card
    const tenRanks: Card['rank'][] = ['10', 'J', 'Q', 'K'];
    upcard = { rank: pick(tenRanks), suit: pick(SUITS) };
    correctOption = INSURANCE_OPTIONS[1];
    explanation = `Dealer shows ${upcard.rank} → player may REQUEST the Ace Bet (dealer does not offer). Pays 11:1 if dealer's next card is an Ace.`;
  } else {
    // 2–9 card
    const lowRanks: Card['rank'][] = ['2', '3', '4', '5', '6', '7', '8', '9'];
    upcard = { rank: pick(lowRanks), suit: pick(SUITS) };
    correctOption = INSURANCE_OPTIONS[2];
    explanation = `Dealer shows ${upcard.rank} → no insurance or Ace Bet available. Continue with play.`;
  }

  const options = shuffleArray([...INSURANCE_OPTIONS]);

  return {
    drillType: 'insurance-timing',
    dealerCards: [upcard],
    question: "Dealer's upcard is shown. What happens?",
    answerType: 'multiple-choice',
    options,
    correctOption,
    explanation,
  };
}

// ── surrender ─────────────────────────────────────────────────────────────────

const SURRENDER_BETS = [20, 40, 60, 80, 100] as const;

function generateSurrender(): BJScenario {
  const bet = pick(SURRENDER_BETS);
  const returned = surrenderReturn(bet);
  const cards = dealCards(2);

  return {
    drillType: 'surrender',
    playerCards: cards,
    betAmount: bet,
    question: `Player bets €${bet} and requests Surrender.\nHow much is returned?\n(Surrender valid only before any additional card is drawn)`,
    answerType: 'numeric',
    correctAnswer: returned,
    explanation: `Surrender returns half the bet: €${bet} ÷ 2 = €${returned}. Only valid on the original 2-card hand — not after hitting.`,
  };
}

// ── split-scenario ────────────────────────────────────────────────────────────

function generateSplitScenario(): BJScenario {
  // 33% same rank (can split), 33% same value diff rank (cannot), 34% different rank & value
  const roll = getRandomInt(0, 99);
  let cards: Card[];
  let canSplitResult: boolean;
  let explanation: string;

  if (roll < 40) {
    // Same rank — can split
    const rank = pick(RANKS);
    const [s1, s2] = shuffleArray([...SUITS]).slice(0, 2) as [typeof SUITS[number], typeof SUITS[number]];
    cards = [{ rank, suit: s1 }, { rank, suit: s2 }];
    canSplitResult = true;
    if (rank === 'A') {
      explanation = `${handLabel(cards)} — same rank (Ace). Can split. Rule: one card each, no re-split, no double. Ace + 10-value after split = 21 (pays 1:1, not 3:2).`;
    } else {
      explanation = `${handLabel(cards)} — same rank. Can split. Equal second bet required.`;
    }
  } else if (roll < 70) {
    // Same 10-value, different rank (J+Q, J+K, Q+K, 10+J etc.) — cannot split
    const tenRanks: Card['rank'][] = ['10', 'J', 'Q', 'K'];
    const shuffled = shuffleArray([...tenRanks]);
    const r1 = shuffled[0];
    const r2 = shuffled[1];
    cards = [
      { rank: r1, suit: pick(SUITS) },
      { rank: r2, suit: pick(SUITS) },
    ];
    canSplitResult = false;
    explanation = `${handLabel(cards)} — both worth 10, but different ranks (${r1} ≠ ${r2}). Split requires same RANK, not same value.`;
  } else {
    // Completely different ranks
    let r1: Card['rank'];
    let r2: Card['rank'];
    do {
      r1 = pick(RANKS);
      r2 = pick(RANKS);
    } while (r1 === r2);
    cards = [{ rank: r1, suit: pick(SUITS) }, { rank: r2, suit: pick(SUITS) }];
    canSplitResult = false;
    explanation = `${handLabel(cards)} — different ranks. Cannot split.`;
  }

  return {
    drillType: 'split-scenario',
    playerCards: cards,
    question: 'Can these cards be split?',
    answerType: 'multiple-choice',
    options: ['Yes', 'No'],
    correctOption: canSplitResult ? 'Yes' : 'No',
    explanation,
  };
}

// ── super-seven ───────────────────────────────────────────────────────────────

const SS_BETS = [5, 10, 15, 20, 25] as const;

const ALL_SS_TIERS = [
  { tier: '1 Seven', multiplier: 3 },
  { tier: '2 Sevens — Different Suits', multiplier: 30 },
  { tier: '2 Sevens — Same Suit', multiplier: 100 },
  { tier: '3 Sevens — Mixed Suits', multiplier: 500 },
  { tier: '3 Sevens — Same Suit', multiplier: 5000 },
];

function generateSuperSeven(): BJScenario {
  const bet = pick(SS_BETS);

  // Weight: 40% one 7, 40% two 7s, 20% three 7s
  const roll = getRandomInt(0, 99);
  const count = roll < 40 ? 1 : roll < 80 ? 2 : 3;

  // Build seven cards with chosen suit pattern
  let sevens: Card[];
  if (count === 1) {
    sevens = [{ rank: '7', suit: pick(SUITS) }];
  } else if (count === 2) {
    const sameSuit = getRandomInt(0, 99) < 50;
    const suit1 = pick(SUITS);
    const suit2 = sameSuit ? suit1 : pick(SUITS.filter(s => s !== suit1));
    sevens = [{ rank: '7', suit: suit1 }, { rank: '7', suit: suit2 }];
  } else {
    const allSame = getRandomInt(0, 99) < 30;
    if (allSame) {
      const s = pick(SUITS);
      sevens = [{ rank: '7', suit: s }, { rank: '7', suit: s }, { rank: '7', suit: s }];
    } else {
      const [s1, s2, s3] = shuffleArray([...SUITS]).slice(0, 3) as [typeof SUITS[number], typeof SUITS[number], typeof SUITS[number]];
      sevens = [{ rank: '7', suit: s1 }, { rank: '7', suit: s2 }, { rank: '7', suit: s3 }];
    }
  }

  const info = superSevenInfo(sevens)!;
  const payout = info.multiplier * bet;
  const correctOption = `${info.tier} — €${payout} (${info.multiplier}:1)`;

  // Build 3 wrong options from other tiers
  const wrongTiers = ALL_SS_TIERS
    .filter(t => t.tier !== info.tier)
    .map(t => `${t.tier} — €${t.multiplier * bet} (${t.multiplier}:1)`);
  const options = shuffleArray([correctOption, ...shuffleArray(wrongTiers).slice(0, 3)]);

  const suitNote = count === 1 ? '' : count === 2
    ? (sevens[0].suit === sevens[1].suit ? ' (same suit)' : ' (different suits)')
    : (sevens[0].suit === sevens[1].suit && sevens[1].suit === sevens[2].suit ? ' (same suit)' : ' (mixed suits)');

  return {
    drillType: 'super-seven',
    playerCards: sevens,
    betAmount: bet,
    question: `Player bet €${bet} on Super Seven.\nCards dealt so far: ${handLabel(sevens)}${suitNote}.\nWhat is the Super Seven payout?`,
    answerType: 'multiple-choice',
    options,
    correctOption,
    explanation: `${handLabel(sevens)}${suitNote} = ${info.tier} (${info.multiplier}:1). €${bet} × ${info.multiplier} = €${payout}.\nNote: same suit = same symbol (all ♠, all ♥ etc.). 6 decks make same-suit triples possible.`,
  };
}

// ── Entry point ───────────────────────────────────────────────────────────────

export function generateBJScenario(drillType: BJDrillType): BJScenario {
  switch (drillType) {
    case 'soft-hand-recognition': return generateSoftHandRecognition();
    case 'dealer-action':         return generateDealerAction();
    case 'hand-comparison':       return generateHandComparison();
    case 'bj-payout':             return generateBJPayout();
    case 'odd-bj-payout':         return generateOddBJPayout();
    case 'side-bet-payout':       return generateSideBetPayout();
    case 'insurance-timing':      return generateInsuranceTiming();
    case 'surrender':             return generateSurrender();
    case 'split-scenario':        return generateSplitScenario();
    case 'super-seven':           return generateSuperSeven();
  }
}

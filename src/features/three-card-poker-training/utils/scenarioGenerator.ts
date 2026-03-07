import { dealCards } from '@utils/cardUtils';
import {
  evaluateThreeCardHand,
  threeCardHandName,
  dealerQualifies,
  type ThreeCardRank,
} from '@utils/threeCardEvaluator';
import { getRandomElement, shuffleArray, getRandomInt } from '@utils/randomUtils';
import {
  pairPlusMultiplier,
  pairPlusPayout,
  anteBonusMultiplier,
  anteBonusPayout,
  callOutcome,
} from './payouts';
import type { TCPScenario, TCPDrillType } from '../types';

// Ante/bet amounts used in payout drills (€10–€25 range, matches casino min)
const BET_AMOUNTS = [10, 15, 20, 25] as const;

function randomBet(): number {
  return getRandomElement([...BET_AMOUNTS]);
}

// ── Hand-recognition ──────────────────────────────────────────────────────────

const ALL_RANKS: ThreeCardRank[] = [
  'straight-flush',
  'three-of-a-kind',
  'straight',
  'flush',
  'pair',
  'high-card',
];

/** Returns 3 wrong hand names ordered by proximity to the correct rank. */
function nearbyWrongOptions(correct: ThreeCardRank): string[] {
  const idx = ALL_RANKS.indexOf(correct);
  const wrong = ALL_RANKS.filter(r => r !== correct);
  wrong.sort((a, b) => {
    const ai = ALL_RANKS.indexOf(a);
    const bi = ALL_RANKS.indexOf(b);
    return Math.abs(ai - idx) - Math.abs(bi - idx);
  });
  return wrong.slice(0, 3).map(threeCardHandName);
}

function suitLabel(suit: string): string {
  const symbols: Record<string, string> = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };
  return symbols[suit] ?? suit;
}

function cardLabel(card: { rank: string; suit: string }): string {
  return `${card.rank}${suitLabel(card.suit)}`;
}

function handDescription(cards: { rank: string; suit: string }[]): string {
  return cards.map(cardLabel).join(' ');
}

function generateHandRecognition(): TCPScenario {
  const cards = dealCards(3);
  const rank = evaluateThreeCardHand(cards);
  const correctName = threeCardHandName(rank);
  const options = shuffleArray([correctName, ...nearbyWrongOptions(rank)]);

  const rankDescriptions: Record<ThreeCardRank, string> = {
    'straight-flush': 'Three suited cards in sequence.',
    'three-of-a-kind': 'Three cards of the same rank. Beats a Straight in TCP.',
    straight: 'Three cards in sequence, mixed suits.',
    flush: 'Three cards of the same suit, not in sequence.',
    pair: 'Two cards of the same rank.',
    'high-card': 'No matching ranks, not suited, not in sequence.',
  };

  return {
    drillType: 'hand-recognition',
    playerCards: cards,
    question: 'What hand is this?',
    answerType: 'multiple-choice',
    options,
    correctOption: correctName,
    explanation: `${handDescription(cards)} → ${correctName}. ${rankDescriptions[rank]}`,
  };
}

// ── Dealer qualification ──────────────────────────────────────────────────────

function generateDealerQualification(): TCPScenario {
  const cards = dealCards(3);
  const qualifies = dealerQualifies(cards);
  const rank = evaluateThreeCardHand(cards);
  const correct = qualifies ? 'Yes' : 'No';

  let explanation: string;
  if (rank !== 'high-card') {
    explanation = `${handDescription(cards)} = ${threeCardHandName(rank)}. Any made hand always qualifies.`;
  } else {
    const maxVal = Math.max(
      ...cards.map(c => {
        if (c.rank === 'A') return 14;
        if (c.rank === 'K') return 13;
        if (c.rank === 'Q') return 12;
        if (c.rank === 'J') return 11;
        return parseInt(c.rank, 10);
      })
    );
    const highCard = cards.find(c => {
      if (c.rank === 'A') return maxVal === 14;
      if (c.rank === 'K') return maxVal === 13;
      if (c.rank === 'Q') return maxVal === 12;
      if (c.rank === 'J') return maxVal === 11;
      return parseInt(c.rank, 10) === maxVal;
    });
    const highRankLabel = highCard?.rank ?? '?';
    if (qualifies) {
      explanation = `${handDescription(cards)} = High Card with ${highRankLabel}-high. Queen-high or better qualifies. ✓`;
    } else {
      explanation = `${handDescription(cards)} = High Card with ${highRankLabel}-high. Dealer needs Queen-high or better. ✗`;
    }
  }

  return {
    drillType: 'dealer-qualification',
    dealerCards: cards,
    question: 'Does the dealer qualify?',
    answerType: 'multiple-choice',
    options: ['Yes', 'No'],
    correctOption: correct,
    explanation,
  };
}

// ── Pair Plus payout ──────────────────────────────────────────────────────────

function generatePairPlusPayout(): TCPScenario {
  // Generate a hand that pays on Pair Plus (Pair or better)
  let cards = dealCards(3);
  let rank = evaluateThreeCardHand(cards);
  let attempts = 0;
  while (rank === 'high-card' && attempts < 20) {
    cards = dealCards(3);
    rank = evaluateThreeCardHand(cards);
    attempts++;
  }
  // If still high-card after many attempts, fall through — answer is €0
  const betAmount = randomBet();
  const payout = pairPlusPayout(rank, betAmount);
  const mult = pairPlusMultiplier(rank);

  const explanation =
    mult > 0
      ? `${handDescription(cards)} = ${threeCardHandName(rank)}. Pair Plus pays ${mult}:1. €${betAmount} × ${mult} = €${payout}.`
      : `${handDescription(cards)} = ${threeCardHandName(rank)}. High Card does not pay on Pair Plus. Payout: €0.`;

  return {
    drillType: 'pair-plus-payout',
    playerCards: cards,
    betAmount,
    question: `Player bet €${betAmount} on Pair Plus. What is the payout?`,
    answerType: 'numeric',
    correctAnswer: payout,
    explanation,
  };
}

// ── Ante Bonus ────────────────────────────────────────────────────────────────

function generateAnteBonusDrill(): TCPScenario {
  const BONUS_RANKS: ThreeCardRank[] = ['straight-flush', 'three-of-a-kind', 'straight'];

  // ~50% chance: generate a paying hand; ~50% chance: any hand (may or may not pay)
  let cards = dealCards(3);
  let rank = evaluateThreeCardHand(cards);
  if (getRandomInt(0, 99) < 60) {
    let attempts = 0;
    while (!BONUS_RANKS.includes(rank) && attempts < 20) {
      cards = dealCards(3);
      rank = evaluateThreeCardHand(cards);
      attempts++;
    }
  }

  const anteAmount = randomBet();
  const bonus = anteBonusPayout(rank, anteAmount);
  const mult = anteBonusMultiplier(rank);

  const payNote =
    'Remember: Ante Bonus pays regardless of whether the player wins or loses the hand.';
  const explanation =
    mult > 0
      ? `${handDescription(cards)} = ${threeCardHandName(rank)}. Ante Bonus pays ${mult}:1. €${anteAmount} × ${mult} = €${bonus}. ${payNote}`
      : `${handDescription(cards)} = ${threeCardHandName(rank)}. No Ante Bonus — only Straight Flush (4:1), Three of a Kind (3:1), and Straight (1:1) qualify. Payout: €0.`;

  return {
    drillType: 'ante-bonus',
    playerCards: cards,
    betAmount: anteAmount,
    question: `Player's Ante is €${anteAmount}. What is the Ante Bonus payout?\n(Ante Bonus pays regardless of game outcome)`,
    answerType: 'numeric',
    correctAnswer: bonus,
    explanation,
  };
}

// ── Full outcome ──────────────────────────────────────────────────────────────

const OUTCOME_OPTIONS = [
  'Dealer does not qualify — Ante pays 1:1, Play returned',
  'Player wins — Ante and Play each pay 1:1',
  'Dealer wins — Ante and Play collected',
  'Tie — Ante and Play pushed',
];

function generateFullOutcome(): TCPScenario {
  // Deal 6 unique cards from the same deck
  const allCards = dealCards(6);
  const playerCards = allCards.slice(0, 3);
  const dealerCards = allCards.slice(3, 6);

  const playerRank = evaluateThreeCardHand(playerCards);
  const dealerRank = evaluateThreeCardHand(dealerCards);
  const qualifies = dealerQualifies(dealerCards);

  const anteAmount = randomBet();
  const outcome = callOutcome(playerRank, dealerRank, qualifies, anteAmount);
  const anteBonus = anteBonusPayout(playerRank, anteAmount);
  const anteBonusMult = anteBonusMultiplier(playerRank);

  const correctOption = outcome.label;
  const wrongOptions = OUTCOME_OPTIONS.filter(o => o !== correctOption);
  const options = shuffleArray([correctOption, ...wrongOptions.slice(0, 3)]);

  // Build detailed explanation
  const lines: string[] = [
    `Player: ${handDescription(playerCards)} = ${threeCardHandName(playerRank)}`,
    `Dealer: ${handDescription(dealerCards)} = ${threeCardHandName(dealerRank)}`,
    `Dealer ${qualifies ? 'qualifies ✓' : 'does not qualify ✗'}`,
    `Outcome: ${outcome.label}`,
  ];
  if (anteBonusMult > 0) {
    lines.push(
      `Ante Bonus: ${threeCardHandName(playerRank)} pays ${anteBonusMult}:1 → €${anteBonus} (pays regardless of outcome)`
    );
  }

  return {
    drillType: 'full-outcome',
    playerCards,
    dealerCards,
    betAmount: anteAmount,
    question: `Ante: €${anteAmount}. Player placed Play bet.\nWhat happens to the Ante and Play bets?`,
    answerType: 'multiple-choice',
    options,
    correctOption,
    explanation: lines.join('\n'),
  };
}

// ── Entry point ───────────────────────────────────────────────────────────────

export function generateScenario(drillType: TCPDrillType): TCPScenario {
  switch (drillType) {
    case 'hand-recognition':
      return generateHandRecognition();
    case 'dealer-qualification':
      return generateDealerQualification();
    case 'pair-plus-payout':
      return generatePairPlusPayout();
    case 'ante-bonus':
      return generateAnteBonusDrill();
    case 'full-outcome':
      return generateFullOutcome();
  }
}

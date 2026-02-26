/**
 * PLO Hand Generator
 *
 * Formula: Pot = Dead Money + 3 × Last Action
 *
 * Action order:
 *  Preflop:  UTG → MP → CO → D → SB → BB  (SB/BB blinds auto-posted)
 *  Postflop: SB → BB → UTG → MP → CO → D
 *
 * Key rules enforced:
 *  1. A player can fold on their turn if there is an outstanding raise to call.
 *     (They cannot fold before it is their turn.)
 *  2. The action log only contains what each player did ON THEIR OWN TURN.
 *     Players who had chips in front but hadn't yet responded to the last raise
 *     are shown as-is on the table — they respond to the requester's pot-raise
 *     in the post-ask narrative, NOT in the pre-ask log.
 *  3. Center-pot for the next street counts every player in remainingPlayers
 *     as contributing correctAnswer (they call the pot-raise).
 */

import { getRandomElement } from '@utils/randomUtils';
import type { PLODifficulty, HandPlayerState, AskMoment, GeneratedHand } from '../types';

// ─── Table layout ────────────────────────────────────────────────────────────

const POSITION_SLOT: Record<string, number> = {
  CO: 1, MP: 2, UTG: 3, BB: 4, SB: 5, D: 6,
};

const ALL_POSITIONS = ['SB', 'BB', 'UTG', 'MP', 'CO', 'D'] as const;
const PREFLOP_ORDER  = ['UTG', 'MP', 'CO', 'D', 'SB', 'BB'] as const;
const POSTFLOP_ORDER = ['SB', 'BB', 'UTG', 'MP', 'CO', 'D'] as const;

const STARTING_STACKS: Record<number, number[]> = {
  2:  [120, 150, 180, 200, 250, 300],
  5:  [300, 375, 500, 625, 750, 900],
  10: [600, 750, 1000, 1250, 1500, 1800],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function weightedPick<T>(items: readonly T[], weights: number[]): T {
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

function pickRaiseAmount(currentBet: number, phase: 'first' | 'reRaise'): number {
  return currentBet * (phase === 'first'
    ? getRandomElement([2, 3, 4])
    : getRandomElement([2, 3]));
}

function pickPostflopBet(centerPot: number, blindLevel: number): number {
  const raw = Math.round(centerPot * getRandomElement([0.5, 0.67, 1.0]));
  return Math.max(Math.round(raw / blindLevel) * blindLevel, blindLevel * 2);
}

// ─── Core pot formula ────────────────────────────────────────────────────────

function calcPot(
  centerPot: number,
  bets: Record<string, number>,
  requester: string,
  lastAggressor: string,
): number {
  let dead = centerPot;
  for (const [p, amt] of Object.entries(bets)) {
    if (p !== requester && p !== lastAggressor) dead += amt;
  }
  return dead + 3 * (bets[lastAggressor] ?? 0);
}

/**
 * Compute center pot for the next street.
 *
 * Players in remainingPlayers called the pot-raise → each contributes correctAnswer.
 * Everyone else contributes their current bet (dead money).
 */
function computeNewCenterPot(
  centerPot: number,
  bets: Record<string, number>,
  remainingPlayers: string[],
  correctAnswer: number,
): number {
  let total = centerPot;
  for (const p of ALL_POSITIONS) {
    total += remainingPlayers.includes(p) ? correctAnswer : (bets[p] ?? 0);
  }
  return total;
}

// ─── Post-ask narrative ───────────────────────────────────────────────────────

/**
 * After the requester asks and pots, all other active players respond.
 * This is logged as history for the next street, NOT in the pre-ask action log.
 * Players not in foldedSet who aren't in remainingPlayers fold to the pot-raise.
 */
function buildPostAskLines(
  requester: string,
  foldedSet: Set<string>,
  remainingPlayers: string[],
  correctAnswer: number,
): string[] {
  const lines: string[] = [`${requester} pots to $${correctAnswer}`];
  for (const p of ALL_POSITIONS) {
    if (p === requester || foldedSet.has(p)) continue;
    lines.push(remainingPlayers.includes(p)
      ? `${p} calls $${correctAnswer}`
      : `${p} folds`);
  }
  return lines;
}

// ─── Explanation ─────────────────────────────────────────────────────────────

function buildExplanation(
  centerPot: number,
  bets: Record<string, number>,
  requester: string,
  lastAggressor: string,
  street: string,
): string {
  const lastAction = bets[lastAggressor] ?? 0;
  const requesterBet = bets[requester] ?? 0;
  let dead = centerPot;
  const parts: string[] = [];
  if (centerPot > 0) parts.push(`$${centerPot} (center)`);
  for (const [p, amt] of Object.entries(bets)) {
    if (p !== requester && p !== lastAggressor) {
      dead += amt;
      parts.push(`$${amt} (${p})`);
    }
  }
  const answer = dead + 3 * lastAction;
  const lines = [street.toUpperCase()];
  if (requesterBet > 0) lines.push(`${requester} has $${requesterBet} in front → excluded`);
  lines.push(`Dead money: ${parts.length ? parts.join(' + ') : '$0'} = $${dead}`);
  lines.push(`Last action: $${lastAction} (${lastAggressor})`);
  lines.push(`Pot = $${dead} + 3×$${lastAction} = $${answer}`);
  return lines.join('\n');
}

// ─── Build player display list ────────────────────────────────────────────────

function buildPlayers(
  bets: Record<string, number>,
  foldedSet: Set<string>,
  requester: string,
  stacks: number[],
): HandPlayerState[] {
  return ALL_POSITIONS.map((name, i) => ({
    name,
    position: POSITION_SLOT[name],
    isDealer: name === 'D',
    isFolded: foldedSet.has(name),
    isRequesting: name === requester,
    betAmount: bets[name],
    chipAmount: stacks[i] ?? stacks[0],
  }));
}

// ─── Preflop generator ───────────────────────────────────────────────────────

function generatePreflopMoment(
  blindLevel: number,
  stacks: number[],
): { askMoment: AskMoment; remainingPlayers: string[]; newCenterPot: number; accumulatedLog: string[] } {

  const bets: Record<string, number> = { SB: blindLevel, BB: blindLevel };
  const foldedSet = new Set<string>();
  const log: string[] = [`SB posts $${blindLevel}`, `BB posts $${blindLevel}`];

  let lastAggressor = 'BB';
  let currentBet = blindLevel;

  // Requester weights: UTG=5% MP=10% CO=20% D=25% SB=15% BB=25%
  const requester = weightedPick(PREFLOP_ORDER, [0.05, 0.10, 0.20, 0.25, 0.15, 0.25]);
  const requesterIdx = PREFLOP_ORDER.indexOf(requester);

  for (let i = 0; i < requesterIdx; i++) {
    const player = PREFLOP_ORDER[i];
    const myBet = bets[player] ?? 0;
    const toCall = currentBet - myBet;
    const raiseHappened = lastAggressor !== 'BB';

    let action: 'fold' | 'call' | 'raise';
    let raiseAmt = 0;

    if (!raiseHappened && myBet === 0) {
      // Opener (no prior raise): fold 15%, limp 20%, raise 65%
      const r = Math.random();
      action = r < 0.15 ? 'fold' : r < 0.35 ? 'call' : 'raise';
      if (action === 'raise') raiseAmt = pickRaiseAmount(currentBet, 'first');

    } else if (!raiseHappened && myBet === blindLevel) {
      // Blind with option, no raise yet: fold 25%, check 20%, raise 55%
      const r = Math.random();
      action = r < 0.25 ? 'fold' : r < 0.45 ? 'call' : 'raise';
      if (action === 'raise') raiseAmt = pickRaiseAmount(currentBet, 'first');

    } else if (toCall > 0) {
      // Facing a raise on their turn: fold 35%, call 40%, re-raise 25%
      const r = Math.random();
      action = r < 0.35 ? 'fold' : r < 0.75 ? 'call' : 'raise';
      if (action === 'raise') raiseAmt = pickRaiseAmount(currentBet, 'reRaise');

    } else {
      // Already matched (BB option check)
      action = 'call';
    }

    if (action === 'fold') {
      foldedSet.add(player);
      log.push(`${player} folds`);

    } else if (action === 'call') {
      if (toCall > 0) {
        bets[player] = currentBet;
        log.push(`${player} calls $${currentBet}`);
      }

    } else {
      bets[player] = raiseAmt;
      log.push(`${player} ${lastAggressor === 'BB' ? 'raises' : 're-raises'} to $${raiseAmt}`);
      lastAggressor = player;
      currentBet = raiseAmt;
    }
  }

  // Players not yet processed (those who had chips in front but the loop
  // reached the freeze point before they could respond to the last raise)
  // will respond in buildPostAskLines — they either call or fold the pot-raise.

  const correctAnswer = calcPot(0, bets, requester, lastAggressor);
  const explanation = buildExplanation(0, bets, requester, lastAggressor, 'preflop');

  const active = (ALL_POSITIONS as readonly string[]).filter(
    p => !foldedSet.has(p) && p !== requester && p !== lastAggressor,
  );
  const extraSurvivor = active.length > 0 && Math.random() < 0.4
    ? [getRandomElement(active)] : [];
  const remainingPlayers = [...new Set([requester, lastAggressor, ...extraSurvivor])];

  const players = buildPlayers(bets, foldedSet, requester, stacks);
  const newCenterPot = computeNewCenterPot(0, bets, remainingPlayers, correctAnswer);

  const actionLog = ['PREFLOP', ...log];
  const postAskLines = buildPostAskLines(requester, foldedSet, remainingPlayers, correctAnswer);
  const accumulatedLog = [...actionLog, ...postAskLines];

  return {
    askMoment: { street: 'preflop', communityCards: 0, centerPot: 0, players, actionLog, requesterName: requester, correctAnswer, explanation },
    remainingPlayers,
    newCenterPot,
    accumulatedLog,
  };
}

// ─── Post-flop generator ─────────────────────────────────────────────────────

function generatePostflopMoment(
  street: 'flop' | 'turn' | 'river',
  communityCards: number,
  remainingPlayers: string[],
  centerPot: number,
  stacks: number[],
  blindLevel: number,
  historicalLog: string[],
): { askMoment: AskMoment; remainingPlayers: string[]; newCenterPot: number; accumulatedLog: string[] } | null {

  if (remainingPlayers.length < 2) return null;

  const foldedSet = new Set(
    (ALL_POSITIONS as readonly string[]).filter(p => !remainingPlayers.includes(p)),
  );
  const bets: Record<string, number> = {};
  const log: string[] = [];

  let lastAggressor: string | null = null;
  let currentBet = 0;

  const orderedActors = (POSTFLOP_ORDER as readonly string[]).filter(
    p => remainingPlayers.includes(p),
  );

  const requesterIdx = Math.random() < 0.30
    ? 0
    : Math.floor(orderedActors.length * 0.5 + Math.random() * orderedActors.length * 0.5);
  const requester = orderedActors[Math.min(requesterIdx, orderedActors.length - 1)];
  const priorActors = orderedActors.slice(0, orderedActors.indexOf(requester));

  for (const player of priorActors) {
    const toCall = currentBet - (bets[player] ?? 0);
    const betMade = lastAggressor !== null;

    let action: 'check' | 'bet' | 'fold' | 'call' | 'raise';
    let amount = 0;

    if (!betMade) {
      action = Math.random() < 0.40 ? 'check' : 'bet';
      if (action === 'bet') amount = pickPostflopBet(centerPot, blindLevel);
    } else if (toCall > 0) {
      const r = Math.random();
      action = r < 0.30 ? 'fold' : r < 0.75 ? 'call' : 'raise';
      if (action === 'raise') amount = pickRaiseAmount(currentBet, 'reRaise');
    } else {
      action = 'check';
    }

    if (action === 'check') {
      // no log

    } else if (action === 'bet') {
      bets[player] = amount;
      log.push(`${player} bets $${amount}`);
      lastAggressor = player;
      currentBet = amount;

    } else if (action === 'fold') {
      foldedSet.add(player);
      log.push(`${player} folds`);

    } else if (action === 'call') {
      bets[player] = currentBet;
      log.push(`${player} calls $${currentBet}`);

    } else {
      // Re-raise: log it (any prior players with outstanding balance respond in post-ask)
      bets[player] = amount;
      log.push(`${player} re-raises to $${amount}`);
      lastAggressor = player;
      currentBet = amount;
    }
  }

  // Need at least one bet before the ask
  if (!lastAggressor) {
    if (priorActors.length > 0) {
      const firstActor = priorActors[0];
      const betAmt = pickPostflopBet(centerPot, blindLevel);
      bets[firstActor] = betAmt;
      log.unshift(`${firstActor} bets $${betAmt}`);
      lastAggressor = firstActor;
      currentBet = betAmt;
    } else {
      return null;
    }
  }

  const correctAnswer = calcPot(centerPot, bets, requester, lastAggressor);
  const explanation = buildExplanation(centerPot, bets, requester, lastAggressor, street);
  const nextRemaining = remainingPlayers.filter(p => !foldedSet.has(p));
  const players = buildPlayers(bets, foldedSet, requester, stacks);
  const newCenterPot = computeNewCenterPot(centerPot, bets, nextRemaining, correctAnswer);

  const actionLog = [...historicalLog, street.toUpperCase(), ...log];
  const postAskLines = buildPostAskLines(requester, foldedSet, nextRemaining, correctAnswer);
  const accumulatedLog = [...actionLog, ...postAskLines];

  return {
    askMoment: { street, communityCards, centerPot, players, actionLog, requesterName: requester, correctAnswer, explanation },
    remainingPlayers: nextRemaining,
    newCenterPot,
    accumulatedLog,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Easy     → 2–3 independent preflop ask moments
 * Medium   → preflop (1 ask) + flop (1 ask)
 * Advanced → preflop + flop + turn + river (1 ask each)
 */
export function generateHand(
  difficulty: PLODifficulty,
  blindLevel: number,
): GeneratedHand {
  const base = STARTING_STACKS[blindLevel] ?? STARTING_STACKS[2];

  if (difficulty === 'easy') {
    const count = 2 + Math.floor(Math.random() * 2);
    const askMoments: AskMoment[] = [];
    for (let i = 0; i < count; i++) {
      const stacks = [...base].sort(() => Math.random() - 0.5);
      askMoments.push(generatePreflopMoment(blindLevel, stacks).askMoment);
    }
    return { blindLevel, askMoments };
  }

  const stacks = [...base].sort(() => Math.random() - 0.5);
  const askMoments: AskMoment[] = [];

  const preflop = generatePreflopMoment(blindLevel, stacks);
  askMoments.push(preflop.askMoment);

  if (preflop.remainingPlayers.length >= 2) {
    const flop = generatePostflopMoment(
      'flop', 3, preflop.remainingPlayers, preflop.newCenterPot,
      stacks, blindLevel, preflop.accumulatedLog,
    );
    if (flop) {
      askMoments.push(flop.askMoment);

      if (difficulty === 'advanced' && flop.remainingPlayers.length >= 2) {
        const turn = generatePostflopMoment(
          'turn', 4, flop.remainingPlayers, flop.newCenterPot,
          stacks, blindLevel, flop.accumulatedLog,
        );
        if (turn) {
          askMoments.push(turn.askMoment);

          if (turn.remainingPlayers.length >= 2) {
            const river = generatePostflopMoment(
              'river', 5, turn.remainingPlayers, turn.newCenterPot,
              stacks, blindLevel, turn.accumulatedLog,
            );
            if (river) askMoments.push(river.askMoment);
          }
        }
      }
    }
  }

  if (askMoments.length === 0) return generateHand(difficulty, blindLevel);
  return { blindLevel, askMoments };
}

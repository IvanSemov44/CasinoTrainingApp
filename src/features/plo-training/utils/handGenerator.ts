/**
 * PLO Hand Generator
 *
 * Produces realistic Pot Limit Omaha hands. Action flows preflop → flop → turn.
 * At one point each street the action freezes because a player is about to
 * pot-raise and asks the dealer: "How much is pot?"
 *
 * Rules baked in:
 *  - ONLY players who intend to pot-raise ask the dealer.
 *  - Callers NEVER ask; they just call.
 *  - After asking, the player always pots (that's the whole point of asking).
 *  - Players can limp (call the blind) preflop.
 *  - Non-requesters can raise to any valid size (not necessarily pot-sized).
 *  - A player who called $X and later folded to a re-raise keeps their chips
 *    visible on the table as dead money (isFolded=true, betAmount=$X).
 *
 * Formula: Pot = Dead Money + 3 × Last Action
 *  Dead money = centerPot + all current-street bets EXCEPT the requester's
 *               AND the last aggressor's.
 *
 * Key fix: when a re-raise happens, ALL pending players are resolved —
 * this includes both callers AND the previous raiser (who must now call or fold).
 */

import { getRandomElement } from '@utils/randomUtils';
import type { PLODifficulty, HandPlayerState, AskMoment, GeneratedHand } from '../types';

// ─── Table layout ────────────────────────────────────────────────────────────

const POSITION_SLOT: Record<string, number> = {
  CO: 1, MP: 2, UTG: 3, BB: 4, SB: 5, D: 6,
};

const ALL_POSITIONS = ['SB', 'BB', 'UTG', 'MP', 'CO', 'D'] as const;

// Preflop: UTG is first to act, BB has last option
const PREFLOP_ORDER = ['UTG', 'MP', 'CO', 'D', 'SB', 'BB'] as const;

// Post-flop: SB is first active player, D acts last
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

/** Non-requester raise size: clean integer multiples. */
function pickRaiseAmount(currentBet: number, phase: 'first' | 'reRaise'): number {
  if (phase === 'first') {
    return currentBet * getRandomElement([2, 3, 4]);
  }
  return currentBet * getRandomElement([2, 3]);
}

function pickPostflopBet(centerPot: number, blindLevel: number): number {
  const fraction = getRandomElement([0.5, 0.67, 1.0]);
  const raw = Math.round(centerPot * fraction);
  return Math.max(Math.round(raw / blindLevel) * blindLevel, blindLevel * 2);
}

// ─── Re-raise resolution ─────────────────────────────────────────────────────

/**
 * When a new raise arrives, every player who already has chips in front and
 * hasn't folded must decide again: call the new amount or fold.
 * This includes both callers AND the previous raiser.
 *
 * Returns which players ended up calling (for adding back to pendingResolution).
 */
function resolveReRaise(
  toResolve: string[],
  raiseAmt: number,
  foldedSet: Set<string>,
  bets: Record<string, number>,
  log: string[],
  foldProbability: number,
): string[] {
  const calledPlayers: string[] = [];
  for (const p of toResolve) {
    if (foldedSet.has(p)) continue;
    if (Math.random() < foldProbability) {
      foldedSet.add(p);
      log.push(`${p} folds`);
      // bets[p] intentionally left as-is (dead money stays visible on table)
    } else {
      bets[p] = raiseAmt;
      log.push(`${p} calls $${raiseAmt}`);
      calledPlayers.push(p);
    }
  }
  return calledPlayers;
}

// ─── Core pot formula ────────────────────────────────────────────────────────

/**
 * Pot = Dead Money + 3 × Last Action
 * Dead money = centerPot + all current-street bets EXCEPT requester and last aggressor
 */
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

/** Total chips collected for the NEXT street's center pot. */
function computeNewCenterPot(
  centerPot: number,
  bets: Record<string, number>,
  requester: string,
  lastAggressor: string,
  correctAnswer: number,
): number {
  let streetTotal = 0;
  for (const [p, bet] of Object.entries(bets)) {
    streetTotal += (p === requester || p === lastAggressor) ? correctAnswer : bet;
  }
  return centerPot + streetTotal;
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
  const lines: string[] = [street.toUpperCase()];

  if (requesterBet > 0) {
    lines.push(`${requester} has $${requesterBet} in front → excluded from dead money`);
  }
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

  /**
   * pendingResolution: tracks ALL players who have chips committed in the current
   * betting round (callers + the current raiser). When a new raise arrives,
   * every player in this list (except the new raiser) must call or fold.
   * This fixes the bug where the previous raiser (e.g. UTG) was never given
   * a choice when a subsequent player (e.g. CO) re-raised.
   */
  const pendingResolution: string[] = [];

  // ── Choose requester ──────────────────────────────────────────────────────
  // UTG=5%  MP=10%  CO=20%  D=25%  SB=15%  BB=25%
  const requester = weightedPick(PREFLOP_ORDER, [0.05, 0.10, 0.20, 0.25, 0.15, 0.25]);
  const requesterIdx = PREFLOP_ORDER.indexOf(requester);

  // ── Generate actions for every player who acts BEFORE the requester ────────
  for (let i = 0; i < requesterIdx; i++) {
    const player = PREFLOP_ORDER[i];
    const myBet = bets[player] ?? 0;
    const toCall = currentBet - myBet;
    const firstRaiseHappened = lastAggressor !== 'BB';

    let action: 'fold' | 'call' | 'raise';
    let raiseAmt = 0;

    if (!firstRaiseHappened && myBet === 0) {
      // Opener: fold 15%, limp 20%, raise 65%
      const r = Math.random();
      if (r < 0.15)      { action = 'fold'; }
      else if (r < 0.35) { action = 'call'; }
      else               { action = 'raise'; raiseAmt = pickRaiseAmount(currentBet, 'first'); }

    } else if (!firstRaiseHappened && myBet === blindLevel) {
      // SB/BB with blind already in, no raise yet → fold 25%, check 20%, raise 55%
      const r = Math.random();
      if (r < 0.25)      { action = 'fold'; }
      else if (r < 0.45) { action = 'call'; }
      else               { action = 'raise'; raiseAmt = pickRaiseAmount(currentBet, 'first'); }

    } else if (toCall > 0) {
      // Facing a raise: fold 35%, call 40%, re-raise 25%
      const r = Math.random();
      if (r < 0.35)      { action = 'fold'; }
      else if (r < 0.75) { action = 'call'; }
      else               { action = 'raise'; raiseAmt = pickRaiseAmount(currentBet, 'reRaise'); }

    } else {
      // Already matched (BB option with no raise) — check
      action = 'call';
    }

    // ── Apply action ─────────────────────────────────────────────────────────
    if (action === 'fold') {
      foldedSet.add(player);
      log.push(`${player} folds`);
      // Remove from pending if they were there
      const idx = pendingResolution.indexOf(player);
      if (idx >= 0) pendingResolution.splice(idx, 1);

    } else if (action === 'call') {
      if (toCall > 0) {
        bets[player] = currentBet;
        log.push(`${player} calls $${currentBet}`);
      }
      // track as pending — if someone re-raises, they must decide again
      if (!pendingResolution.includes(player)) pendingResolution.push(player);

    } else {
      // ── Raise / Re-raise ──────────────────────────────────────────────────
      // Resolve ALL pending players (callers + previous raiser) before applying
      const toResolve = pendingResolution.filter(p => p !== player);
      const calledPlayers = resolveReRaise(toResolve, raiseAmt, foldedSet, bets, log, 0.60);

      // Reset pending: start fresh with whoever called
      pendingResolution.length = 0;
      pendingResolution.push(...calledPlayers);

      bets[player] = raiseAmt;
      log.push(`${player} ${lastAggressor === 'BB' ? 'raises' : 're-raises'} to $${raiseAmt}`);
      lastAggressor = player;
      currentBet = raiseAmt;

      // The raiser is now pending — a future re-raise would require them to respond
      pendingResolution.push(player);
    }
  }

  const correctAnswer = calcPot(0, bets, requester, lastAggressor);
  const explanation = buildExplanation(0, bets, requester, lastAggressor, 'preflop');
  const players = buildPlayers(bets, foldedSet, requester, stacks);
  const newCenterPot = computeNewCenterPot(0, bets, requester, lastAggressor, correctAnswer);

  const active = (ALL_POSITIONS as readonly string[]).filter(
    p => !foldedSet.has(p) && p !== requester && p !== lastAggressor,
  );
  const extraSurvivor = active.length > 0 && Math.random() < 0.4
    ? [getRandomElement(active)]
    : [];
  const remainingPlayers = [...new Set([requester, lastAggressor, ...extraSurvivor])];

  const accumulatedLog = ['PREFLOP', ...log];

  return {
    askMoment: {
      street: 'preflop',
      communityCards: 0,
      centerPot: 0,
      players,
      actionLog: accumulatedLog,
      requesterName: requester,
      correctAnswer,
      explanation,
    },
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
  const pendingResolution: string[] = [];

  let lastAggressor: string | null = null;
  let currentBet = 0;

  const orderedActors = (POSTFLOP_ORDER as readonly string[]).filter(
    p => remainingPlayers.includes(p),
  );

  const requesterIdx = Math.random() < 0.30
    ? 0
    : Math.floor(orderedActors.length * 0.5 + Math.random() * (orderedActors.length * 0.5));
  const requester = orderedActors[Math.min(requesterIdx, orderedActors.length - 1)];

  const priorActors = orderedActors.slice(0, orderedActors.indexOf(requester));

  for (const player of priorActors) {
    const toCall = currentBet - (bets[player] ?? 0);
    const betMade = lastAggressor !== null;

    let action: 'check' | 'bet' | 'fold' | 'call' | 'raise';
    let amount = 0;

    if (!betMade) {
      if (Math.random() < 0.40) { action = 'check'; }
      else { action = 'bet'; amount = pickPostflopBet(centerPot, blindLevel); }
    } else if (toCall > 0) {
      const r = Math.random();
      if (r < 0.30)      { action = 'fold'; }
      else if (r < 0.75) { action = 'call'; }
      else               { action = 'raise'; amount = pickRaiseAmount(currentBet, 'reRaise'); }
    } else {
      action = 'check';
    }

    if (action === 'check') {
      // No log entry (keeps log clean)
    } else if (action === 'bet') {
      bets[player] = amount;
      log.push(`${player} bets $${amount}`);
      lastAggressor = player;
      currentBet = amount;
      pendingResolution.push(player);

    } else if (action === 'fold') {
      foldedSet.add(player);
      log.push(`${player} folds`);
      const idx = pendingResolution.indexOf(player);
      if (idx >= 0) pendingResolution.splice(idx, 1);

    } else if (action === 'call') {
      bets[player] = currentBet;
      log.push(`${player} calls $${currentBet}`);
      if (!pendingResolution.includes(player)) pendingResolution.push(player);

    } else {
      // Re-raise: resolve all pending (callers + previous bettor/raiser)
      const toResolve = pendingResolution.filter(p => p !== player);
      const calledPlayers = resolveReRaise(toResolve, amount, foldedSet, bets, log, 0.55);

      pendingResolution.length = 0;
      pendingResolution.push(...calledPlayers);

      bets[player] = amount;
      log.push(`${player} re-raises to $${amount}`);
      lastAggressor = player;
      currentBet = amount;
      pendingResolution.push(player);
    }
  }

  // Need at least one bet/raise for a valid ask moment
  if (!lastAggressor) {
    if (priorActors.length > 0) {
      const firstActor = priorActors[0];
      const betAmt = pickPostflopBet(centerPot, blindLevel);
      bets[firstActor] = betAmt;
      log.unshift(`${firstActor} bets $${betAmt}`);
      lastAggressor = firstActor;
    } else {
      // Requester is first to act with no prior bet — can't ask
      return null;
    }
  }

  const correctAnswer = calcPot(centerPot, bets, requester, lastAggressor);
  const explanation = buildExplanation(centerPot, bets, requester, lastAggressor, street);
  const players = buildPlayers(bets, foldedSet, requester, stacks);
  const newCenterPot = computeNewCenterPot(centerPot, bets, requester, lastAggressor, correctAnswer);
  const nextRemaining = remainingPlayers.filter(p => !foldedSet.has(p));

  const accumulatedLog = [...historicalLog, street.toUpperCase(), ...log];

  return {
    askMoment: {
      street,
      communityCards,
      centerPot,
      players,
      actionLog: accumulatedLog,
      requesterName: requester,
      correctAnswer,
      explanation,
    },
    remainingPlayers: nextRemaining,
    newCenterPot,
    accumulatedLog,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Generate a complete PLO hand with 1–3 embedded ask moments.
 *
 * Easy     → preflop only   (1 ask)
 * Medium   → preflop + flop (1–2 asks)
 * Advanced → all streets    (1–3 asks)
 */
export function generateHand(
  difficulty: PLODifficulty,
  blindLevel: number,
): GeneratedHand {
  const base = STARTING_STACKS[blindLevel] ?? STARTING_STACKS[2];
  const stacks = [...base].sort(() => Math.random() - 0.5);

  const askMoments: AskMoment[] = [];

  // ── Preflop ──
  const preflop = generatePreflopMoment(blindLevel, stacks);
  askMoments.push(preflop.askMoment);

  if (difficulty === 'easy') return { blindLevel, askMoments };

  // ── Flop ──
  if (preflop.remainingPlayers.length >= 2) {
    const flop = generatePostflopMoment(
      'flop', 3,
      preflop.remainingPlayers,
      preflop.newCenterPot,
      stacks,
      blindLevel,
      preflop.accumulatedLog,
    );
    if (flop) {
      askMoments.push(flop.askMoment);

      // ── Turn (advanced only) ──
      if (difficulty === 'advanced' && flop.remainingPlayers.length >= 2) {
        const turn = generatePostflopMoment(
          'turn', 4,
          flop.remainingPlayers,
          flop.newCenterPot,
          stacks,
          blindLevel,
          flop.accumulatedLog,
        );
        if (turn) askMoments.push(turn.askMoment);
      }
    }
  }

  if (askMoments.length === 0) return generateHand(difficulty, blindLevel);

  return { blindLevel, askMoments };
}

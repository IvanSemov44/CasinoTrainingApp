import { PlayerAction, PotRequest, PotValidationResult } from '../types';
import { POSITIONS, BLIND_LEVELS, TRAINING_CONFIG } from '../constants/plo.constants';
import { getRandomElement, getRandomInt } from '@utils/randomUtils';

/**
 * Calculate the correct pot amount using dealer's shortcut formula:
 * Pot = (Dead Money) + 3 × (Last Action)
 */
export function calculatePotAmount(request: PotRequest): number {
  const { smallBlind, bigBlind, previousActions, requestingPosition } = request;

  // Find the last bet/raise action before the pot request
  let lastActionAmount = 0;
  for (let i = previousActions.length - 1; i >= 0; i--) {
    const action = previousActions[i];
    if (action.position === requestingPosition) {
      // Found requesting player's last action, stop before it
      break;
    }
    if ((action.action === 'bet' || action.action === 'raise') && action.amount) {
      lastActionAmount = action.amount;
      break;
    }
  }

  // Calculate dead money (all money from folded/called players, excluding requesting player's own money)
  let deadMoney = smallBlind + bigBlind;
  for (const action of previousActions) {
    if (action.position === requestingPosition) {
      // Don't count requesting player's own money
      continue;
    }
    if ((action.action === 'bet' || action.action === 'raise' || action.action === 'call') && action.amount) {
      deadMoney += action.amount;
    }
  }

  // Dealer's formula: Dead Money + 3 × Last Action
  return deadMoney + (3 * lastActionAmount);
}

/**
 * Validate user's answer against correct pot calculation
 */
export function validatePotAnswer(
  request: PotRequest,
  userAnswer: number
): PotValidationResult {
  const correctAnswer = calculatePotAmount(request);
  const isCorrect = userAnswer === correctAnswer;

  // Build explanation
  const lastAction = request.previousActions
    .filter(a => a.position !== request.requestingPosition && (a.action === 'bet' || a.action === 'raise'))
    .pop();

  const deadMoney = request.smallBlind + request.bigBlind + 
    request.previousActions
      .filter(a => a.position !== request.requestingPosition && a.amount)
      .reduce((sum, a) => sum + (a.amount || 0), 0);

  const lastActionAmount = lastAction?.amount || 0;

  const explanation = isCorrect
    ? `Correct! Dead money ($${deadMoney}) + 3×$${lastActionAmount} = $${correctAnswer}`
    : `Incorrect. Dead money is $${deadMoney}, last action is $${lastActionAmount}. Formula: $${deadMoney} + 3×$${lastActionAmount} = $${correctAnswer}`;

  return {
    isCorrect,
    userAnswer,
    correctAnswer,
    explanation,
  };
}

/**
 * Generate a random pot request scenario
 */
export function generateRandomPotRequest(): PotRequest {
  // Random blind level
  const blindLevel = getRandomElement(BLIND_LEVELS);
  
  // Random number of actions before pot request (2-4)
  const numActions = getRandomInt(TRAINING_CONFIG.minActions, TRAINING_CONFIG.maxActions);
  
  // Select random positions for actions
  const availablePositions = [...POSITIONS];
  const actions: PlayerAction[] = [];
  
  // First action is always a bet
  const firstPlayer = availablePositions[getRandomInt(2, 5)]; // UTG, MP, CO, or D
  const firstBetAmount = blindLevel.bb * getRandomInt(TRAINING_CONFIG.minBetMultiplier, TRAINING_CONFIG.maxBetMultiplier);
  actions.push({
    position: firstPlayer,
    action: 'bet',
    amount: firstBetAmount,
  });

  // Add subsequent actions
  let lastBetAmount = firstBetAmount;
  const actedPositions = [firstPlayer];
  
  for (let i = 1; i < numActions; i++) {
    const remainingPositions = availablePositions.filter(p => !actedPositions.includes(p));
    if (remainingPositions.length === 0) break;
    
    const position = getRandomElement(remainingPositions);
    actedPositions.push(position);
    
    // Random action: fold or raise
    const actionType = Math.random() > 0.3 ? 'raise' : 'fold';
    
    if (actionType === 'fold') {
      actions.push({
        position,
        action: 'fold',
      });
    } else {
      // Raise to pot or bigger
      const raiseAmount = lastBetAmount * getRandomInt(2, 4);
      actions.push({
        position,
        action: 'raise',
        amount: raiseAmount,
      });
      lastBetAmount = raiseAmount;
    }
  }

  // Select a random player to request pot (must have acted or be SB/BB)
  const potentialRequesters = availablePositions.filter(p => 
    !actedPositions.includes(p) || p === 'SB' || p === 'BB'
  );
  const requestingPosition = getRandomElement(potentialRequesters);

  return {
    requestingPosition,
    previousActions: actions,
    smallBlind: blindLevel.sb,
    bigBlind: blindLevel.bb,
  };
}

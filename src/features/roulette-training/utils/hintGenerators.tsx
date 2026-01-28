import React, { JSX } from 'react';
import { Text } from 'react-native';
import type { Bet, BetType } from '../types/exercise.types';
import type { RouletteNumber } from '@app-types/roulette.types';
import { getBetTypeName } from './exerciseHelpers';
import { exerciseTextStyles } from './exerciseStyles';

/**
 * Generate payout information for allowed bet types
 */
export function generatePayoutInfo(allowedBetTypes: BetType[]): string {
  const payouts: Record<BetType, string> = {
    STRAIGHT: '• Straight up: chips × 35',
    SPLIT: '• Split: chips × 17',
    CORNER: '• Corner: chips × 8',
    STREET: '• Street: chips × 11',
    SIX_LINE: '• Six Line: chips × 5',
  };

  return allowedBetTypes
    .map(type => payouts[type])
    .filter(Boolean)
    .join('\n');
}

/**
 * Format bet numbers for display
 */
function formatBetNumbers(bet: Bet): string {
  return bet.type === 'STRAIGHT' ? String(bet.numbers[0]) : bet.numbers.join('-');
}

/**
 * Generate single bet hint (for focused practice)
 */
export function generateSingleBetHint(
  betConfig: any,
  bet: Bet
): React.ReactElement {
  return (
    <>
      {betConfig.hintText}{'\n\n'}
      {betConfig.name} <Text style={exerciseTextStyles.highlightNumber}>{betConfig.formatNumbers(bet.numbers)}</Text> has{' '}
      <Text style={exerciseTextStyles.highlightChips}>{bet.chips}</Text>{' '}
      {bet.chips === 1 ? 'chip' : 'chips'} on it.
    </>
  );
}

/**
 * Generate payout calculation hint
 */
export function generatePayoutHint(
  winningNumber: RouletteNumber,
  bets: Bet[],
  allowedBetTypes: BetType[]
): React.ReactElement {
  return (
    <>
      • Winning number: <Text style={exerciseTextStyles.highlightNumber}>{winningNumber}</Text>{'\n'}
      • Calculate total payout for all winning bets{'\n'}
      {generatePayoutInfo(allowedBetTypes)}{'\n'}
      • Add all payouts together{'\n\n'}
      <Text style={exerciseTextStyles.hintTitle}>Bets on winning number:{'\n'}</Text>
      {bets.map((bet, index) => (
        <Text key={index} style={exerciseTextStyles.hintBet}>
          {index + 1}. {getBetTypeName(bet.type)}{' '}
          <Text style={exerciseTextStyles.highlightNumber}>{formatBetNumbers(bet)}</Text>
          {' with '}
          <Text style={exerciseTextStyles.highlightChips}>{bet.chips}</Text>
          {' '}{bet.chips === 1 ? 'chip' : 'chips'}{'\n'}
        </Text>
      ))}
    </>
  );
}

/**
 * Generate cash handling hint
 */
export function generateCashHandlingHint(
  winningNumber: RouletteNumber,
  bets: Bet[],
  cashConfig: any,
  remainingChips: number,
  cashRequest: number
): React.ReactElement {
  const totalChips = bets.reduce((sum, b) => sum + (b.chips * b.payout), 0);
  const totalCash = totalChips * cashConfig.denomination;

  return (
    <>
      • Winning number: <Text style={exerciseTextStyles.highlightNumber}>{winningNumber}</Text>{'\n'}
      {bets.map((bet, index) => (
        <Text key={index}>
          • {getBetTypeName(bet.type)}{' '}
          <Text style={exerciseTextStyles.highlightNumber}>{formatBetNumbers(bet)}</Text>
          {': '}
          <Text style={exerciseTextStyles.highlightChips}>{bet.chips}</Text>
          {' × '}{bet.payout} = {bet.chips * bet.payout} chips{'\n'}
        </Text>
      ))}
      • Total payout: <Text style={exerciseTextStyles.highlightNumber}>{totalChips} chips</Text>{'\n'}
      • Total cash value: <Text style={exerciseTextStyles.highlightNumber}>${totalCash}</Text>{'\n'}
      {'\n'}
      <Text style={exerciseTextStyles.hintTitle}>Cash Handling:{'\n'}</Text>
      • Total must equal: <Text style={exerciseTextStyles.highlightNumber}>${totalCash}</Text>{'\n'}
      • Formula: (Chips × ${cashConfig.denomination}) + Cash = Total{'\n'}
      • Therefore: {remainingChips} chips (${remainingChips * cashConfig.denomination}) + ${cashRequest} cash = ${totalCash}{'\n'}
    </>
  );
}

/**
 * Main hint generator that selects appropriate hint based on context
 */
export function generateHintContent(
  questionType: 'ASK_PAYOUT' | 'ASK_CHIPS' | 'ASK_CASH',
  isSingleBet: boolean,
  bets: Bet[],
  winningNumber: RouletteNumber,
  allowedBetTypes: BetType[],
  cashConfig?: any,
  betConfig?: any,
  remainingChips?: number,
  cashRequest?: number
): React.ReactElement {
  // Add chip denomination info if cash config exists
  const cashDenominationInfo = cashConfig ? (
    <>
      • Chip denomination: <Text style={exerciseTextStyles.highlightNumber}>${cashConfig.denomination}</Text>{'\n'}
    </>
  ) : null;

  // Single bet focused practice
  if (isSingleBet && betConfig && questionType === 'ASK_PAYOUT') {
    return (
      <>
        {cashDenominationInfo}
        {generateSingleBetHint(betConfig, bets[0])}
      </>
    );
  }

  // Multiple bets payout calculation
  if (questionType === 'ASK_PAYOUT') {
    return (
      <>
        {cashDenominationInfo}
        {generatePayoutHint(winningNumber, bets, allowedBetTypes)}
      </>
    );
  }

  // Cash handling questions
  return (
    <>
      {cashDenominationInfo}
      {generateCashHandlingHint(winningNumber, bets, cashConfig, remainingChips!, cashRequest!)}
    </>
  );
}

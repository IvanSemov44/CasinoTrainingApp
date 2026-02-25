/**
 * Test Data Builders for Casino Training App
 * Use the builder pattern to create test data fluently
 */

import { CashRequest, CashAnswer } from '../features/cash-conversion-training/types';
import { PotRequest, Position, PlayerAction, PlayerActionType } from '../features/plo-training/types';
import { BetType, RouletteNumber, Bet, PlacedBet } from '../types/roulette.types';

// ============================================
// Cash Request Builder
// ============================================

export class CashRequestBuilder {
  private request: Partial<CashRequest> = {
    cashAmount: 300,
    sector: 'tier',
    requestType: 'for-the-money',
  };

  withAmount(amount: number): this {
    this.request.cashAmount = amount;
    return this;
  }

  withSector(sector: 'tier' | 'voisins' | 'orphelins' | 'zero' | 'neighbors'): this {
    this.request.sector = sector;
    return this;
  }

  withRequestType(type: 'for-the-money' | 'by-amount'): this {
    this.request.requestType = type;
    return this;
  }

  withSpecifiedAmount(amount: number): this {
    this.request.specifiedAmount = amount;
    return this;
  }

  build(): CashRequest {
    return this.request as CashRequest;
  }
}

// ============================================
// Cash Answer Builder
// ============================================

export class CashAnswerBuilder {
  private answer: Partial<CashAnswer> = {
    totalBet: 300,
    betPerPosition: 50,
    change: 0,
  };

  withTotalBet(total: number): this {
    this.answer.totalBet = total;
    return this;
  }

  withBetPerPosition(amount: number): this {
    this.answer.betPerPosition = amount;
    return this;
  }

  withChange(change: number): this {
    this.answer.change = change;
    return this;
  }

  build(): CashAnswer {
    return this.answer as CashAnswer;
  }
}

// ============================================
// Pot Request Builder
// ============================================

export class PotRequestBuilder {
  private request: Partial<PotRequest> = {
    requestingPosition: 'BB',
    previousActions: [],
    smallBlind: 1,
    bigBlind: 2,
  };

  withRequestingPosition(position: Position): this {
    this.request.requestingPosition = position;
    return this;
  }

  withSmallBlind(amount: number): this {
    this.request.smallBlind = amount;
    return this;
  }

  withBigBlind(amount: number): this {
    this.request.bigBlind = amount;
    return this;
  }

  addAction(position: Position, action: PlayerActionType, amount?: number): this {
    const actions = this.request.previousActions || [];
    actions.push({ position, action, amount });
    this.request.previousActions = actions;
    return this;
  }

  withActions(actions: PlayerAction[]): this {
    this.request.previousActions = actions;
    return this;
  }

  build(): PotRequest {
    return this.request as PotRequest;
  }
}

// ============================================
// Bet Builder
// ============================================

export class BetBuilder {
  private bet: Partial<Bet> = {
    id: `bet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: BetType.STRAIGHT,
    numbers: [5] as RouletteNumber[],
    amount: 10,
    payout: 35,
  };

  withId(id: string): this {
    this.bet.id = id;
    return this;
  }

  withType(type: BetType): this {
    this.bet.type = type;
    return this;
  }

  withNumbers(numbers: RouletteNumber[]): this {
    this.bet.numbers = numbers;
    return this;
  }

  withAmount(amount: number): this {
    this.bet.amount = amount;
    return this;
  }

  withPayout(payout: number): this {
    this.bet.payout = payout;
    return this;
  }

  asStraight(number: RouletteNumber, amount: number = 10): this {
    return this.withType(BetType.STRAIGHT)
      .withNumbers([number])
      .withAmount(amount)
      .withPayout(35);
  }

  asSplit(numbers: [RouletteNumber, RouletteNumber], amount: number = 10): this {
    return this.withType(BetType.SPLIT)
      .withNumbers(numbers)
      .withAmount(amount)
      .withPayout(17);
  }

  asStreet(numbers: [RouletteNumber, RouletteNumber, RouletteNumber], amount: number = 10): this {
    return this.withType(BetType.STREET)
      .withNumbers(numbers)
      .withAmount(amount)
      .withPayout(11);
  }

  asCorner(numbers: RouletteNumber[], amount: number = 10): this {
    return this.withType(BetType.CORNER)
      .withNumbers(numbers)
      .withAmount(amount)
      .withPayout(8);
  }

  asLine(numbers: RouletteNumber[], amount: number = 10): this {
    return this.withType(BetType.LINE)
      .withNumbers(numbers)
      .withAmount(amount)
      .withPayout(5);
  }

  build(): Bet {
    return this.bet as Bet;
  }
}

// ============================================
// Placed Bet Builder (extends Bet with timestamp)
// ============================================

export class PlacedBetBuilder extends BetBuilder {
  private placedBet: Partial<PlacedBet> = {
    timestamp: Date.now(),
  };

  withTimestamp(timestamp: number): this {
    this.placedBet.timestamp = timestamp;
    return this;
  }

  withCorrect(isCorrect: boolean): this {
    this.placedBet.isCorrect = isCorrect;
    return this;
  }

  build(): PlacedBet {
    const baseBet = super.build();
    return {
      ...baseBet,
      timestamp: this.placedBet.timestamp || Date.now(),
      isCorrect: this.placedBet.isCorrect,
    } as PlacedBet;
  }
}

// ============================================
// Helper Functions
// ============================================

/**
 * Create multiple bets at once
 */
export const createBets = (count: number, overrides?: Partial<Bet>): Bet[] => {
  return Array.from({ length: count }, (_, i) => {
    const builder = new BetBuilder();
    if (overrides) {
      Object.entries(overrides).forEach(([key, value]) => {
        (builder as any)[`with${key.charAt(0).toUpperCase() + key.slice(1)}`]?.(value);
      });
    }
    return builder.withId(`bet-${i}`).build();
  });
};

/**
 * Create a random roulette number
 */
export const createRandomRouletteNumber = (): RouletteNumber => {
  return Math.floor(Math.random() * 37) as RouletteNumber;
};

/**
 * Create random chip value from standard set
 */
export const createRandomChipValue = (): number => {
  const chipValues = [1, 5, 10, 25, 100, 500, 1000];
  return chipValues[Math.floor(Math.random() * chipValues.length)];
};

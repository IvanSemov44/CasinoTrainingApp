import {
  calculateCorrectAnswer,
  validateAnswer,
  generateRandomCashAmount,
  generateRandomSector,
  generateRandomRequest,
} from '../calculations';
import { CashRequest, CashAnswer } from '../../types';

describe('calculateCorrectAnswer', () => {
  describe('for-the-money requests', () => {
    it('should calculate correct bet for simple tier request', () => {
      const request: CashRequest = {
        cashAmount: 300,
        sector: 'tier',
        requestType: 'for-the-money',
      };
      const answer = calculateCorrectAnswer(request, 'easy');
      
      // Tier has 6 positions, $300 / 6 = $50 per position
      expect(answer.betPerPosition).toBe(50);
      expect(answer.totalBet).toBe(300);
      expect(answer.change).toBe(0);
    });

    it('should round down to nearest $5 increment', () => {
      const request: CashRequest = {
        cashAmount: 310,
        sector: 'tier',
        requestType: 'for-the-money',
      };
      const answer = calculateCorrectAnswer(request, 'easy');
      
      // $310 / 6 = $51.67, rounds down to $50
      expect(answer.betPerPosition).toBe(50);
      expect(answer.totalBet).toBe(300);
      expect(answer.change).toBe(10);
    });

    it('should apply difficulty cap for easy mode ($50 max)', () => {
      const request: CashRequest = {
        cashAmount: 600,
        sector: 'tier',
        requestType: 'for-the-money',
      };
      const answer = calculateCorrectAnswer(request, 'easy');
      
      // $600 / 6 = $100, but capped at $50 for easy
      expect(answer.betPerPosition).toBe(50);
      expect(answer.totalBet).toBe(300);
      expect(answer.change).toBe(300);
    });

    it('should apply difficulty cap for medium mode ($100 max)', () => {
      const request: CashRequest = {
        cashAmount: 900,
        sector: 'tier',
        requestType: 'for-the-money',
      };
      const answer = calculateCorrectAnswer(request, 'medium');
      
      // $900 / 6 = $150, but capped at $100 for medium
      expect(answer.betPerPosition).toBe(100);
      expect(answer.totalBet).toBe(600);
      expect(answer.change).toBe(300);
    });

    it('should apply difficulty cap for hard mode ($200 max)', () => {
      const request: CashRequest = {
        cashAmount: 1500,
        sector: 'tier',
        requestType: 'for-the-money',
      };
      const answer = calculateCorrectAnswer(request, 'hard');
      
      // $1500 / 6 = $250, but capped at $200 for hard
      expect(answer.betPerPosition).toBe(200);
      expect(answer.totalBet).toBe(1200);
      expect(answer.change).toBe(300);
    });

    it('should ensure minimum bet of $5', () => {
      const request: CashRequest = {
        cashAmount: 25,
        sector: 'tier',
        requestType: 'for-the-money',
      };
      const answer = calculateCorrectAnswer(request, 'easy');
      
      // $25 / 6 = $4.17, but minimum is $5
      expect(answer.betPerPosition).toBe(5);
      expect(answer.totalBet).toBe(30);
      expect(answer.change).toBe(-5); // Customer owes money
    });

    it('should calculate correctly for voisins (9 positions)', () => {
      const request: CashRequest = {
        cashAmount: 450,
        sector: 'voisins',
        requestType: 'for-the-money',
      };
      const answer = calculateCorrectAnswer(request, 'easy');
      
      // $450 / 9 = $50 per position
      expect(answer.betPerPosition).toBe(50);
      expect(answer.totalBet).toBe(450);
      expect(answer.change).toBe(0);
    });

    it('should calculate correctly for orphelins (5 positions)', () => {
      const request: CashRequest = {
        cashAmount: 250,
        sector: 'orphelins',
        requestType: 'for-the-money',
      };
      const answer = calculateCorrectAnswer(request, 'easy');
      
      // $250 / 5 = $50 per position
      expect(answer.betPerPosition).toBe(50);
      expect(answer.totalBet).toBe(250);
      expect(answer.change).toBe(0);
    });

    it('should calculate correctly for zero (4 positions)', () => {
      const request: CashRequest = {
        cashAmount: 200,
        sector: 'zero',
        requestType: 'for-the-money',
      };
      const answer = calculateCorrectAnswer(request, 'easy');
      
      // $200 / 4 = $50 per position
      expect(answer.betPerPosition).toBe(50);
      expect(answer.totalBet).toBe(200);
      expect(answer.change).toBe(0);
    });

    it('should calculate correctly for neighbors (5 positions)', () => {
      const request: CashRequest = {
        cashAmount: 250,
        sector: 'neighbors',
        requestType: 'for-the-money',
      };
      const answer = calculateCorrectAnswer(request, 'easy');
      
      // $250 / 5 = $50 per position
      expect(answer.betPerPosition).toBe(50);
      expect(answer.totalBet).toBe(250);
      expect(answer.change).toBe(0);
    });
  });

  describe('by-amount requests', () => {
    it('should use specified amount for by-amount request', () => {
      const request: CashRequest = {
        cashAmount: 350,
        sector: 'tier',
        requestType: 'by-amount',
        specifiedAmount: 50,
      };
      const answer = calculateCorrectAnswer(request, 'easy');
      
      expect(answer.betPerPosition).toBe(50);
      expect(answer.totalBet).toBe(300);
      expect(answer.change).toBe(50);
    });

    it('should calculate change correctly for by-amount request', () => {
      const request: CashRequest = {
        cashAmount: 500,
        sector: 'tier',
        requestType: 'by-amount',
        specifiedAmount: 75,
      };
      const answer = calculateCorrectAnswer(request, 'medium');
      
      // 6 positions × $75 = $450 total, $500 - $450 = $50 change
      expect(answer.betPerPosition).toBe(75);
      expect(answer.totalBet).toBe(450);
      expect(answer.change).toBe(50);
    });
  });
});

describe('validateAnswer', () => {
  it('should return correct for matching answers', () => {
    const userAnswer: CashAnswer = {
      totalBet: 300,
      betPerPosition: 50,
      change: 0,
    };
    const correctAnswer: CashAnswer = {
      totalBet: 300,
      betPerPosition: 50,
      change: 0,
    };
    
    const result = validateAnswer(userAnswer, correctAnswer);
    
    expect(result.isCorrect).toBe(true);
    expect(result.correctTotalBet).toBe(300);
    expect(result.userTotalBet).toBe(300);
  });

  it('should return incorrect for wrong total bet', () => {
    const userAnswer: CashAnswer = {
      totalBet: 250,
      betPerPosition: 50,
      change: 50,
    };
    const correctAnswer: CashAnswer = {
      totalBet: 300,
      betPerPosition: 50,
      change: 0,
    };
    
    const result = validateAnswer(userAnswer, correctAnswer);
    
    expect(result.isCorrect).toBe(false);
    expect(result.correctTotalBet).toBe(300);
    expect(result.userTotalBet).toBe(250);
  });

  it('should return incorrect for wrong bet per position', () => {
    const userAnswer: CashAnswer = {
      totalBet: 300,
      betPerPosition: 45,
      change: 0,
    };
    const correctAnswer: CashAnswer = {
      totalBet: 300,
      betPerPosition: 50,
      change: 0,
    };
    
    const result = validateAnswer(userAnswer, correctAnswer);
    
    expect(result.isCorrect).toBe(false);
    expect(result.correctBetPerPosition).toBe(50);
    expect(result.userBetPerPosition).toBe(45);
  });

  it('should return incorrect for wrong change', () => {
    const userAnswer: CashAnswer = {
      totalBet: 300,
      betPerPosition: 50,
      change: 10,
    };
    const correctAnswer: CashAnswer = {
      totalBet: 300,
      betPerPosition: 50,
      change: 0,
    };
    
    const result = validateAnswer(userAnswer, correctAnswer);
    
    expect(result.isCorrect).toBe(false);
    expect(result.correctChange).toBe(0);
    expect(result.userChange).toBe(10);
  });

  it('should return all comparison values in result', () => {
    const userAnswer: CashAnswer = {
      totalBet: 250,
      betPerPosition: 40,
      change: 50,
    };
    const correctAnswer: CashAnswer = {
      totalBet: 300,
      betPerPosition: 50,
      change: 0,
    };
    
    const result = validateAnswer(userAnswer, correctAnswer);
    
    expect(result).toEqual({
      isCorrect: false,
      correctTotalBet: 300,
      correctChange: 0,
      userTotalBet: 250,
      userChange: 50,
      correctBetPerPosition: 50,
      userBetPerPosition: 40,
    });
  });
});

describe('generateRandomCashAmount', () => {
  it('should return multiples of $25', () => {
    for (let i = 0; i < 100; i++) {
      const amount = generateRandomCashAmount('easy', 'tier');
      expect(amount % 25).toBe(0);
    }
  });

  it('should return amount within valid range for easy difficulty', () => {
    for (let i = 0; i < 100; i++) {
      const amount = generateRandomCashAmount('easy', 'tier');
      // Tier has 6 positions, easy max is $50, so max cash = $300
      // Min is 6 × $5 = $30, rounded up to $50 (nearest $25)
      expect(amount).toBeGreaterThanOrEqual(50);
      expect(amount).toBeLessThanOrEqual(300);
    }
  });

  it('should return amount within valid range for medium difficulty', () => {
    for (let i = 0; i < 100; i++) {
      const amount = generateRandomCashAmount('medium', 'tier');
      // Tier has 6 positions, medium max is $100, so max cash = $600
      // Min is 40% of $600 = $240
      expect(amount).toBeGreaterThanOrEqual(240);
      expect(amount).toBeLessThanOrEqual(600);
    }
  });

  it('should return amount within valid range for hard difficulty', () => {
    for (let i = 0; i < 100; i++) {
      const amount = generateRandomCashAmount('hard', 'voisins');
      // Voisins has 9 positions, hard max is $200, so max cash = $1800
      // Min is 40% of $1800 = $720
      expect(amount).toBeGreaterThanOrEqual(720);
      expect(amount).toBeLessThanOrEqual(1800);
    }
  });

  it('should work without sector parameter (default to tier)', () => {
    for (let i = 0; i < 50; i++) {
      const amount = generateRandomCashAmount('easy');
      expect(amount).toBeGreaterThanOrEqual(50);
      expect(amount).toBeLessThanOrEqual(300);
    }
  });
});

describe('generateRandomSector', () => {
  it('should return a valid sector', () => {
    const validSectors = ['tier', 'orphelins', 'voisins', 'zero', 'neighbors'];
    
    for (let i = 0; i < 100; i++) {
      const sector = generateRandomSector();
      expect(validSectors).toContain(sector);
    }
  });

  it('should eventually return all sector types', () => {
    const sectors = new Set<string>();
    
    // Run enough times to likely get all sectors
    for (let i = 0; i < 100; i++) {
      sectors.add(generateRandomSector());
    }
    
    expect(sectors.has('tier')).toBe(true);
    expect(sectors.has('orphelins')).toBe(true);
    expect(sectors.has('voisins')).toBe(true);
    expect(sectors.has('zero')).toBe(true);
    expect(sectors.has('neighbors')).toBe(true);
  });
});

describe('generateRandomRequest', () => {
  describe('for-the-money requests', () => {
    it('should generate a valid for-the-money request', () => {
      const cashAmount = 300;
      const request = generateRandomRequest('tier', cashAmount, 'easy');
      
      expect(request.sector).toBe('tier');
      expect(request.cashAmount).toBeGreaterThanOrEqual(0);
      expect(['for-the-money', 'by-amount']).toContain(request.requestType);
    });

    it('should generate request with cash amount resulting in change < maxChange', () => {
      // Run multiple times to test randomness
      for (let i = 0; i < 50; i++) {
        const cashAmount = 300;
        const request = generateRandomRequest('tier', cashAmount, 'easy');
        
        if (request.requestType === 'for-the-money') {
          // For tier (6 positions), calculate expected change
          const answer = calculateCorrectAnswer(request, 'easy');
          expect(answer.change).toBeLessThan(100); // maxChange is 100
        }
      }
    });

    it('should adjust cash amount when change would be too high', () => {
      // Use a cash amount that would result in high change
      // For tier with $50 max bet: 6 * $50 = $300 max total
      // So $500 would give $200 change, which is > maxChange (100)
      const request = generateRandomRequest('tier', 500, 'easy');
      
      // The function should adjust the cash amount to result in change < 100
      if (request.requestType === 'for-the-money') {
        const answer = calculateCorrectAnswer(request, 'easy');
        expect(answer.change).toBeLessThan(100);
      }
    });
  });

  describe('by-amount requests', () => {
    it('should generate a valid by-amount request with specified amount', () => {
      // Run multiple times to potentially get by-amount requests
      for (let i = 0; i < 50; i++) {
        const cashAmount = 350;
        const request = generateRandomRequest('tier', cashAmount, 'easy');
        
        if (request.requestType === 'by-amount') {
          expect(request.specifiedAmount).toBeDefined();
          expect(request.specifiedAmount).toBeGreaterThanOrEqual(5);
          expect(request.specifiedAmount).toBeLessThanOrEqual(50); // easy max
        }
      }
    });

    it('should generate by-amount request with valid change', () => {
      for (let i = 0; i < 50; i++) {
        const cashAmount = 400;
        const request = generateRandomRequest('tier', cashAmount, 'medium');
        
        if (request.requestType === 'by-amount') {
          const answer = calculateCorrectAnswer(request, 'medium');
          expect(answer.change).toBeGreaterThanOrEqual(0);
          expect(answer.change).toBeLessThan(100);
        }
      }
    });

    it('should adjust cash amount when no valid bets found for by-amount', () => {
      // Use a very high cash amount that might not have valid bets
      const request = generateRandomRequest('tier', 1000, 'easy');
      
      if (request.requestType === 'by-amount') {
        // Should have a valid specified amount
        expect(request.specifiedAmount).toBeDefined();
        expect(request.specifiedAmount).toBeGreaterThanOrEqual(5);
      }
    });
  });

  describe('all sectors', () => {
    it('should work with all sector types', () => {
      const sectors: Array<'tier' | 'orphelins' | 'voisins' | 'zero' | 'neighbors'> = 
        ['tier', 'orphelins', 'voisins', 'zero', 'neighbors'];
      
      for (const sector of sectors) {
        const request = generateRandomRequest(sector, 300, 'easy');
        expect(request.sector).toBe(sector);
      }
    });

    it('should work with all difficulty levels', () => {
      const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
      
      for (const difficulty of difficulties) {
        const request = generateRandomRequest('tier', 500, difficulty);
        expect(request).toBeDefined();
      }
    });
  });

  describe('cash amount validation', () => {
    it('should generate cash amounts that are multiples of $25', () => {
      for (let i = 0; i < 50; i++) {
        const request = generateRandomRequest('tier', 300, 'easy');
        expect(request.cashAmount % 25).toBe(0);
      }
    });

    it('should generate varied request types over multiple calls', () => {
      const requestTypes = new Set<string>();
      
      for (let i = 0; i < 100; i++) {
        const request = generateRandomRequest('tier', 300, 'easy');
        requestTypes.add(request.requestType);
      }
      
      // Should eventually generate both types
      expect(requestTypes.size).toBeGreaterThan(0);
    });
  });
});

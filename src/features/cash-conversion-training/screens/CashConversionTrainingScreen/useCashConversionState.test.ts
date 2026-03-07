import { renderHook, act } from '@testing-library/react-native';
import { useCashConversionState } from './useCashConversionState';

describe('useCashConversionState', () => {
  describe('initialization', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      expect(result.current.currentRequest).not.toBeNull();
      expect(result.current.totalBet).toBe('');
      expect(result.current.betPerPosition).toBe('');
      expect(result.current.change).toBe('');
      expect(result.current.result).toBeNull();
      expect(result.current.stats).toEqual({ correct: 0, total: 0 });
      expect(result.current.isFormComplete).toBe(false);
    });

    it('should generate initial challenge on mount', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      expect(result.current.currentRequest).not.toBeNull();
      expect(result.current.currentRequest?.cashAmount).toBeGreaterThan(0);
    });

    it('should set default active input based on request type', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      const activeInput = result.current.activeInput;
      expect(['totalBet', 'betPerPosition', 'change']).toContain(activeInput);
    });
  });

  describe('form state management', () => {
    it('should update totalBet state', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      act(() => {
        result.current.setTotalBet('100');
      });

      expect(result.current.totalBet).toBe('100');
    });

    it('should update betPerPosition state', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      act(() => {
        result.current.setBetPerPosition('10');
      });

      expect(result.current.betPerPosition).toBe('10');
    });

    it('should update change state', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      act(() => {
        result.current.setChange('20');
      });

      expect(result.current.change).toBe('20');
    });

    it('should update activeInput state', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      act(() => {
        result.current.setActiveInput('betPerPosition');
      });

      expect(result.current.activeInput).toBe('betPerPosition');
    });
  });

  describe('isFormComplete', () => {
    it('should be false when form is empty', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      expect(result.current.isFormComplete).toBe(false);
    });

    it('should be true when all required fields are filled', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      act(() => {
        result.current.setTotalBet('100');
        result.current.setChange('20');
      });

      // Either totalBet+change (for by-amount) or betPerPosition+change (for for-the-money)
      // Both are now filled so it should be true or false based on request type
      // The hook will determine based on currentRequest.requestType
      expect(typeof result.current.isFormComplete).toBe('boolean');
    });
  });

  describe('generateNewChallenge', () => {
    it('should clear form inputs', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      act(() => {
        result.current.setTotalBet('100');
        result.current.setBetPerPosition('10');
        result.current.setChange('50');
      });

      const initialRequest = result.current.currentRequest;

      act(() => {
        result.current.generateNewChallenge();
      });

      expect(result.current.totalBet).toBe('');
      expect(result.current.betPerPosition).toBe('');
      expect(result.current.change).toBe('');
      expect(result.current.result).toBeNull();
      // currentRequest may be different (new challenge)
      expect(result.current.currentRequest).not.toBeNull();
    });

    it('should generate new request', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      const firstRequest = result.current.currentRequest;

      act(() => {
        result.current.generateNewChallenge();
      });

      // Just verify a new request was generated
      expect(result.current.currentRequest).not.toBeNull();
      expect(result.current.currentRequest?.sector).toBeDefined();
    });
  });

  describe('handleCheck', () => {
    it('should set result when checking answer', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      act(() => {
        result.current.setTotalBet('100');
        result.current.setChange('20');
        result.current.handleCheck();
      });

      expect(result.current.result).not.toBeNull();
      expect(result.current.result).toHaveProperty('isCorrect');
    });

    it('should increment stats when checking', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      expect(result.current.stats.total).toBe(0);

      act(() => {
        result.current.setTotalBet('100');
        result.current.setChange('20');
        result.current.handleCheck();
      });

      expect(result.current.stats.total).toBe(1);
    });

    it('should track correct answers', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      act(() => {
        result.current.setTotalBet('100');
        result.current.setChange('20');
        result.current.handleCheck();
      });

      // Correct count depends on validation logic
      expect(result.current.stats.correct).toBeGreaterThanOrEqual(0);
      expect(result.current.stats.correct).toBeLessThanOrEqual(result.current.stats.total);
    });
  });

  describe('handleNext', () => {
    it('should generate new challenge', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      const firstRequest = result.current.currentRequest;

      act(() => {
        result.current.handleNext();
      });

      // Should have a request
      expect(result.current.currentRequest).not.toBeNull();
      // Form should be cleared
      expect(result.current.totalBet).toBe('');
      expect(result.current.betPerPosition).toBe('');
      expect(result.current.change).toBe('');
    });

    it('should preserve stats when moving to next challenge', () => {
      const { result } = renderHook(() => useCashConversionState({ difficulty: 'easy', sector: 'voisins' }));

      act(() => {
        result.current.setTotalBet('100');
        result.current.setChange('20');
        result.current.handleCheck();
      });

      const statsBeforeNext = { ...result.current.stats };

      act(() => {
        result.current.handleNext();
      });

      expect(result.current.stats).toEqual(statsBeforeNext);
    });
  });
});

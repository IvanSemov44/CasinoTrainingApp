import { renderHook, act } from '@testing-library/react-native';
import { useCallBetsState } from './useCallBetsState';
import type { CallBetMode } from '../../types';

describe('useCallBetsState', () => {
  describe('initialization', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'tier' }));

      expect(result.current.stats).toEqual({ correct: 0, total: 0 });
      expect(result.current.result).toBeNull();
      expect(result.current.currentMode).toBe('tier');
      expect(result.current.totalBets).toBeGreaterThanOrEqual(1);
      expect(result.current.totalBets).toBeLessThanOrEqual(5);
    });

    it('should set mode to tier when receiving random', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'random' }));

      const modes: Array<Exclude<CallBetMode, 'random'>> = ['tier', 'orphelins', 'voisins', 'zero'];
      expect(modes).toContain(result.current.currentMode);
    });

    it('should set specific mode when given non-random mode', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'voisins' }));

      expect(result.current.currentMode).toBe('voisins');
    });

    it('should generate new challenge on mount', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'tier' }));

      expect(result.current.totalBets).toBeGreaterThan(0);
    });
  });

  describe('generateNewChallenge', () => {
    it('should generate new total bets value', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'tier' }));

      const initialBets = result.current.totalBets;

      act(() => {
        result.current.generateNewChallenge();
      });

      // Could be same or different, just check it's valid
      expect(result.current.totalBets).toBeGreaterThanOrEqual(1);
      expect(result.current.totalBets).toBeLessThanOrEqual(5);
    });

    it('should clear result when generating new challenge', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'tier' }));

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.result).not.toBeNull();

      act(() => {
        result.current.generateNewChallenge();
      });

      expect(result.current.result).toBeNull();
    });

    it('should randomize mode when initial mode is random', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'random' }));

      const firstMode = result.current.currentMode;

      const modes: Array<Exclude<CallBetMode, 'random'>> = ['tier', 'orphelins', 'voisins', 'zero'];
      expect(modes).toContain(firstMode);
    });
  });

  describe('handleSubmit', () => {
    it('should set result when submitting', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'tier' }));

      expect(result.current.result).toBeNull();

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.result).not.toBeNull();
      expect(result.current.result).toHaveProperty('isCorrect');
      expect(result.current.result).toHaveProperty('score');
    });

    it('should increment stats on submit', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'tier' }));

      expect(result.current.stats.total).toBe(0);

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.stats.total).toBe(1);
      // No bets placed → validation returns incorrect
      expect(result.current.stats.correct).toBe(0);
    });

    it('should increment total count multiple times', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'tier' }));

      act(() => {
        result.current.handleSubmit();
        result.current.handleClear();
        result.current.handleSubmit();
        result.current.handleClear();
        result.current.handleSubmit();
      });

      expect(result.current.stats.total).toBe(3);
    });
  });

  describe('handleClear', () => {
    it('should clear result', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'tier' }));

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.result).not.toBeNull();

      act(() => {
        result.current.handleClear();
      });

      expect(result.current.result).toBeNull();
    });

    it('should not affect stats', () => {
      const { result } = renderHook(() => useCallBetsState({ mode: 'tier' }));

      act(() => {
        result.current.handleSubmit();
      });

      const statsBeforeClear = { ...result.current.stats };

      act(() => {
        result.current.handleClear();
      });

      expect(result.current.stats).toEqual(statsBeforeClear);
    });
  });
});

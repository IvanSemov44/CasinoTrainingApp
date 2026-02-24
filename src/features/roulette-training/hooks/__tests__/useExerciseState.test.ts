/**
 * Unit tests for useExerciseState hook
 * Tests exercise state management for roulette training
 */
import { renderHook, act } from '@testing-library/react-native';
import { useExerciseState } from '../useExerciseState';

describe('useExerciseState', () => {
  describe('initialization', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useExerciseState());
      
      expect(result.current.userAnswer).toBe('');
      expect(result.current.score).toBe(0);
      expect(result.current.attempts).toBe(0);
      expect(result.current.showFeedback).toBe(false);
      expect(result.current.isCorrect).toBe(false);
      expect(result.current.showHint).toBe(false);
    });
  });

  describe('setUserAnswer', () => {
    it('should update user answer', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('42');
      });
      
      expect(result.current.userAnswer).toBe('42');
    });

    it('should allow empty answer', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('42');
      });
      
      act(() => {
        result.current.setUserAnswer('');
      });
      
      expect(result.current.userAnswer).toBe('');
    });
  });

  describe('checkAnswer', () => {
    it('should return true for correct answer', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('100');
      });
      
      let isCorrect: boolean;
      act(() => {
        isCorrect = result.current.checkAnswer(100);
      });
      
      expect(isCorrect!).toBe(true);
      expect(result.current.isCorrect).toBe(true);
    });

    it('should return false for incorrect answer', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('50');
      });
      
      let isCorrect: boolean;
      act(() => {
        isCorrect = result.current.checkAnswer(100);
      });
      
      expect(isCorrect!).toBe(false);
      expect(result.current.isCorrect).toBe(false);
    });

    it('should increment score on correct answer', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('100');
      });
      
      act(() => {
        result.current.checkAnswer(100);
      });
      
      expect(result.current.score).toBe(1);
    });

    it('should not increment score on incorrect answer', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('50');
      });
      
      act(() => {
        result.current.checkAnswer(100);
      });
      
      expect(result.current.score).toBe(0);
    });

    it('should increment attempts on each check', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('100');
      });
      
      act(() => {
        result.current.checkAnswer(100);
      });
      
      act(() => {
        result.current.resetAnswer();
        result.current.setUserAnswer('50');
      });
      
      act(() => {
        result.current.checkAnswer(100);
      });
      
      expect(result.current.attempts).toBe(2);
    });

    it('should show feedback after checking', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('100');
      });
      
      act(() => {
        result.current.checkAnswer(100);
      });
      
      expect(result.current.showFeedback).toBe(true);
    });

    it('should call onCorrect callback when answer is correct', () => {
      const { result } = renderHook(() => useExerciseState());
      const onCorrect = jest.fn();
      
      act(() => {
        result.current.setUserAnswer('100');
      });
      
      act(() => {
        result.current.checkAnswer(100, onCorrect);
      });
      
      expect(onCorrect).toHaveBeenCalledTimes(1);
    });

    it('should not call onCorrect callback when answer is incorrect', () => {
      const { result } = renderHook(() => useExerciseState());
      const onCorrect = jest.fn();
      
      act(() => {
        result.current.setUserAnswer('50');
      });
      
      act(() => {
        result.current.checkAnswer(100, onCorrect);
      });
      
      expect(onCorrect).not.toHaveBeenCalled();
    });
  });

  describe('resetAnswer', () => {
    it('should reset user answer to empty', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('100');
      });
      
      act(() => {
        result.current.resetAnswer();
      });
      
      expect(result.current.userAnswer).toBe('');
    });

    it('should hide feedback', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('100');
        result.current.checkAnswer(100);
      });
      
      act(() => {
        result.current.resetAnswer();
      });
      
      expect(result.current.showFeedback).toBe(false);
    });

    it('should hide hint', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.toggleHint();
      });
      
      act(() => {
        result.current.resetAnswer();
      });
      
      expect(result.current.showHint).toBe(false);
    });

    it('should not reset score', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('100');
      });
      
      act(() => {
        result.current.checkAnswer(100);
      });
      
      act(() => {
        result.current.resetAnswer();
      });
      
      expect(result.current.score).toBe(1);
    });

    it('should not reset attempts', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.setUserAnswer('100');
        result.current.checkAnswer(100);
      });
      
      act(() => {
        result.current.resetAnswer();
      });
      
      expect(result.current.attempts).toBe(1);
    });
  });

  describe('toggleHint', () => {
    it('should toggle hint visibility on', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.toggleHint();
      });
      
      expect(result.current.showHint).toBe(true);
    });

    it('should toggle hint visibility off', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.toggleHint();
      });
      
      act(() => {
        result.current.toggleHint();
      });
      
      expect(result.current.showHint).toBe(false);
    });
  });

  describe('complete flow', () => {
    it('should handle a complete exercise flow', () => {
      const { result } = renderHook(() => useExerciseState());
      const onCorrect = jest.fn();
      
      // Initial state
      expect(result.current.score).toBe(0);
      expect(result.current.attempts).toBe(0);
      
      // First attempt - incorrect
      act(() => {
        result.current.setUserAnswer('50');
      });
      
      act(() => {
        result.current.checkAnswer(100, onCorrect);
      });
      
      expect(result.current.isCorrect).toBe(false);
      expect(result.current.score).toBe(0);
      expect(result.current.attempts).toBe(1);
      expect(onCorrect).not.toHaveBeenCalled();
      
      // Reset and try again
      act(() => {
        result.current.resetAnswer();
      });
      
      expect(result.current.userAnswer).toBe('');
      expect(result.current.showFeedback).toBe(false);
      
      // Second attempt - correct
      act(() => {
        result.current.setUserAnswer('100');
      });
      
      act(() => {
        result.current.checkAnswer(100, onCorrect);
      });
      
      expect(result.current.isCorrect).toBe(true);
      expect(result.current.score).toBe(1);
      expect(result.current.attempts).toBe(2);
      expect(onCorrect).toHaveBeenCalledTimes(1);
    });
  });
});

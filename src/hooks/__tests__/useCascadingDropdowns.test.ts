/**
 * Tests for useCascadingDropdowns hook
 */

import { renderHook, act } from '@testing-library/react-native';
import { useCascadingDropdowns } from '../useCascadingDropdowns';

describe('useCascadingDropdowns', () => {
  describe('initialization', () => {
    it('should initialize with no selections', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector', 'count'],
        })
      );

      expect(result.current.selections).toEqual({
        difficulty: null,
        sector: null,
        count: null,
      });
    });

    it('should initialize with custom initial values', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector', 'count'],
          initialValues: { count: '10' },
        })
      );

      expect(result.current.selections).toEqual({
        difficulty: null,
        sector: null,
        count: '10',
      });
    });

    it('should initialize with all dropdowns closed', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector', 'count'],
        })
      );

      expect(result.current.isOpen('difficulty')).toBe(false);
      expect(result.current.isOpen('sector')).toBe(false);
      expect(result.current.isOpen('count')).toBe(false);
    });
  });

  describe('toggle', () => {
    it('should toggle dropdown open', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector'],
        })
      );

      act(() => {
        result.current.toggle('difficulty');
      });

      expect(result.current.isOpen('difficulty')).toBe(true);
    });

    it('should toggle dropdown closed', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector'],
        })
      );

      act(() => {
        result.current.toggle('difficulty');
      });

      expect(result.current.isOpen('difficulty')).toBe(true);

      act(() => {
        result.current.toggle('difficulty');
      });

      expect(result.current.isOpen('difficulty')).toBe(false);
    });

    it('should close other dropdowns when toggling one open', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector', 'count'],
        })
      );

      act(() => {
        result.current.toggle('difficulty');
      });

      expect(result.current.isOpen('difficulty')).toBe(true);

      act(() => {
        result.current.toggle('sector');
      });

      expect(result.current.isOpen('difficulty')).toBe(false);
      expect(result.current.isOpen('sector')).toBe(true);
    });
  });

  describe('select', () => {
    it('should select a value and close dropdown', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector'],
        })
      );

      act(() => {
        result.current.toggle('difficulty');
      });

      expect(result.current.isOpen('difficulty')).toBe(true);

      act(() => {
        result.current.select('difficulty', 'hard');
      });

      expect(result.current.selections.difficulty).toBe('hard');
      expect(result.current.isOpen('difficulty')).toBe(false);
    });

    it('should allow selecting values for multiple dropdowns', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector', 'count'],
        })
      );

      act(() => {
        result.current.select('difficulty', 'medium');
        result.current.select('sector', 'voisins');
        result.current.select('count', '15');
      });

      expect(result.current.selections).toEqual({
        difficulty: 'medium',
        sector: 'voisins',
        count: '15',
      });
    });
  });

  describe('reset', () => {
    it('should reset all selections to initial state', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector', 'count'],
          initialValues: { count: '10' },
        })
      );

      act(() => {
        result.current.select('difficulty', 'hard');
        result.current.select('sector', 'tier');
        result.current.select('count', '20');
      });

      expect(result.current.selections).toEqual({
        difficulty: 'hard',
        sector: 'tier',
        count: '20',
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.selections).toEqual({
        difficulty: null,
        sector: null,
        count: '10',
      });
    });

    it('should close all dropdowns on reset', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector'],
        })
      );

      act(() => {
        result.current.toggle('difficulty');
      });

      expect(result.current.isOpen('difficulty')).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.isOpen('difficulty')).toBe(false);
    });
  });

  describe('resetFrom', () => {
    it('should reset downstream dropdowns when parent changes', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector', 'count'],
          initialValues: { count: '10' },
        })
      );

      act(() => {
        result.current.select('difficulty', 'hard');
        result.current.select('sector', 'tier');
        result.current.select('count', '20');
      });

      expect(result.current.selections).toEqual({
        difficulty: 'hard',
        sector: 'tier',
        count: '20',
      });

      // When difficulty changes, reset sector and count
      act(() => {
        result.current.resetFrom('difficulty');
      });

      expect(result.current.selections).toEqual({
        difficulty: 'hard',
        sector: null,
        count: '10',
      });
    });

    it('should not reset upstream dropdowns', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector', 'count'],
        })
      );

      act(() => {
        result.current.select('difficulty', 'hard');
        result.current.select('sector', 'tier');
        result.current.select('count', '20');
      });

      // When sector changes, only reset count (not difficulty)
      act(() => {
        result.current.resetFrom('sector');
      });

      expect(result.current.selections).toEqual({
        difficulty: 'hard',
        sector: 'tier',
        count: null,
      });
    });

    it('should handle invalid dropdown gracefully', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['difficulty', 'sector'],
        })
      );

      act(() => {
        result.current.select('difficulty', 'hard');
        result.current.select('sector', 'tier');
      });

      act(() => {
        result.current.resetFrom('invalid');
      });

      // Should not crash or change anything
      expect(result.current.selections).toEqual({
        difficulty: 'hard',
        sector: 'tier',
      });
    });
  });

  describe('workflow integration', () => {
    it('should support typical cascading dropdown workflow', () => {
      const { result } = renderHook(() =>
        useCascadingDropdowns({
          dropdowns: ['trainingType', 'denomination', 'chipCount'],
          initialValues: { chipCount: '3' },
        })
      );

      // Step 1: Open first dropdown
      act(() => {
        result.current.toggle('trainingType');
      });

      expect(result.current.isOpen('trainingType')).toBe(true);

      // Step 2: Select training type
      act(() => {
        result.current.select('trainingType', 'STRAIGHT_UP');
      });

      expect(result.current.selections.trainingType).toBe('STRAIGHT_UP');
      expect(result.current.isOpen('trainingType')).toBe(false);

      // Step 3: Open second dropdown
      act(() => {
        result.current.toggle('denomination');
      });

      expect(result.current.isOpen('denomination')).toBe(true);
      expect(result.current.isOpen('trainingType')).toBe(false);

      // Step 4: Select denomination
      act(() => {
        result.current.select('denomination', 'CASH_5');
      });

      expect(result.current.selections).toEqual({
        trainingType: 'STRAIGHT_UP',
        denomination: 'CASH_5',
        chipCount: '3',
      });

      // Step 5: Change training type (should reset denomination)
      act(() => {
        result.current.select('trainingType', 'SPLIT');
        result.current.resetFrom('trainingType');
      });

      expect(result.current.selections).toEqual({
        trainingType: 'SPLIT',
        denomination: null,
        chipCount: '3',
      });
    });
  });
});

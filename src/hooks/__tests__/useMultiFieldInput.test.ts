/**
 * Tests for useMultiFieldInput hook
 */

import { renderHook, act } from '@testing-library/react-native';
import { useMultiFieldInput } from '../useMultiFieldInput';

describe('useMultiFieldInput', () => {
  describe('initialization', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['field1', 'field2'],
        })
      );

      expect(result.current.values).toEqual({
        field1: '',
        field2: '',
      });
      expect(result.current.activeField).toBeNull();
    });

    it('should initialize with custom initial values', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['field1', 'field2'],
          initialValues: { field1: '10', field2: '20' },
        })
      );

      expect(result.current.values).toEqual({
        field1: '10',
        field2: '20',
      });
    });

    it('should initialize with custom active field', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['field1', 'field2'],
          initialActiveField: 'field1',
        })
      );

      expect(result.current.activeField).toBe('field1');
    });
  });

  describe('handleInput', () => {
    it('should append digit to active field', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
          initialActiveField: 'chips',
        })
      );

      act(() => {
        result.current.handleInput('5');
      });

      expect(result.current.values.chips).toBe('5');
      expect(result.current.values.cash).toBe('');
    });

    it('should append multiple digits', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
          initialActiveField: 'chips',
        })
      );

      act(() => {
        result.current.handleInput('1');
        result.current.handleInput('2');
        result.current.handleInput('3');
      });

      expect(result.current.values.chips).toBe('123');
    });

    it('should not append when no field is active', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
        })
      );

      act(() => {
        result.current.handleInput('5');
      });

      expect(result.current.values.chips).toBe('');
      expect(result.current.values.cash).toBe('');
    });
  });

  describe('handleClear', () => {
    it('should clear active field', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
          initialValues: { chips: '123', cash: '456' },
          initialActiveField: 'chips',
        })
      );

      act(() => {
        result.current.handleClear();
      });

      expect(result.current.values.chips).toBe('');
      expect(result.current.values.cash).toBe('456');
    });

    it('should not clear when no field is active', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
          initialValues: { chips: '123', cash: '456' },
        })
      );

      act(() => {
        result.current.handleClear();
      });

      expect(result.current.values.chips).toBe('123');
      expect(result.current.values.cash).toBe('456');
    });
  });

  describe('handleBackspace', () => {
    it('should remove last character from active field', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
          initialValues: { chips: '123', cash: '456' },
          initialActiveField: 'chips',
        })
      );

      act(() => {
        result.current.handleBackspace();
      });

      expect(result.current.values.chips).toBe('12');
      expect(result.current.values.cash).toBe('456');
    });

    it('should handle empty field gracefully', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
          initialActiveField: 'chips',
        })
      );

      act(() => {
        result.current.handleBackspace();
      });

      expect(result.current.values.chips).toBe('');
    });

    it('should not remove when no field is active', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
          initialValues: { chips: '123', cash: '456' },
        })
      );

      act(() => {
        result.current.handleBackspace();
      });

      expect(result.current.values.chips).toBe('123');
      expect(result.current.values.cash).toBe('456');
    });
  });

  describe('setActiveField', () => {
    it('should change active field', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
        })
      );

      act(() => {
        result.current.setActiveField('chips');
      });

      expect(result.current.activeField).toBe('chips');

      act(() => {
        result.current.setActiveField('cash');
      });

      expect(result.current.activeField).toBe('cash');
    });
  });

  describe('setValue', () => {
    it('should set field value directly', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
        })
      );

      act(() => {
        result.current.setValue('chips', '100');
      });

      expect(result.current.values.chips).toBe('100');
      expect(result.current.values.cash).toBe('');
    });
  });

  describe('resetValues', () => {
    it('should reset all values to initial state', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['chips', 'cash'],
          initialValues: { chips: '10', cash: '20' },
          initialActiveField: 'chips',
        })
      );

      act(() => {
        result.current.setValue('chips', '100');
        result.current.setActiveField('cash');
      });

      expect(result.current.values.chips).toBe('100');
      expect(result.current.activeField).toBe('cash');

      act(() => {
        result.current.resetValues();
      });

      expect(result.current.values).toEqual({ chips: '10', cash: '20' });
      expect(result.current.activeField).toBe('chips');
    });
  });

  describe('workflow integration', () => {
    it('should support typical multi-field input workflow', () => {
      const { result } = renderHook(() =>
        useMultiFieldInput({
          fields: ['totalBet', 'betPerPosition', 'change'],
        })
      );

      // Select first field
      act(() => {
        result.current.setActiveField('totalBet');
      });

      // Enter value
      act(() => {
        result.current.handleInput('1');
        result.current.handleInput('0');
        result.current.handleInput('0');
      });

      expect(result.current.values.totalBet).toBe('100');

      // Switch to second field
      act(() => {
        result.current.setActiveField('betPerPosition');
      });

      // Enter value
      act(() => {
        result.current.handleInput('2');
        result.current.handleInput('5');
      });

      expect(result.current.values.betPerPosition).toBe('25');

      // Fix a typo
      act(() => {
        result.current.handleBackspace();
        result.current.handleInput('0');
      });

      expect(result.current.values.betPerPosition).toBe('20');

      // Final state
      expect(result.current.values).toEqual({
        totalBet: '100',
        betPerPosition: '20',
        change: '',
      });
    });
  });
});

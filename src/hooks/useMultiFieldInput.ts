/**
 * Custom hook for managing multi-field input state
 * Eliminates repetitive conditional logic for input handling
 */

import { useState, useCallback } from 'react';

export interface UseMultiFieldInputConfig {
  fields: string[];
  initialValues?: Record<string, string>;
  initialActiveField?: string | null;
}

export interface UseMultiFieldInputReturn {
  values: Record<string, string>;
  activeField: string | null;
  setActiveField: (field: string | null) => void;
  setValue: (field: string, value: string) => void;
  handleInput: (digit: string) => void;
  handleClear: () => void;
  handleBackspace: () => void;
  resetValues: () => void;
}

/**
 * Hook for managing multiple input fields with shared number pad
 *
 * @example
 * ```tsx
 * const { values, activeField, setActiveField, handleInput, handleClear, handleBackspace } =
 *   useMultiFieldInput({
 *     fields: ['chips', 'cash'],
 *     initialValues: { chips: '', cash: '' }
 *   });
 * ```
 */
export function useMultiFieldInput({
  fields,
  initialValues = {},
  initialActiveField = null,
}: UseMultiFieldInputConfig): UseMultiFieldInputReturn {
  // Initialize values for all fields
  const defaultValues = fields.reduce(
    (acc, field) => ({ ...acc, [field]: initialValues[field] || '' }),
    {} as Record<string, string>
  );

  const [values, setValues] = useState<Record<string, string>>(defaultValues);
  const [activeField, setActiveField] = useState<string | null>(initialActiveField);

  /**
   * Set a specific field's value directly
   */
  const setValue = useCallback((field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  /**
   * Append a digit to the active field
   */
  const handleInput = useCallback(
    (digit: string) => {
      if (!activeField) return;
      setValues(prev => ({
        ...prev,
        [activeField]: prev[activeField] + digit,
      }));
    },
    [activeField]
  );

  /**
   * Clear the active field
   */
  const handleClear = useCallback(() => {
    if (!activeField) return;
    setValues(prev => ({ ...prev, [activeField]: '' }));
  }, [activeField]);

  /**
   * Remove last character from active field
   */
  const handleBackspace = useCallback(() => {
    if (!activeField) return;
    setValues(prev => ({
      ...prev,
      [activeField]: prev[activeField].slice(0, -1),
    }));
  }, [activeField]);

  /**
   * Reset all field values to initial state
   */
  const resetValues = useCallback(() => {
    setValues(defaultValues);
    setActiveField(initialActiveField);
  }, [defaultValues, initialActiveField]);

  return {
    values,
    activeField,
    setActiveField,
    setValue,
    handleInput,
    handleClear,
    handleBackspace,
    resetValues,
  };
}

/**
 * Custom hook for managing cascading dropdown state
 * Handles toggling, selection, and mutual exclusivity of dropdowns
 */

import { useState, useCallback } from 'react';

export interface DropdownState {
  [key: string]: {
    value: string | null;
    isOpen: boolean;
  };
}

export interface UseCascadingDropdownsConfig {
  dropdowns: string[];
  initialValues?: Record<string, string | null>;
}

export interface UseCascadingDropdownsReturn {
  selections: Record<string, string | null>;
  isOpen: (dropdownId: string) => boolean;
  toggle: (dropdownId: string) => void;
  select: (dropdownId: string, value: string) => void;
  reset: (resetDownstream?: boolean) => void;
  resetFrom: (fromDropdown: string) => void;
}

/**
 * Hook for managing cascading dropdown selections with mutual exclusivity
 * Only one dropdown can be open at a time. Selecting an item closes the dropdown.
 *
 * @example
 * ```tsx
 * const { selections, isOpen, toggle, select, reset } = useCascadingDropdowns({
 *   dropdowns: ['difficulty', 'sector', 'count'],
 *   initialValues: { count: '10' }
 * });
 *
 * <Dropdown
 *   isOpen={isOpen('difficulty')}
 *   onToggle={() => toggle('difficulty')}
 *   onSelect={(value) => select('difficulty', value)}
 * />
 * ```
 */
export function useCascadingDropdowns({
  dropdowns,
  initialValues = {},
}: UseCascadingDropdownsConfig): UseCascadingDropdownsReturn {
  // Initialize state for all dropdowns
  const initialState = dropdowns.reduce(
    (acc, dropdown) => ({
      ...acc,
      [dropdown]: {
        value: initialValues[dropdown] || null,
        isOpen: false,
      },
    }),
    {} as DropdownState
  );

  const [state, setState] = useState<DropdownState>(initialState);

  /**
   * Check if a dropdown is open
   */
  const isOpen = useCallback(
    (dropdownId: string): boolean => {
      return state[dropdownId]?.isOpen || false;
    },
    [state]
  );

  /**
   * Toggle a dropdown open/closed, closing all others
   */
  const toggle = useCallback((dropdownId: string) => {
    setState(prev => {
      const newState = { ...prev };

      // Close all dropdowns
      Object.keys(newState).forEach(key => {
        newState[key] = { ...newState[key], isOpen: false };
      });

      // Toggle the requested dropdown
      if (newState[dropdownId]) {
        newState[dropdownId] = {
          ...newState[dropdownId],
          isOpen: !prev[dropdownId].isOpen,
        };
      }

      return newState;
    });
  }, []);

  /**
   * Select a value for a dropdown and close it
   */
  const select = useCallback((dropdownId: string, value: string) => {
    setState(prev => ({
      ...prev,
      [dropdownId]: {
        value,
        isOpen: false,
      },
    }));
  }, []);

  /**
   * Reset all dropdowns to initial state
   */
  const reset = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  /**
   * Reset all dropdowns from a specific point onwards (for cascading behavior)
   * Useful when a parent selection changes and child selections should clear
   */
  const resetFrom = useCallback(
    (fromDropdown: string) => {
      const dropdownIndex = dropdowns.indexOf(fromDropdown);
      if (dropdownIndex === -1) return;

      setState(prev => {
        const newState = { ...prev };

        // Reset all dropdowns after the specified one
        dropdowns.slice(dropdownIndex + 1).forEach(dropdown => {
          newState[dropdown] = {
            value: initialValues[dropdown] || null,
            isOpen: false,
          };
        });

        return newState;
      });
    },
    [dropdowns, initialValues]
  );

  /**
   * Extract just the selected values (without isOpen state)
   */
  const selections = Object.keys(state).reduce(
    (acc, key) => ({ ...acc, [key]: state[key].value }),
    {} as Record<string, string | null>
  );

  return {
    selections,
    isOpen,
    toggle,
    select,
    reset,
    resetFrom,
  };
}

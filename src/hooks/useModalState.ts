import { useState, useCallback } from 'react';

interface ModalState {
  isVisible: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Custom hook for managing modal visibility state
 * @param initialState - Initial visibility state (default: false)
 * @returns Object with isVisible state and open/close/toggle handlers
 */
export function useModalState(initialState = false): ModalState {
  const [isVisible, setIsVisible] = useState(initialState);

  const open = useCallback(() => {
    setIsVisible(true);
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  return { isVisible, open, close, toggle };
}

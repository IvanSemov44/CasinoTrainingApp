import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';

/**
 * Render a component wrapped in ThemeProvider for testing
 * This utility eliminates the need to define renderWithTheme in each test file
 */
export function renderWithTheme(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: ThemeProvider, ...options });
}

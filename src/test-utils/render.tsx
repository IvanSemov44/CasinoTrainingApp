/**
 * Custom render function with all providers
 * Use this instead of @testing-library/react-native render
 */
import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { SettingsProvider } from '@contexts/SettingsContext';

/**
 * All providers wrapper for tests
 * Add any global providers here (Redux, Theme, etc.)
 */
const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <SettingsProvider>{children}</SettingsProvider>
  </ThemeProvider>
);

/**
 * Custom render that includes all providers
 * @param ui - React element to render
 * @param options - Render options
 */
const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing library
export * from '@testing-library/react-native';

// Override render with our custom one
export { customRender as render };

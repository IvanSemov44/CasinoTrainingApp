/**
 * Custom render function with all providers
 * Use this instead of @testing-library/react-native render
 */
import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@contexts/ThemeContext';

/**
 * All providers wrapper for tests
 * Add any global providers here (Redux, Theme, etc.)
 */
const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <NavigationContainer>{children}</NavigationContainer>
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

/**
 * Render with navigation for screen tests
 * @param ui - React element to render
 * @param _navigationProps - Additional navigation props
 */
export const renderWithNavigation = (
  ui: React.ReactElement,
  _navigationProps?: { initialRoute?: string }
) => {
  return render(<NavigationContainer>{ui}</NavigationContainer>);
};

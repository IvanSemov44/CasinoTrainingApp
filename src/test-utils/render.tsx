/**
 * Custom render function for testing with all providers
 * Use this instead of @testing-library/react-native render
 */
import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

// Mock store for tests - simplified version without Redux
const MockStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// All providers wrapper for tests
const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MockStoreProvider>
    <NavigationContainer>
      {children}
    </NavigationContainer>
  </MockStoreProvider>
);

/**
 * Custom render function that wraps components with all necessary providers
 * @param ui - The component to render
 * @param options - Render options
 */
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing library
export * from '@testing-library/react-native';

// Override render with our custom version
export { customRender as render };

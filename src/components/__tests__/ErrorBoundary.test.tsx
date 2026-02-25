/**
 * Unit tests for ErrorBoundary component
 * Tests error catching, fallback rendering, and reset functionality
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import ErrorBoundary from '../ErrorBoundary';

// Define __DEV__ global for tests
(global as any).__DEV__ = true;

// Mock the theme constants
jest.mock('../../features/roulette-training/constants/theme', () => ({
  COLORS: {
    background: { primary: '#0a2f1f', secondary: '#1a5f3f' },
    text: { primary: '#FFFFFF', secondary: '#CCCCCC', gold: '#FFD700' },
    status: { error: '#FF4444' },
  },
  SPACING: { sm: 8, md: 16, lg: 24 },
  TYPOGRAPHY: { fontSize: { sm: 12, base: 14, lg: 18 } },
  BORDERS: { radius: { md: 8 } },
}));

// Suppress console.error during tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Component that throws an error
const ThrowError: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <Text>Normal content</Text>;
};

// Test wrapper component using React Native elements
const TestContent: React.FC<{ text: string }> = ({ text }) => (
  <View>
    <Text>{text}</Text>
  </View>
);

describe('ErrorBoundary', () => {
  describe('normal rendering', () => {
    it('should render children when no error occurs', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <TestContent text="Test content" />
        </ErrorBoundary>
      );
      
      expect(getByText('Test content')).toBeTruthy();
    });

    it('should render multiple children correctly', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <TestContent text="Child 1" />
          <TestContent text="Child 2" />
        </ErrorBoundary>
      );
      
      expect(getByText('Child 1')).toBeTruthy();
      expect(getByText('Child 2')).toBeTruthy();
    });
  });

  describe('error handling', () => {
    it('should render default error UI when an error is thrown', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );
      
      expect(getByText('Something went wrong')).toBeTruthy();
    });

    it('should render error message in default UI', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );
      
      expect(getByText(/The app encountered an unexpected error/i)).toBeTruthy();
    });

    it('should render Try Again button', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );
      
      expect(getByText('Try Again')).toBeTruthy();
    });
  });

  describe('custom fallback', () => {
    it('should render custom fallback when provided', () => {
      const customFallback = <Text>Custom error UI</Text>;
      
      const { getByText } = render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );
      
      expect(getByText('Custom error UI')).toBeTruthy();
    });

    it('should not render default UI when custom fallback is provided', () => {
      const customFallback = <Text>Custom error UI</Text>;
      
      const { queryByText } = render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );
      
      expect(queryByText('Something went wrong')).toBeNull();
    });
  });

  describe('reset functionality', () => {
    it('should have a reset button that can be pressed', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );
      
      const resetButton = getByText('Try Again');
      expect(resetButton).toBeTruthy();
      
      // Press the reset button
      fireEvent.press(resetButton);
      
      // After reset, the error boundary should try to render children again
      // Since ThrowError still throws, it will show error UI again
      expect(getByText('Something went wrong')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have accessible error message', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );
      
      const errorMessage = getByText(/The app encountered an unexpected error/i);
      expect(errorMessage).toBeTruthy();
    });

    it('should have accessible reset button', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );
      
      const resetButton = getByText('Try Again');
      expect(resetButton).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('should handle null children', () => {
      const { queryByText } = render(
        <ErrorBoundary>
          {null}
        </ErrorBoundary>
      );
      
      // Should not crash
      expect(queryByText('Something went wrong')).toBeNull();
    });

    it('should handle undefined children', () => {
      const { queryByText } = render(
        <ErrorBoundary>
          {undefined}
        </ErrorBoundary>
      );
      
      // Should not crash
      expect(queryByText('Something went wrong')).toBeNull();
    });

    it('should handle empty children array', () => {
      const { queryByText } = render(
        <ErrorBoundary>
          {[]}
        </ErrorBoundary>
      );
      
      // Should not crash
      expect(queryByText('Something went wrong')).toBeNull();
    });
  });
});

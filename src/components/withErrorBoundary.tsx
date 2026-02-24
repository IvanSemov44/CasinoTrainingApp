import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '@styles/index';

interface WithErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Higher-Order Component that wraps a component with an error boundary.
 * 
 * @example
 * export default withErrorBoundary(MyComponent, 'My Feature');
 */
function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  featureName: string
): React.ComponentType<P> {
  return class extends Component<P, WithErrorBoundaryState> {
    constructor(props: P) {
      super(props);
      this.state = {
        hasError: false,
        error: null,
      };
    }

    static getDerivedStateFromError(error: Error): Partial<WithErrorBoundaryState> {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      if (__DEV__) {
        console.error(`Error in ${featureName}:`, error);
        console.error('Component stack:', errorInfo.componentStack);
      }
    }

    handleReset = (): void => {
      this.setState({
        hasError: false,
        error: null,
      });
    };

    render(): ReactNode {
      const { hasError, error } = this.state;

      if (hasError) {
        return (
          <View style={styles.container}>
            <Text style={styles.icon}>⚠️</Text>
            <Text style={styles.title}>{featureName} Error</Text>
            <Text style={styles.message}>
              Something went wrong in the {featureName.toLowerCase()} feature.
            </Text>

            {__DEV__ && error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error.message}</Text>
              </View>
            )}

            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={this.handleReset}
              accessibilityLabel="Try again"
              accessibilityRole="button"
            >
              <Text style={styles.resetButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  icon: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.h1,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  errorContainer: {
    backgroundColor: COLORS.background.dark,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    maxWidth: '100%',
  },
  errorText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.status.error,
  },
  resetButton: {
    backgroundColor: COLORS.text.gold,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
  },
  resetButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.background.dark,
  },
});

export default withErrorBoundary;
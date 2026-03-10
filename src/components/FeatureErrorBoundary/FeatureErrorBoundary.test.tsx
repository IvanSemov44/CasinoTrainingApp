import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import FeatureErrorBoundary from './FeatureErrorBoundary';

jest.mock('@services/logger.service', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
  },
}));

const ThrowerComponent = (): React.ReactElement => {
  throw new Error('boom');
};

describe('FeatureErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    const { getByText } = render(
      <FeatureErrorBoundary featureName="Training">
        <Text>Safe content</Text>
      </FeatureErrorBoundary>
    );

    expect(getByText('Safe content')).toBeTruthy();
  });

  it('renders fallback UI when child throws', () => {
    const { getByText } = render(
      <FeatureErrorBoundary featureName="Training">
        <ThrowerComponent />
      </FeatureErrorBoundary>
    );

    expect(getByText('Training Error')).toBeTruthy();
    expect(getByText('Try Again')).toBeTruthy();
  });

  it('calls onReset when retry button is pressed', () => {
    const onReset = jest.fn();
    const { getByText } = render(
      <FeatureErrorBoundary featureName="Training" onReset={onReset}>
        <ThrowerComponent />
      </FeatureErrorBoundary>
    );

    fireEvent.press(getByText('Try Again'));

    expect(onReset).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import withErrorBoundary from './withErrorBoundary';

jest.mock('@services/logger.service', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
  },
}));

function SafeComponent() {
  return <Text>Wrapped content</Text>;
}

const ThrowingComponent = (): React.ReactElement => {
  throw new Error('wrapped boom');
};

describe('withErrorBoundary', () => {
  it('renders wrapped component content when no error occurs', () => {
    const Wrapped = withErrorBoundary(SafeComponent, 'Wrapped Feature');
    const { getByText } = render(<Wrapped />);

    expect(getByText('Wrapped content')).toBeTruthy();
  });

  it('renders fallback UI when wrapped component throws', () => {
    const Wrapped = withErrorBoundary(ThrowingComponent, 'Wrapped Feature');
    const { getByText } = render(<Wrapped />);

    expect(getByText('Wrapped Feature Error')).toBeTruthy();
    expect(getByText('Try Again')).toBeTruthy();
  });
});

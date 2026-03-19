import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { FeedbackActions } from './FeedbackActions';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('FeedbackActions', () => {
  it('renders primary and secondary buttons', () => {
    const primaryPress = jest.fn();
    const secondaryPress = jest.fn();

    const { getByText } = renderWithTheme(
      <FeedbackActions
        primary={{ label: 'Continue', onPress: primaryPress }}
        secondary={{ label: 'Retry', onPress: secondaryPress }}
      />
    );

    expect(getByText('Continue')).toBeTruthy();
    expect(getByText('Retry')).toBeTruthy();
  });

  it('calls handlers when buttons are pressed', () => {
    const primaryPress = jest.fn();
    const secondaryPress = jest.fn();

    const { getByText } = renderWithTheme(
      <FeedbackActions
        primary={{ label: 'Continue', onPress: primaryPress }}
        secondary={{ label: 'Retry', onPress: secondaryPress }}
      />
    );

    fireEvent.press(getByText('Retry'));
    fireEvent.press(getByText('Continue'));

    expect(secondaryPress).toHaveBeenCalledTimes(1);
    expect(primaryPress).toHaveBeenCalledTimes(1);
  });
});

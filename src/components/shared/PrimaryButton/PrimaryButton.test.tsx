import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { PrimaryButton } from './PrimaryButton';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('PrimaryButton', () => {
  it('renders label', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(<PrimaryButton label="Submit" onPress={onPress} />);

    expect(getByText('Submit')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <PrimaryButton label="Check" onPress={onPress} accessibilityLabel="Check answer" />
    );

    fireEvent.press(getByText('Check'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('sets button disabled state', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <PrimaryButton
        label="Disabled"
        onPress={onPress}
        disabled
        accessibilityLabel="Disabled button"
      />
    );

    expect(getByLabelText('Disabled button').props.disabled).toBe(true);
  });
});

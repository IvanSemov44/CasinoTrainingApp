import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { StartTrainingButton } from './StartTrainingButton';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('StartTrainingButton', () => {
  it('renders icon, label, and hint', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <StartTrainingButton icon="🎯" label="Start Drill" hint="Tap to begin" onPress={onPress} />
    );

    expect(getByText('🎯')).toBeTruthy();
    expect(getByText('Start Drill')).toBeTruthy();
    expect(getByText('Tap to begin')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <StartTrainingButton icon="🎰" hint="Practice now" onPress={onPress} />
    );

    fireEvent.press(getByText('Start Training'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { TrainingHeader } from './TrainingHeader';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('TrainingHeader', () => {
  it('renders title and compact score summary', () => {
    const { getByText } = renderWithTheme(
      <TrainingHeader title="Roulette Drill" correct={7} total={10} />
    );

    expect(getByText('Roulette Drill')).toBeTruthy();
    expect(getByText('Score: 7/10 (70%)')).toBeTruthy();
  });
});

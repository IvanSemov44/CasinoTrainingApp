import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PlayerBetStatus from './PlayerBetStatus';

describe('PlayerBetStatus', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  it('renders active bet chip for non-folded player', () => {
    renderWithTheme(<PlayerBetStatus isFolded={false} betAmount={150} />);
    expect(screen.getByText('$150')).toBeTruthy();
    expect(screen.queryByText('DEAD')).toBeFalsy();
  });

  it('renders dead chip for folded player with bet', () => {
    renderWithTheme(<PlayerBetStatus isFolded={true} betAmount={90} />);
    expect(screen.getByText('DEAD')).toBeTruthy();
    expect(screen.getByText('$90')).toBeTruthy();
  });

  it('renders uppercase action for active player', () => {
    renderWithTheme(<PlayerBetStatus isFolded={false} action="raise" />);
    expect(screen.getByText('RAISE')).toBeTruthy();
  });

  it('renders asks pot indicator when requesting', () => {
    renderWithTheme(<PlayerBetStatus isRequesting={true} />);
    expect(screen.getByText('ASKS POT')).toBeTruthy();
  });
});

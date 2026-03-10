import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PlayerInfoCard from './PlayerInfoCard';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PlayerInfoCard', () => {
  it('renders fallback player name when name is not provided', () => {
    renderWithTheme(<PlayerInfoCard position={3} />);
    expect(screen.getByText('P3')).toBeTruthy();
  });

  it('shows dealer marker when isDealer is true', () => {
    renderWithTheme(<PlayerInfoCard position={1} name="Dealer" isDealer={true} />);
    expect(screen.getByText('D')).toBeTruthy();
  });

  it('shows fold badge and hides chip stack when folded', () => {
    renderWithTheme(
      <PlayerInfoCard position={2} name="Player 2" chipAmount={800} isFolded={true} />
    );
    expect(screen.getByText('FOLD')).toBeTruthy();
    expect(screen.queryByText('$800')).toBeFalsy();
  });

  it('shows chip stack when active', () => {
    renderWithTheme(<PlayerInfoCard position={4} name="Hero" chipAmount={1200} isFolded={false} />);
    expect(screen.getByText('Hero')).toBeTruthy();
    expect(screen.getByText('$1200')).toBeTruthy();
  });
});

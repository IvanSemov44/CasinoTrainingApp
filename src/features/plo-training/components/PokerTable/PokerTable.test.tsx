import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PokerTable from './PokerTable';
import type { PokerTableProps } from './PokerTable.types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PokerTable', () => {
  const defaultProps: PokerTableProps = {
    players: [
      { position: 1, name: 'Player 1', chipAmount: 1000 },
      { position: 2, name: 'Player 2', chipAmount: 800 },
    ],
  };

  it('renders table container', () => {
    renderWithTheme(<PokerTable {...defaultProps} />);
    expect(screen.getByText('Player 1')).toBeTruthy();
    expect(screen.getByText('Player 2')).toBeTruthy();
  });

  it('renders all players', () => {
    const players = [
      { position: 1, name: 'P1', chipAmount: 100 },
      { position: 2, name: 'P2', chipAmount: 200 },
      { position: 3, name: 'P3', chipAmount: 300 },
    ];
    renderWithTheme(<PokerTable {...defaultProps} players={players} />);
    expect(screen.getByText('P1')).toBeTruthy();
    expect(screen.getByText('P2')).toBeTruthy();
    expect(screen.getByText('P3')).toBeTruthy();
  });

  it('renders pot amount when provided', () => {
    renderWithTheme(<PokerTable {...defaultProps} potAmount={500} />);
    expect(screen.getByText('POT')).toBeTruthy();
    expect(screen.getByText('$500')).toBeTruthy();
  });

  it('does not render pot area when potAmount is 0', () => {
    renderWithTheme(<PokerTable {...defaultProps} potAmount={0} />);
    expect(screen.queryByText('POT')).toBeFalsy();
  });

  it('renders community cards when communityCards is provided', () => {
    renderWithTheme(<PokerTable {...defaultProps} communityCards={3} />);
    // Community cards are rendered but not easily testable by text
    // Just verify the component renders without error
    expect(screen.getByText('Player 1')).toBeTruthy();
  });

  it('handles empty players array', () => {
    renderWithTheme(<PokerTable players={[]} />);
    // Should render without crashing, even with no players
    expect(screen.queryByText('Player 1')).toBeFalsy();
  });

  it('renders with all props provided', () => {
    const players = [
      { position: 1, name: 'Dealer', chipAmount: 1000, isDealer: true, betAmount: 50 },
      { position: 2, name: 'SB', chipAmount: 900, betAmount: 25 },
      { position: 3, name: 'BB', chipAmount: 800, betAmount: 50, isFolded: false },
    ];
    renderWithTheme(
      <PokerTable
        players={players}
        potAmount={300}
        communityCards={5}
      />
    );
    expect(screen.getByText('Dealer')).toBeTruthy();
    expect(screen.getByText('SB')).toBeTruthy();
    expect(screen.getByText('BB')).toBeTruthy();
    expect(screen.getByText('POT')).toBeTruthy();
  });

  it('renders player with action', () => {
    const players = [
      { position: 1, name: 'Player 1', chipAmount: 1000, action: 'fold' as const },
    ];
    renderWithTheme(<PokerTable {...defaultProps} players={players} />);
    expect(screen.getByText('Player 1')).toBeTruthy();
  });

  it('renders player with isFolded flag', () => {
    const players = [
      { position: 1, name: 'Folded Player', chipAmount: 1000, isFolded: true },
    ];
    renderWithTheme(<PokerTable {...defaultProps} players={players} />);
    expect(screen.getByText('FOLD')).toBeTruthy();
  });

  it('renders player requesting pot', () => {
    const players = [
      { position: 1, name: 'Requesting', chipAmount: 1000, isRequesting: true },
    ];
    renderWithTheme(<PokerTable {...defaultProps} players={players} />);
    expect(screen.getByText('ASKS POT')).toBeTruthy();
  });

  it('handles 6 players (max table)', () => {
    const players = Array.from({ length: 6 }, (_, i) => ({
      position: i + 1,
      name: `P${i + 1}`,
      chipAmount: 1000 - i * 100,
    }));
    renderWithTheme(<PokerTable {...defaultProps} players={players} />);
    expect(screen.getByText('P1')).toBeTruthy();
    expect(screen.getByText('P6')).toBeTruthy();
  });

  it('handles large pot amounts', () => {
    renderWithTheme(<PokerTable {...defaultProps} potAmount={99999} />);
    expect(screen.getByText('$99999')).toBeTruthy();
  });

  it('handles 0 community cards', () => {
    renderWithTheme(<PokerTable {...defaultProps} communityCards={0} />);
    expect(screen.getByText('Player 1')).toBeTruthy();
  });

  it('handles 5 community cards (river)', () => {
    renderWithTheme(<PokerTable {...defaultProps} communityCards={5} />);
    expect(screen.getByText('Player 1')).toBeTruthy();
  });
});

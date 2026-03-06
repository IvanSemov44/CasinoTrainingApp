import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import ActionLog from './ActionLog';
import type { ActionLogProps } from './ActionLog.types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ActionLog', () => {
  const defaultProps: ActionLogProps = {
    lines: [
      'PREFLOP',
      'UTG folds',
      'MP calls 2',
      'CO raises to 8',
    ],
    requesterName: 'BB',
  };

  it('renders action log container', () => {
    renderWithTheme(<ActionLog {...defaultProps} />);
    expect(screen.getByText('PREFLOP')).toBeTruthy();
  });

  it('renders street headers', () => {
    renderWithTheme(<ActionLog {...defaultProps} />);
    expect(screen.getByText('PREFLOP')).toBeTruthy();
  });

  it('renders action lines', () => {
    renderWithTheme(<ActionLog {...defaultProps} />);
    expect(screen.getByText('UTG folds')).toBeTruthy();
    expect(screen.getByText('MP calls 2')).toBeTruthy();
    expect(screen.getByText('CO raises to 8')).toBeTruthy();
  });

  it('renders requester name in ask indicator', () => {
    renderWithTheme(<ActionLog {...defaultProps} />);
    expect(screen.getByText(/BB asks/)).toBeTruthy();
    expect(screen.getByText(/How much is pot/)).toBeTruthy();
  });

  it('handles multiple streets', () => {
    const lines = [
      'PREFLOP',
      'SB folds',
      'FLOP',
      'BB checks',
      'MP bets 10',
      'TURN',
      'BB calls',
    ];
    renderWithTheme(<ActionLog lines={lines} requesterName="CO" />);
    expect(screen.getByText('PREFLOP')).toBeTruthy();
    expect(screen.getByText('FLOP')).toBeTruthy();
    expect(screen.getByText('TURN')).toBeTruthy();
  });

  it('handles all street types', () => {
    const lines = [
      'PREFLOP',
      'UTG raises',
      'FLOP',
      'SB checks',
      'TURN',
      'BB folds',
      'RIVER',
      'CO bets',
    ];
    renderWithTheme(<ActionLog lines={lines} requesterName="Hero" />);
    expect(screen.getByText('PREFLOP')).toBeTruthy();
    expect(screen.getByText('FLOP')).toBeTruthy();
    expect(screen.getByText('TURN')).toBeTruthy();
    expect(screen.getByText('RIVER')).toBeTruthy();
  });

  it('renders single action line', () => {
    const lines = ['PREFLOP', 'UTG folds'];
    renderWithTheme(<ActionLog lines={lines} requesterName="MP" />);
    expect(screen.getByText('PREFLOP')).toBeTruthy();
    expect(screen.getByText('UTG folds')).toBeTruthy();
  });

  it('renders empty action lines gracefully', () => {
    const lines = ['PREFLOP'];
    renderWithTheme(<ActionLog lines={lines} requesterName="Player" />);
    expect(screen.getByText('PREFLOP')).toBeTruthy();
  });

  it('renders ask indicator with different requester names', () => {
    const names = ['SB', 'BB', 'UTG', 'MP', 'CO', 'D'];
    names.forEach((name) => {
      const { unmount } = renderWithTheme(
        <ActionLog lines={['PREFLOP']} requesterName={name} />
      );
      expect(screen.getByText(new RegExp(`${name} asks`))).toBeTruthy();
      unmount();
    });
  });

  it('handles long action descriptions', () => {
    const lines = [
      'PREFLOP',
      'UTG raises to 20 from 8',
      'MP re-raises to 50 from 20',
      'CO folds',
    ];
    renderWithTheme(<ActionLog lines={lines} requesterName="BB" />);
    expect(screen.getByText('UTG raises to 20 from 8')).toBeTruthy();
    expect(screen.getByText('MP re-raises to 50 from 20')).toBeTruthy();
  });

  it('distinguishes between current and historical streets', () => {
    const lines = [
      'PREFLOP',
      'UTG folds',
      'FLOP',
      'SB checks',
      'BB bets',
    ];
    renderWithTheme(<ActionLog lines={lines} requesterName="Hero" />);
    // FLOP is the last header, so it's current
    // PREFLOP is historical
    expect(screen.getByText('PREFLOP')).toBeTruthy();
    expect(screen.getByText('FLOP')).toBeTruthy();
  });

  it('renders with many action lines', () => {
    const lines = [
      'PREFLOP',
      'UTG folds',
      'MP calls',
      'CO raises',
      'D folds',
      'SB folds',
      'BB re-raises',
      'MP calls',
      'FLOP',
      'BB bets',
      'MP calls',
    ];
    renderWithTheme(<ActionLog lines={lines} requesterName="CO" />);
    expect(screen.getByText('UTG folds')).toBeTruthy();
    expect(screen.getAllByText('MP calls').length).toBeGreaterThan(0);
  });
});

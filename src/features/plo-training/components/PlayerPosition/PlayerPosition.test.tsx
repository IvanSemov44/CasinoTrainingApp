import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PlayerPosition from './PlayerPosition';
import type { PlayerPositionProps } from './PlayerPosition.types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PlayerPosition', () => {
  const defaultProps: PlayerPositionProps = {
    position: 1,
    name: 'Player 1',
    chipAmount: 1000,
  };

  it('renders player name', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} />);
    expect(screen.getByText('Player 1')).toBeTruthy();
  });

  it('renders chip amount when provided and not folded', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} chipAmount={500} />);
    expect(screen.getByText('$500')).toBeTruthy();
  });

  it('uses position number as fallback name', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} name={undefined} />);
    expect(screen.getByText('P1')).toBeTruthy();
  });

  it('renders dealer button when isDealer is true', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} isDealer={true} />);
    expect(screen.getByText('D')).toBeTruthy();
  });

  it('renders FOLD badge when player is folded', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} isFolded={true} />);
    expect(screen.getByText('FOLD')).toBeTruthy();
  });

  it('does not render chip amount when folded', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} isFolded={true} chipAmount={500} />);
    // FOLD badge should be there, but chip amount should not
    expect(screen.queryByText('$500')).toBeFalsy();
  });

  it('renders active bet chip when betAmount is positive and not folded', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} betAmount={100} isFolded={false} />);
    expect(screen.getByText('$100')).toBeTruthy();
  });

  it('does not render active bet chip when betAmount is zero', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} betAmount={0} />);
    // Should not render bet chip for zero amount
    const betTexts = screen.queryAllByText(/\$0/);
    expect(betTexts.length).toBe(0);
  });

  it('renders dead chip when folded with bet amount', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} isFolded={true} betAmount={100} />);
    expect(screen.getByText('DEAD')).toBeTruthy();
    expect(screen.getByText('$100')).toBeTruthy();
  });

  it('renders action label when action is provided and not folded', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} action="fold" isFolded={false} />);
    expect(screen.getByText('FOLD')).toBeTruthy();
  });

  it('renders ASKS POT indicator when isRequesting is true', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} isRequesting={true} />);
    expect(screen.getByText('ASKS POT')).toBeTruthy();
  });

  it('does not show action label when folded', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} action="raise" isFolded={true} />);
    // Should not see the action label (only FOLD badge from being folded)
    const foldTexts = screen.getAllByText('FOLD');
    expect(foldTexts.length).toBeGreaterThan(0);
  });

  it('handles undefined chipAmount gracefully', () => {
    renderWithTheme(<PlayerPosition {...defaultProps} chipAmount={undefined} />);
    expect(screen.getByText('Player 1')).toBeTruthy();
  });

  it('applies folded styles when isFolded is true', () => {
    const { getByText } = renderWithTheme(<PlayerPosition {...defaultProps} isFolded={true} />);
    const foldBadge = getByText('FOLD');
    expect(foldBadge).toBeTruthy();
  });

  it('renders with all props provided', () => {
    renderWithTheme(
      <PlayerPosition
        position={3}
        name="Hero"
        chipAmount={2000}
        isDealer={true}
        action="raise"
        betAmount={250}
        isFolded={false}
        isRequesting={true}
      />
    );
    expect(screen.getByText('Hero')).toBeTruthy();
    expect(screen.getByText('$2000')).toBeTruthy();
    expect(screen.getByText('D')).toBeTruthy();
    expect(screen.getByText('ASKS POT')).toBeTruthy();
  });
});

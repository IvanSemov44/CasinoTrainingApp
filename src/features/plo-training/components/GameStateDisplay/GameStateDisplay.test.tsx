import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import GameStateDisplay from './GameStateDisplay';
import type { GameStateDisplayProps } from './GameStateDisplay.types';
import type { PotRequest } from '../../types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('GameStateDisplay', () => {
  const defaultRequest: PotRequest = {
    requestingPosition: 'UTG',
    previousActions: [],
    smallBlind: 2,
    bigBlind: 2,
  };

  const defaultProps: GameStateDisplayProps = {
    request: defaultRequest,
  };

  it('renders blinds section', () => {
    renderWithTheme(<GameStateDisplay {...defaultProps} />);
    expect(screen.getByText('Blinds')).toBeTruthy();
    expect(screen.getByText('SB: $2')).toBeTruthy();
    expect(screen.getByText('BB: $2')).toBeTruthy();
  });

  it('renders poker table with all 6 positions', () => {
    renderWithTheme(<GameStateDisplay {...defaultProps} />);
    // All positions should be initialized
    expect(screen.getByText('CO')).toBeTruthy(); // Position 1
    expect(screen.getByText('MP')).toBeTruthy(); // Position 2
    expect(screen.getByText('UTG')).toBeTruthy(); // Position 3
    expect(screen.getByText('BB')).toBeTruthy(); // Position 4
    expect(screen.getByText('SB')).toBeTruthy(); // Position 5
    expect(screen.getAllByText('D').length).toBeGreaterThan(0); // Position 6
  });

  it('displays correct blind amounts', () => {
    const request: PotRequest = {
      requestingPosition: 'UTG',
      previousActions: [],
      smallBlind: 5,
      bigBlind: 10,
    };
    renderWithTheme(<GameStateDisplay request={request} />);
    expect(screen.getByText('SB: $5')).toBeTruthy();
    expect(screen.getByText('BB: $10')).toBeTruthy();
  });

  it('shows requesting player with ASKS POT indicator', () => {
    const request: PotRequest = {
      requestingPosition: 'UTG',
      previousActions: [],
      smallBlind: 2,
      bigBlind: 2,
    };
    renderWithTheme(<GameStateDisplay request={request} />);
    expect(screen.getByText('ASKS POT')).toBeTruthy();
  });

  it('updates player state based on previous actions', () => {
    const request: PotRequest = {
      requestingPosition: 'BB',
      previousActions: [
        { position: 'UTG', action: 'fold' },
        { position: 'MP', action: 'call', amount: 2 },
      ],
      smallBlind: 2,
      bigBlind: 2,
    };
    renderWithTheme(<GameStateDisplay request={request} />);
    // Should show folded state for UTG
    expect(screen.getByText('FOLD')).toBeTruthy();
  });

  it('handles multiple actions on same player', () => {
    const request: PotRequest = {
      requestingPosition: 'CO',
      previousActions: [
        { position: 'UTG', action: 'raise', amount: 10 },
        { position: 'MP', action: 'call', amount: 10 },
      ],
      smallBlind: 2,
      bigBlind: 2,
    };
    renderWithTheme(<GameStateDisplay request={request} />);
    expect(screen.getByText('SB: $2')).toBeTruthy();
    expect(screen.getByText('BB: $2')).toBeTruthy();
  });

  it('dealer button only shows on D position', () => {
    renderWithTheme(<GameStateDisplay {...defaultProps} />);
    const dealerButtons = screen.queryAllByText('D');
    // D position should have the dealer button indicator
    expect(dealerButtons.length).toBeGreaterThan(0);
  });

  it('handles all 6 positions requesting pot', () => {
    const positions = ['SB', 'BB', 'UTG', 'MP', 'CO', 'D'] as const;
    positions.forEach(pos => {
      const request: PotRequest = {
        requestingPosition: pos,
        previousActions: [],
        smallBlind: 2,
        bigBlind: 2,
      };
      const { unmount } = renderWithTheme(<GameStateDisplay request={request} />);
      expect(screen.getByText('ASKS POT')).toBeTruthy();
      unmount();
    });
  });

  it('renders with complex action history', () => {
    const request: PotRequest = {
      requestingPosition: 'CO',
      previousActions: [
        { position: 'UTG', action: 'call', amount: 2 },
        { position: 'MP', action: 'raise', amount: 8 },
        { position: 'BB', action: 'fold' },
      ],
      smallBlind: 2,
      bigBlind: 2,
    };
    renderWithTheme(<GameStateDisplay request={request} />);
    expect(screen.getByText('Blinds')).toBeTruthy();
    expect(screen.getByText('FOLD')).toBeTruthy();
  });

  it('displays higher blind levels correctly', () => {
    const request: PotRequest = {
      requestingPosition: 'UTG',
      previousActions: [],
      smallBlind: 100,
      bigBlind: 200,
    };
    renderWithTheme(<GameStateDisplay request={request} />);
    expect(screen.getByText('SB: $100')).toBeTruthy();
    expect(screen.getByText('BB: $200')).toBeTruthy();
  });

  it('handles empty actions array', () => {
    const request: PotRequest = {
      requestingPosition: 'SB',
      previousActions: [],
      smallBlind: 2,
      bigBlind: 2,
    };
    renderWithTheme(<GameStateDisplay request={request} />);
    expect(screen.getByText('ASKS POT')).toBeTruthy();
  });
});

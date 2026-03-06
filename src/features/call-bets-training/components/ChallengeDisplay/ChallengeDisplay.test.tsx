/**
 * Tests for ChallengeDisplay component
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import ChallengeDisplay from './ChallengeDisplay';

jest.mock('../../utils/validation', () => ({
  getModeDisplayName: jest.fn((mode: string) => {
    const names: Record<string, string> = {
      tier: 'Tier du Cylindre',
      voisins: 'Voisins du Zero',
      orphelins: 'Orphelins',
      zero: 'Jeu Zéro',
    };
    return names[mode] || mode;
  }),
}));

describe('ChallengeDisplay', () => {
  const defaultProps = {
    mode: 'tier' as const,
    totalBets: 6,
  };

  describe('rendering', () => {
    it('should render the title', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} />);
      expect(getByText('Training Challenge')).toBeTruthy();
    });

    it('should render the challenge instruction', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} />);
      expect(getByText(/Place all chips for/)).toBeTruthy();
    });

    it('should render the mode display name', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} />);
      expect(getByText('Tier du Cylindre')).toBeTruthy();
    });

    it('should render the required positions count', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} totalBets={6} />);
      expect(getByText('Required positions: 6')).toBeTruthy();
    });

    it('should display correct name for voisins mode', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} mode="voisins" />);
      expect(getByText('Voisins du Zero')).toBeTruthy();
    });

    it('should display correct name for orphelins mode', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} mode="orphelins" />);
      expect(getByText('Orphelins')).toBeTruthy();
    });

    it('should display correct name for zero mode', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} mode="zero" />);
      expect(getByText('Jeu Zéro')).toBeTruthy();
    });
  });

  describe('different bet counts', () => {
    it('should display correct count for tier (6 bets)', () => {
      const { getByText } = render(<ChallengeDisplay mode="tier" totalBets={6} />);
      expect(getByText('Required positions: 6')).toBeTruthy();
    });

    it('should display correct count for voisins (9 bets)', () => {
      const { getByText } = render(<ChallengeDisplay mode="voisins" totalBets={9} />);
      expect(getByText('Required positions: 9')).toBeTruthy();
    });

    it('should display correct count for orphelins (5 bets)', () => {
      const { getByText } = render(<ChallengeDisplay mode="orphelins" totalBets={5} />);
      expect(getByText('Required positions: 5')).toBeTruthy();
    });

    it('should display correct count for zero (4 bets)', () => {
      const { getByText } = render(<ChallengeDisplay mode="zero" totalBets={4} />);
      expect(getByText('Required positions: 4')).toBeTruthy();
    });

    it('should handle single bet count', () => {
      const { getByText } = render(<ChallengeDisplay mode="tier" totalBets={1} />);
      expect(getByText('Required positions: 1')).toBeTruthy();
    });

    it('should handle large bet counts', () => {
      const { getByText } = render(<ChallengeDisplay mode="voisins" totalBets={15} />);
      expect(getByText('Required positions: 15')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have accessible text content for title', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} />);
      expect(getByText('Training Challenge')).toBeTruthy();
    });

    it('should have accessible text content for mode name', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} />);
      expect(getByText('Tier du Cylindre')).toBeTruthy();
    });

    it('should have accessible text content for instruction', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} />);
      expect(getByText(/Place all chips for/)).toBeTruthy();
    });

    it('should have accessible text content for required positions', () => {
      const { getByText } = render(<ChallengeDisplay {...defaultProps} />);
      expect(getByText(/Required positions:/)).toBeTruthy();
    });
  });

  describe('all modes', () => {
    it('should render tier mode correctly', () => {
      const { getByText } = render(<ChallengeDisplay mode="tier" totalBets={6} />);
      expect(getByText('Tier du Cylindre')).toBeTruthy();
    });

    it('should render voisins mode correctly', () => {
      const { getByText } = render(<ChallengeDisplay mode="voisins" totalBets={9} />);
      expect(getByText('Voisins du Zero')).toBeTruthy();
    });

    it('should render orphelins mode correctly', () => {
      const { getByText } = render(<ChallengeDisplay mode="orphelins" totalBets={5} />);
      expect(getByText('Orphelins')).toBeTruthy();
    });

    it('should render zero mode correctly', () => {
      const { getByText } = render(<ChallengeDisplay mode="zero" totalBets={4} />);
      expect(getByText('Jeu Zéro')).toBeTruthy();
    });
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PlayingCard from './PlayingCard';
import type { Card } from '@utils/cardUtils';

describe('PlayingCard', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  const createCard = (rank: string, suit: 'hearts' | 'diamonds' | 'spades' | 'clubs'): Card => ({
    rank,
    suit,
  });

  it('renders a card face-up with rank and suit', () => {
    const card = createCard('A', 'spades');
    render(
      <Wrapper>
        <PlayingCard card={card} />
      </Wrapper>
    );

    const rankElements = screen.getAllByText('A');
    expect(rankElements).toHaveLength(2); // Top-left and bottom-right corners
    expect(screen.getByText('♠')).toBeOnTheScreen();
  });

  it('renders a card face-down without showing rank or suit', () => {
    const card = createCard('K', 'hearts');
    render(
      <Wrapper>
        <PlayingCard card={card} faceDown={true} />
      </Wrapper>
    );

    expect(screen.queryByText('K')).not.toBeOnTheScreen();
    expect(screen.queryByText('♥')).not.toBeOnTheScreen();
  });

  it('renders hearts suit symbol correctly', () => {
    const card = createCard('Q', 'hearts');
    render(
      <Wrapper>
        <PlayingCard card={card} />
      </Wrapper>
    );

    expect(screen.getByText('♥')).toBeOnTheScreen();
  });

  it('renders diamonds suit symbol correctly', () => {
    const card = createCard('J', 'diamonds');
    render(
      <Wrapper>
        <PlayingCard card={card} />
      </Wrapper>
    );

    expect(screen.getByText('♦')).toBeOnTheScreen();
  });

  it('renders spades suit symbol correctly', () => {
    const card = createCard('10', 'spades');
    render(
      <Wrapper>
        <PlayingCard card={card} />
      </Wrapper>
    );

    expect(screen.getByText('♠')).toBeOnTheScreen();
  });

  it('renders clubs suit symbol correctly', () => {
    const card = createCard('9', 'clubs');
    render(
      <Wrapper>
        <PlayingCard card={card} />
      </Wrapper>
    );

    expect(screen.getByText('♣')).toBeOnTheScreen();
  });

  it('renders with small size', () => {
    const card = createCard('7', 'hearts');
    const { root } = render(
      <Wrapper>
        <PlayingCard card={card} size="sm" />
      </Wrapper>
    );

    expect(root).toBeTruthy();
  });

  it('renders with medium size by default', () => {
    const card = createCard('6', 'diamonds');
    const { root } = render(
      <Wrapper>
        <PlayingCard card={card} />
      </Wrapper>
    );

    expect(root).toBeTruthy();
  });

  it('renders with large size', () => {
    const card = createCard('5', 'clubs');
    const { root } = render(
      <Wrapper>
        <PlayingCard card={card} size="lg" />
      </Wrapper>
    );

    expect(root).toBeTruthy();
  });

  it('displays all face card ranks correctly', () => {
    const faceCards: Array<[string, 'hearts' | 'diamonds' | 'spades' | 'clubs']> = [
      ['J', 'hearts'],
      ['Q', 'diamonds'],
      ['K', 'spades'],
      ['A', 'clubs'],
    ];

    faceCards.forEach(([rank, suit]) => {
      const { unmount } = render(
        <Wrapper>
          <PlayingCard card={createCard(rank, suit)} />
        </Wrapper>
      );

      const rankElements = screen.getAllByText(rank);
      expect(rankElements.length).toBeGreaterThan(0);

      unmount();
    });
  });
});

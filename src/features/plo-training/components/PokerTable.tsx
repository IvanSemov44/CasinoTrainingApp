import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PlayerPosition from './PlayerPosition';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Player {
  position: number;
  name?: string;
  chipAmount?: number;
  isDealer?: boolean;
  action?: string;
  betAmount?: number;
  isFolded?: boolean;
  isRequesting?: boolean;
}

interface PokerTableProps {
  players: Player[];
  potAmount?: number;
  communityCards?: number;
}

export default function PokerTable({ players, potAmount = 0, communityCards = 0 }: PokerTableProps) {
  // Table dimensions - responsive to screen size
  const isLandscape = screenWidth > screenHeight;
  const maxWidth = isLandscape ? screenWidth * 0.6 : screenWidth - 40;
  const tableWidth = Math.min(maxWidth, 500);
  const tableHeight = tableWidth * 0.6;

  // Calculate player positions around the table (6-max)
  const getPlayerPosition = (position: number) => {
    const playerWidth = 80;
    const playerHeight = 60;
    
    const positions = [
      // Position 1 - Bottom center
      { top: tableHeight + 10, left: (tableWidth - playerWidth) / 2 },
      // Position 2 - Bottom Right
      { top: tableHeight * 0.7, left: tableWidth - playerWidth - 5 },
      // Position 3 - Top Right
      { top: -20, left: tableWidth - playerWidth - 5 },
      // Position 4 - Top center
      { top: -playerHeight - 10, left: (tableWidth - playerWidth) / 2 },
      // Position 5 - Top Left
      { top: -20, left: 5 },
      // Position 6 - Bottom Left
      { top: tableHeight * 0.7, left: 5 },
    ];

    return positions[position - 1] || positions[0];
  };

  return (
    <View style={styles.container}>
      <View style={[styles.tableContainer, { width: tableWidth, height: tableHeight, marginTop: 80, marginBottom: 80 }]}>
        {/* Poker Table */}
        <View style={[styles.table, { width: tableWidth, height: tableHeight }]}>
          <View style={styles.tableInner}>
            {/* Community cards */}
            {communityCards > 0 && (
              <View style={styles.cardsArea}>
                {Array.from({ length: communityCards }).map((_, i) => (
                  <View key={i} style={styles.card} />
                ))}
              </View>
            )}
            
            {/* Pot in center */}
            {potAmount > 0 && (
              <View style={styles.potArea}>
                <Text style={styles.potLabel}>POT</Text>
                <Text style={styles.potAmount}>${potAmount}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Players positioned around table */}
        {players.map((player) => {
          const pos = getPlayerPosition(player.position);
          return (
            <View key={player.position} style={[styles.playerWrapper, pos]}>
              <PlayerPosition
                position={player.position}
                name={player.name}
                chipAmount={player.chipAmount}
                isDealer={player.isDealer}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                action={player.action as any}
                betAmount={player.betAmount}
                isFolded={player.isFolded}
                isRequesting={player.isRequesting}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableContainer: {
    position: 'relative',
  },
  table: {
    backgroundColor: '#0a5f38',
    borderRadius: 120,
    borderWidth: 8,
    borderColor: '#8B4513',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tableInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 112,
    borderWidth: 2,
    borderColor: '#FFD700',
    margin: 4,
  },
  potArea: {
    backgroundColor: '#1a7f50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    marginTop: 8,
  },
  potLabel: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  potAmount: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
  },
  cardsArea: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  card: {
    width: 35,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  playerWrapper: {
    position: 'absolute',
  },
});

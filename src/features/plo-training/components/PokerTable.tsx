import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../roulette-training/constants/theme';
import PlayerPosition from './PlayerPosition';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Player {
  position: number;
  name?: string;
  chipAmount: number;
  isDealer?: boolean;
}

interface PokerTableProps {
  players: Player[];
}

export default function PokerTable({ players }: PokerTableProps) {
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
            {/* Pot area in center */}
            <View style={styles.potArea}>
              {/* Pot will be displayed here */}
            </View>
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
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerWrapper: {
    position: 'absolute',
  },
});

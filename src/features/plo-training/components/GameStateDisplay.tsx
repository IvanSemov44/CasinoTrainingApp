import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PotRequest, Position } from '../types';
import { POSITIONS } from '../constants/plo.constants';
import PokerTable from './PokerTable';

interface GameStateDisplayProps {
  request: PotRequest;
}

interface TablePlayer {
  position: number;
  name: string;
  isDealer: boolean;
  chipAmount?: number;
  action?: string;
  betAmount?: number;
  isFolded?: boolean;
  isRequesting?: boolean;
}

export default function GameStateDisplay({ request }: GameStateDisplayProps) {
  const { smallBlind, bigBlind, previousActions, requestingPosition } = request;

  // Map positions to player numbers (1-6) - matching black labels in image
  const positionToPlayerNumber: Record<Position, number> = {
    'CO': 1,  // Bottom center
    'MP': 2,  // Bottom right
    'UTG': 3, // Top right
    'BB': 4,  // Top center
    'SB': 5,  // Top left
    'D': 6,   // Bottom left (with dealer button)
  };

  // Build player data from actions
  const playerMap = new Map<Position, TablePlayer>();
  
  // Initialize all positions
  POSITIONS.forEach((pos) => {
    const playerNumber = positionToPlayerNumber[pos];
    playerMap.set(pos, {
      position: playerNumber,
      name: pos,
      isDealer: pos === 'D',
      isFolded: false,
    });
  });

  // Set blind amounts for SB and BB
  const sbPlayer = playerMap.get('SB');
  if (sbPlayer) {
    sbPlayer.betAmount = smallBlind;
  }
  const bbPlayer = playerMap.get('BB');
  if (bbPlayer) {
    bbPlayer.betAmount = bigBlind;
  }

  // Update with actions
  previousActions.forEach((action) => {
    const player = playerMap.get(action.position);
    if (player) {
      player.action = action.action;
      if (action.amount !== undefined) {
        player.betAmount = action.amount;
      }
      player.isFolded = action.action === 'fold';
    }
  });

  // Mark requesting player
  const requestingPlayer = playerMap.get(requestingPosition);
  if (requestingPlayer) {
    requestingPlayer.isRequesting = true;
  }

  const players = Array.from(playerMap.values());

  return (
    <View style={styles.container}>
      <View style={styles.blindsSection}>
        <Text style={styles.blindsTitle}>Blinds</Text>
        <View style={styles.blindsRow}>
          <Text style={styles.blindText}>SB: ${smallBlind}</Text>
          <Text style={styles.blindText}>BB: ${bigBlind}</Text>
        </View>
      </View>

      <PokerTable players={players} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  blindsSection: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  blindsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 10,
  },
  blindsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  blindText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

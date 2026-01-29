import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { RouletteLayout } from '../../../components/roulette';
import { RacetrackLayout, getNeighbors } from '../../racetrack/components';
import { PlacedBet, BetType, RouletteNumber } from '../../../types/roulette.types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function RouletteGameScreen() {
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
  const [selectedChipValue, setSelectedChipValue] = useState(5);
  
  const racetrackWidth = Math.min(screenWidth - 64, 600);
  // Calculate cellSize based on screen width - roulette has ~15 cells width (12 + zero column + column bets)
  const availableWidth = Math.min(screenWidth - 64, 450);
  const cellSize = Math.max(20, Math.min(30, availableWidth / 15));

  // Define Tier split positions
  const tierSplitPositions = [
    [5, 8], [10, 11], [13, 16], [23, 24], [27, 30], [33, 36]
  ];

  // Define Orphelins positions: 1 straight + 4 splits
  const orphelinsStraightUp = [1];
  const orphelinsSplitPositions = [
    [6, 9], [14, 17], [17, 20], [31, 34]
  ];

  // Define Zero Game positions: 1 straight + 3 splits
  const zeroGameStraightUp = [26];
  const zeroGameSplitPositions = [
    [0, 3], [12, 15], [32, 35]
  ];

  // Define Voisins positions: 1 trio + 5 splits + 1 corner
  const voisinsTrioPositions = [[0, 2, 3]]; // 0-2-3 trio (double position street)
  const voisinsSplitPositions = [
    [4, 7], [12, 15], [18, 21], [19, 22], [32, 35]
  ];
  const voisinsCornerPositions = [[25, 26, 28, 29]]; // double position corner

  const handleTierClick = () => {
    console.log('Tier clicked - placing 6 split bets');
    
    // Create new bets for each split position
    const newBets: PlacedBet[] = tierSplitPositions.map(([num1, num2]) => ({
      id: `tier-split-${num1}-${num2}-${Date.now()}`,
      type: 'SPLIT' as BetType,
      numbers: [num1 as RouletteNumber, num2 as RouletteNumber],
      amount: selectedChipValue,
      payout: 17, // Split pays 17:1
      timestamp: Date.now(),
    }));
    
    console.log('New bets created:', newBets.map(b => b.numbers));
    
    setPlacedBets(prev => {
      const updated = [...prev, ...newBets];
      console.log('Total placed bets:', updated.length);
      return updated;
    });
  };

  const handleOrphelinsClick = () => {
    console.log('Orphelins clicked - placing 1 straight + 4 splits');
    
    const newBets: PlacedBet[] = [];
    
    // Add straight up bet on 1
    orphelinsStraightUp.forEach(num => {
      newBets.push({
        id: `orphelins-straight-${num}-${Date.now()}`,
        type: 'STRAIGHT' as BetType,
        numbers: [num as RouletteNumber],
        amount: selectedChipValue,
        payout: 35, // Straight pays 35:1
        timestamp: Date.now(),
      });
    });
    
    // Add split bets
    orphelinsSplitPositions.forEach(([num1, num2]) => {
      newBets.push({
        id: `orphelins-split-${num1}-${num2}-${Date.now()}`,
        type: 'SPLIT' as BetType,
        numbers: [num1 as RouletteNumber, num2 as RouletteNumber],
        amount: selectedChipValue,
        payout: 17, // Split pays 17:1
        timestamp: Date.now(),
      });
    });
    
    console.log('New bets created:', newBets.map(b => b.numbers));
    
    setPlacedBets(prev => {
      const updated = [...prev, ...newBets];
      console.log('Total placed bets:', updated.length);
      return updated;
    });
  };

  const handleZeroGameClick = () => {
    console.log('Zero Game clicked - placing 1 straight + 3 splits');
    
    const newBets: PlacedBet[] = [];
    
    // Add straight up bet on 26
    zeroGameStraightUp.forEach(num => {
      newBets.push({
        id: `zero-straight-${num}-${Date.now()}`,
        type: 'STRAIGHT' as BetType,
        numbers: [num as RouletteNumber],
        amount: selectedChipValue,
        payout: 35, // Straight pays 35:1
        timestamp: Date.now(),
      });
    });
    
    // Add split bets
    zeroGameSplitPositions.forEach(([num1, num2]) => {
      newBets.push({
        id: `zero-split-${num1}-${num2}-${Date.now()}`,
        type: 'SPLIT' as BetType,
        numbers: [num1 as RouletteNumber, num2 as RouletteNumber],
        amount: selectedChipValue,
        payout: 17, // Split pays 17:1
        timestamp: Date.now(),
      });
    });
    
    console.log('New bets created:', newBets.map(b => b.numbers));
    
    setPlacedBets(prev => {
      const updated = [...prev, ...newBets];
      console.log('Total placed bets:', updated.length);
      return updated;
    });
  };

  const handleVoisinsClick = () => {
    console.log('Voisins clicked - placing 1 trio + 5 splits + 1 corner');
    
    const newBets: PlacedBet[] = [];
    
    // Add trio bet (0-2-3) - double position street
    voisinsTrioPositions.forEach(nums => {
      newBets.push({
        id: `voisins-trio-${nums.join('-')}-${Date.now()}`,
        type: 'STREET' as BetType,
        numbers: nums as RouletteNumber[],
        amount: selectedChipValue * 2, // Double position = 2 chips
        payout: 11, // Street pays 11:1
        timestamp: Date.now(),
      });
    });
    
    // Add split bets
    voisinsSplitPositions.forEach(([num1, num2]) => {
      newBets.push({
        id: `voisins-split-${num1}-${num2}-${Date.now()}`,
        type: 'SPLIT' as BetType,
        numbers: [num1 as RouletteNumber, num2 as RouletteNumber],
        amount: selectedChipValue,
        payout: 17, // Split pays 17:1
        timestamp: Date.now(),
      });
    });
    
    // Add corner bet (25-26-28-29) - double position corner
    voisinsCornerPositions.forEach(nums => {
      newBets.push({
        id: `voisins-corner-${nums.join('-')}-${Date.now()}`,
        type: 'CORNER' as BetType,
        numbers: nums as RouletteNumber[],
        amount: selectedChipValue * 2, // Double position = 2 chips
        payout: 8, // Corner pays 8:1
        timestamp: Date.now(),
      });
    });
    
    console.log('New bets created:', newBets.map(b => b.numbers));
    
    setPlacedBets(prev => {
      const updated = [...prev, ...newBets];
      console.log('Total placed bets:', updated.length);
      return updated;
    });
  };

  const handleSectionPress = (section: 'tier' | 'orphelins' | 'voisins' | 'zero') => {
    console.log('Section pressed:', section);
    if (section === 'tier') {
      handleTierClick();
    } else if (section === 'orphelins') {
      handleOrphelinsClick();
    } else if (section === 'zero') {
      handleZeroGameClick();
    } else if (section === 'voisins') {
      handleVoisinsClick();
    }
  };

  const handleNeighborsClick = (numberStr: string) => {
    const number = parseInt(numberStr, 10);
    console.log('Neighbors bet - clicked number:', number);
    
    // Get 2 neighbors on each side (5 numbers total)
    const neighbors = getNeighbors(number, 2);
    console.log('Neighbors:', neighbors);
    
    // Create 5 straight bets
    const newBets: PlacedBet[] = neighbors.map(num => ({
      id: `neighbors-straight-${num}-${Date.now()}-${Math.random()}`,
      type: 'STRAIGHT' as BetType,
      numbers: [num as RouletteNumber],
      amount: selectedChipValue,
      payout: 35, // Straight pays 35:1
      timestamp: Date.now(),
    }));
    
    console.log('New neighbors bets created:', newBets.map(b => b.numbers));
    
    setPlacedBets(prev => {
      const updated = [...prev, ...newBets];
      console.log('Total placed bets:', updated.length);
      return updated;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        {/* Racetrack at the top */}
        <View style={styles.racetrackContainer}>
          <RacetrackLayout 
            width={racetrackWidth} 
            onSectionPress={handleSectionPress}
            onNumberPress={handleNeighborsClick}
          />
        </View>

        {/* Roulette layout below */}
        <View style={styles.rouletteContainer}>
          <RouletteLayout 
            onNumberPress={(number) => {
              console.log('Number pressed:', number);
            }}
            onBetAreaPress={(betType, numbers) => {
              console.log('Bet placed:', betType, numbers);
            }}
            placedBets={placedBets}
            selectedChipValue={selectedChipValue}
            cellSize={cellSize}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: SPACING.lg,
  },
  gameContainer: {
    backgroundColor: '#1a472a',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FFD700',
    padding: SPACING.md,
    alignItems: 'center',
  },
  racetrackContainer: {
    marginBottom: SPACING.sm,
  },
  rouletteContainer: {
    alignItems: 'center',
  },
});
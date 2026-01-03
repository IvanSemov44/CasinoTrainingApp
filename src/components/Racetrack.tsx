import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { WHEEL_ORDER } from '../constants/roulette.constants';
import { RouletteNumber } from '../types/roulette.types';

interface RacetrackProps {
  onNumberPress: (number: RouletteNumber) => void;
  onNeighborBet?: (number: RouletteNumber, neighbors: number) => void;
  highlightedNumbers?: RouletteNumber[];
}

const Racetrack: React.FC<RacetrackProps> = ({ 
  onNumberPress,
  highlightedNumbers = [] 
}) => {
  const getNumberColor = (num: RouletteNumber): string => {
    if (num === 0) return '#006400';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? '#CC0000' : '#000000';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Racetrack - Neighbor Bets</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.wheelContainer}
      >
        {WHEEL_ORDER.map((num) => {
          const isHighlighted = highlightedNumbers.includes(num);
          const backgroundColor = getNumberColor(num);
          
          return (
            <TouchableOpacity
              key={num}
              style={[
                styles.numberCell,
                { backgroundColor },
                isHighlighted && styles.highlightedCell,
              ]}
              onPress={() => onNumberPress(num)}
            >
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Special bet buttons */}
      <View style={styles.specialBetsContainer}>
        <TouchableOpacity style={styles.specialBet}>
          <Text style={styles.specialBetText}>Voisins du Zero</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.specialBet}>
          <Text style={styles.specialBetText}>Tiers du Cylindre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.specialBet}>
          <Text style={styles.specialBetText}>Orphelins</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.specialBet}>
          <Text style={styles.specialBetText}>Zero Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a5f2f',
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#8B4513',
    marginTop: 10,
  },
  title: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  wheelContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  numberCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 20,
    marginHorizontal: 2,
  },
  highlightedCell: {
    borderColor: '#FFFF00',
    borderWidth: 3,
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  specialBetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 5,
  },
  specialBet: {
    backgroundColor: '#1a5f3f',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  specialBetText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Racetrack;

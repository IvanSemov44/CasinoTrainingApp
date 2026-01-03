import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Casino Dealer Training</Text>
      <Text style={styles.subtitle}>Master your skills</Text>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('RouletteLayoutView')}
        >
          <Text style={styles.menuButtonText}>🎯 View Roulette Layout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('RouletteExercises')}
        >
          <Text style={styles.menuButtonText}>🎰 Roulette Training</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuButton, styles.menuButtonDisabled]}
          disabled
        >
          <Text style={styles.menuButtonText}>🃏 Card Games (Coming Soon)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuButton, styles.menuButtonDisabled]}
          disabled
        >
          <Text style={styles.menuButtonText}>🎲 Poker Games (Coming Soon)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Progress')}
        >
          <Text style={styles.menuButtonText}>📊 My Progress</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2f1f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 50,
    textAlign: 'center',
  },
  menuContainer: {
    width: '100%',
    maxWidth: 400,
  },
  menuButton: {
    backgroundColor: '#1a5f3f',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  menuButtonDisabled: {
    backgroundColor: '#0f3f2f',
    borderColor: '#666666',
    opacity: 0.5,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

/**
 * Info box explaining how to play sector training
 */
export function SectorInfoBox() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to Play:</Text>
      <Text style={styles.text}>1. A winning number is displayed at the top</Text>
      <Text style={styles.text}>2. Tap the correct sector on the racetrack</Text>
      <Text style={styles.text}>3. Get feedback and try the next number</Text>
      <Text style={styles.text}>4. Build your score with each correct answer</Text>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.gold,
      marginBottom: 8,
    },
    text: {
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 4,
    },
  });
}

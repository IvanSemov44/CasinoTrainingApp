import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { AccentModeCard } from '@components/shared';
import { PositionMode } from '../../types';
import { getWheelOrder } from '../../utils/validation';
import { PositionWheelOrderCard } from '../../components/PositionWheelOrderCard';
import { PositionInfoBox } from '../../components/PositionInfoBox';
import type { PositionMenuScreenProps } from './PositionMenuScreen.types';

interface ModeOption {
  mode: PositionMode;
  title: string;
  description: string;
  color: string;
}

// Accent colors for position training modes - visual hierarchy indicators
const POSITION_ACCENT_COLORS: Record<PositionMode, string> = {
  single: '#3b82f6', // Blue
  random: '#10b981', // Green
};

const MODE_OPTIONS: ModeOption[] = [
  {
    mode: 'single',
    title: 'Single Number',
    description: 'Tap the exact number on the racetrack',
    color: POSITION_ACCENT_COLORS.single,
  },
  {
    mode: 'random',
    title: 'Random Training',
    description: 'Practice finding numbers randomly',
    color: POSITION_ACCENT_COLORS.random,
  },
];

export default function PositionMenuScreen({ navigation }: PositionMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const handleModeSelect = (mode: PositionMode) => {
    navigation.navigate('PositionTraining', { mode });
  };

  const wheelOrder = getWheelOrder();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Number → Position</Text>
        <Text style={styles.subtitle}>Find the winning number on the racetrack</Text>
      </View>

      <PositionWheelOrderCard wheelOrder={wheelOrder} />

      <View style={styles.modesContainer}>
        <Text style={styles.sectionTitle}>Select Training Mode:</Text>
        {MODE_OPTIONS.map(option => (
          <AccentModeCard
            key={option.mode}
            title={option.title}
            description={option.description}
            accentColor={option.color}
            onPress={() => handleModeSelect(option.mode)}
          />
        ))}
      </View>

      <PositionInfoBox />
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    contentContainer: {
      padding: 24,
      paddingBottom: 32,
    },
    header: {
      marginBottom: 24,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 4,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    modesContainer: {
      gap: 16,
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 8,
    },
  });
}

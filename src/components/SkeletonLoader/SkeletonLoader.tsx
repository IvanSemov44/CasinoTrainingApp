import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, StyleProp, DimensionValue } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

interface SkeletonLoaderProps {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width,
  height,
  borderRadius = 4,
  style,
}) => {
  const styles = useThemedStyles(makeStyles);
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const shimmerTranslate = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 1],
  });

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            borderRadius,
            transform: [{ translateX: shimmerTranslate }],
          },
        ]}
      />
    </View>
  );
};

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.mediumGray,
      overflow: 'hidden',
    },
    shimmer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: `${colors.text.primary}10`,
    },
  });
}

export default SkeletonLoader;

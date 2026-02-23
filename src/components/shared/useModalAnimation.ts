import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

/**
 * Custom hook for modal animation effects.
 * Provides fade and scale animations for modal open/close transitions.
 * 
 * @param visible - Whether the modal is currently visible
 * @returns Object containing fadeAnim and scaleAnim Animated.Values
 * 
 * @example
 * const { fadeAnim, scaleAnim } = useModalAnimation(visible);
 * 
 * return (
 *   <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
 *     {children}
 *   </Animated.View>
 * );
 */
export function useModalAnimation(visible: boolean) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 65,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  return { fadeAnim, scaleAnim };
}

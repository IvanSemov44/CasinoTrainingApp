/**
 * Tests for useModalAnimation hook
 */
import { renderHook } from '@testing-library/react-native';
import { Animated } from 'react-native';
import { useModalAnimation } from '../useModalAnimation';

// Mock Animated with more detailed implementation
jest.mock('react-native', () => ({
  Animated: {
    Value: jest.fn((initialValue: number) => ({
      _value: initialValue,
      setValue: jest.fn(function(this: { _value: number }, v: number) { this._value = v; }),
    })),
    timing: jest.fn((value: { _value: number }, config: object) => ({
      start: jest.fn(),
      _value: value,
      _config: config,
    })),
    spring: jest.fn((value: { _value: number }, config: object) => ({
      start: jest.fn(),
      _value: value,
      _config: config,
    })),
    parallel: jest.fn((animations: object[]) => ({
      start: jest.fn(),
      _animations: animations,
    })),
  },
}));

describe('useModalAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should return fadeAnim and scaleAnim values', () => {
      const { result } = renderHook(() => useModalAnimation(false));

      expect(result.current).toHaveProperty('fadeAnim');
      expect(result.current).toHaveProperty('scaleAnim');
    });

    it('should create Animated.Value instances with correct initial values', () => {
      renderHook(() => useModalAnimation(false));

      // Animated.Value should be called with initial values
      expect(Animated.Value).toHaveBeenCalledWith(0); // fadeAnim starts at 0
      expect(Animated.Value).toHaveBeenCalledWith(0.9); // scaleAnim starts at 0.9
    });
  });

  describe('when visible is false', () => {
    it('should trigger close animation (parallel with timing)', () => {
      renderHook(() => useModalAnimation(false));

      // When not visible, parallel animation should be called with timing for both
      expect(Animated.parallel).toHaveBeenCalled();
      expect(Animated.timing).toHaveBeenCalled();
    });
  });

  describe('when visible is true', () => {
    it('should trigger parallel animations with timing and spring', () => {
      renderHook(() => useModalAnimation(true));

      expect(Animated.parallel).toHaveBeenCalled();
      expect(Animated.timing).toHaveBeenCalled();
      expect(Animated.spring).toHaveBeenCalled();
    });

    it('should call parallel().start()', () => {
      renderHook(() => useModalAnimation(true));

      const mockParallel = Animated.parallel as jest.Mock;
      expect(mockParallel).toHaveBeenCalled();
      
      const result = mockParallel.mock.results[0];
      expect(result.value.start).toBeDefined();
      expect(result.value.start).toHaveBeenCalled();
    });

    it('should use correct fade animation config (toValue: 1, duration: 200)', () => {
      renderHook(() => useModalAnimation(true));

      const mockTiming = Animated.timing as jest.Mock;
      const timingCalls = mockTiming.mock.calls;

      // Find the fade animation call (toValue: 1)
      const fadeCall = timingCalls.find(
        (call: any[]) => call[1] && call[1].toValue === 1 && call[1].duration === 200
      );

      expect(fadeCall).toBeDefined();
      expect(fadeCall[1].useNativeDriver).toBe(true);
    });

    it('should use correct spring animation config (toValue: 1, friction: 8, tension: 65)', () => {
      renderHook(() => useModalAnimation(true));

      const mockSpring = Animated.spring as jest.Mock;
      const springCalls = mockSpring.mock.calls;

      // Find the spring animation call
      const springCall = springCalls.find(
        (call: any[]) => call[1] && call[1].toValue === 1
      );

      expect(springCall).toBeDefined();
      expect(springCall[1].friction).toBe(8);
      expect(springCall[1].tension).toBe(65);
      expect(springCall[1].useNativeDriver).toBe(true);
    });
  });

  describe('visibility changes', () => {
    it('should re-run effect when visibility changes', () => {
      const { rerender } = renderHook(
        ({ visible }: { visible: boolean }) => useModalAnimation(visible),
        { initialProps: { visible: false } }
      );

      // Initial render with visible=false
      expect(Animated.parallel).toHaveBeenCalledTimes(1);

      // Rerender with visible=true
      rerender({ visible: true });
      expect(Animated.parallel).toHaveBeenCalledTimes(2);

      // Rerender with visible=false again
      rerender({ visible: false });
      expect(Animated.parallel).toHaveBeenCalledTimes(3);
    });

    it('should use close animation config when visibility changes to false', () => {
      const { rerender } = renderHook(
        ({ visible }: { visible: boolean }) => useModalAnimation(visible),
        { initialProps: { visible: true } }
      );

      jest.clearAllMocks();
      
      rerender({ visible: false });

      const mockTiming = Animated.timing as jest.Mock;
      const timingCalls = mockTiming.mock.calls;

      // Close animation should use timing with duration 150
      const closeTimingCalls = timingCalls.filter(
        (call: any[]) => call[1] && call[1].duration === 150
      );

      expect(closeTimingCalls.length).toBeGreaterThanOrEqual(2); // fade and scale both use timing
    });
  });

  describe('animation configuration', () => {
    it('should pass fadeAnim as first argument to timing', () => {
      renderHook(() => useModalAnimation(true));

      const mockTiming = Animated.timing as jest.Mock;
      const firstCall = mockTiming.mock.calls[0];

      // First argument should be the fadeAnim value object
      expect(firstCall[0]).toHaveProperty('_value');
    });

    it('should pass scaleAnim as first argument to spring', () => {
      renderHook(() => useModalAnimation(true));

      const mockSpring = Animated.spring as jest.Mock;
      const firstCall = mockSpring.mock.calls[0];

      // First argument should be the scaleAnim value object
      expect(firstCall[0]).toHaveProperty('_value');
    });

    it('should pass two animations to parallel when visible', () => {
      renderHook(() => useModalAnimation(true));

      const mockParallel = Animated.parallel as jest.Mock;
      const parallelCall = mockParallel.mock.calls[0];

      // parallel should receive an array of 2 animations
      expect(parallelCall[0]).toHaveLength(2);
    });
  });
});

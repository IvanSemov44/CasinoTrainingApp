import { renderHook } from '@testing-library/react-native';
import { useModalAnimation } from './useModalAnimation';

describe('useModalAnimation', () => {
  it('returns fadeAnim and scaleAnim values', () => {
    const { result } = renderHook(() => useModalAnimation(false));

    expect(result.current.fadeAnim).toBeDefined();
    expect(result.current.scaleAnim).toBeDefined();
  });

  it('returns objects with animation methods', () => {
    const { result } = renderHook(() => useModalAnimation(false));

    // Verify they have animation-specific methods
    expect(typeof result.current.fadeAnim.setValue).toBe('function');
    expect(typeof result.current.scaleAnim.setValue).toBe('function');
  });

  it('can be called with visible true', () => {
    const { result } = renderHook(() => useModalAnimation(true));

    expect(result.current.fadeAnim).toBeDefined();
    expect(result.current.scaleAnim).toBeDefined();
  });

  it('can be called with visible false', () => {
    const { result } = renderHook(() => useModalAnimation(false));

    expect(result.current.fadeAnim).toBeDefined();
    expect(result.current.scaleAnim).toBeDefined();
  });

  it('hook does not throw errors on mount and unmount', () => {
    const { result, unmount } = renderHook(() => useModalAnimation(true));

    expect(result.current.fadeAnim).toBeDefined();

    unmount();
    // If we get here without error, cleanup is working
    expect(true).toBe(true);
  });
});

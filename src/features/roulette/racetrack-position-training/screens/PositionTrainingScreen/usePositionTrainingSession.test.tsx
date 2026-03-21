import { act, renderHook } from '@testing-library/react-native';
import { usePositionTrainingSession } from './usePositionTrainingSession';

jest.mock('../../utils/validation', () => ({
  getRandomWinningNumber: jest.fn(),
  validatePositionSelection: jest.fn(),
}));

const { getRandomWinningNumber, validatePositionSelection } = jest.requireMock(
  '../../utils/validation'
) as {
  getRandomWinningNumber: jest.Mock;
  validatePositionSelection: jest.Mock;
};

describe('usePositionTrainingSession', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('generates an initial number on mount', () => {
    getRandomWinningNumber.mockReturnValue(17);

    const { result } = renderHook(() => usePositionTrainingSession({ mode: 'random' }));

    expect(getRandomWinningNumber).toHaveBeenCalledTimes(1);
    expect(result.current.currentWinningNumber).toBe(17);
  });

  it('increments stats and auto-advances on correct answer', () => {
    getRandomWinningNumber.mockReturnValueOnce(12).mockReturnValueOnce(33);
    validatePositionSelection.mockReturnValue({
      isCorrect: true,
      correctNumber: 12,
      userNumber: 12,
      winningNumber: 12,
      score: 100,
    });

    const { result } = renderHook(() => usePositionTrainingSession({ mode: 'single' }));

    act(() => {
      result.current.handleNumberPress('12');
    });

    expect(result.current.stats).toEqual({ correct: 1, total: 1 });
    expect(result.current.isProcessing).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getRandomWinningNumber).toHaveBeenCalledTimes(2);
    expect(result.current.currentWinningNumber).toBe(33);
    expect(result.current.result).toBeNull();
    expect(result.current.isProcessing).toBe(false);
  });

  it('updates stats and does not auto-advance on incorrect answer', () => {
    getRandomWinningNumber.mockReturnValue(9);
    validatePositionSelection.mockReturnValue({
      isCorrect: false,
      correctNumber: 9,
      userNumber: 12,
      winningNumber: 9,
      score: 0,
    });

    const { result } = renderHook(() => usePositionTrainingSession({ mode: 'random' }));

    act(() => {
      result.current.handleNumberPress('12');
    });

    expect(result.current.stats).toEqual({ correct: 0, total: 1 });
    expect(result.current.result?.isCorrect).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getRandomWinningNumber).toHaveBeenCalledTimes(1);
  });

  it('resets round when handleNext is called', () => {
    getRandomWinningNumber.mockReturnValueOnce(4).mockReturnValueOnce(22);

    const { result } = renderHook(() => usePositionTrainingSession({ mode: 'random' }));

    act(() => {
      result.current.handleNext();
    });

    expect(getRandomWinningNumber).toHaveBeenCalledTimes(2);
    expect(result.current.currentWinningNumber).toBe(22);
    expect(result.current.result).toBeNull();
    expect(result.current.isProcessing).toBe(false);
  });
});

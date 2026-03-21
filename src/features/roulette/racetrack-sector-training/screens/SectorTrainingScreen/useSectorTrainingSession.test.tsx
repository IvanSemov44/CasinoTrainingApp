import { act, renderHook } from '@testing-library/react-native';
import { useSectorTrainingSession } from './useSectorTrainingSession';

jest.mock('../../utils/validation', () => ({
  getRandomWinningNumber: jest.fn(),
  getSectorForNumber: jest.fn(),
  validateSectorSelection: jest.fn(),
}));

const { getRandomWinningNumber, getSectorForNumber, validateSectorSelection } = jest.requireMock(
  '../../utils/validation'
) as {
  getRandomWinningNumber: jest.Mock;
  getSectorForNumber: jest.Mock;
  validateSectorSelection: jest.Mock;
};

describe('useSectorTrainingSession', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('generates initial number on mount', () => {
    getRandomWinningNumber.mockReturnValue(18);

    const { result } = renderHook(() => useSectorTrainingSession({ mode: 'random' }));

    expect(result.current.currentWinningNumber).toBe(18);
    expect(getRandomWinningNumber).toHaveBeenCalledTimes(1);
  });

  it('filters generated number for non-random mode', () => {
    getRandomWinningNumber.mockReturnValueOnce(12).mockReturnValueOnce(29);
    getSectorForNumber.mockReturnValueOnce('tier').mockReturnValueOnce('voisins');

    const { result } = renderHook(() => useSectorTrainingSession({ mode: 'voisins' }));

    expect(getRandomWinningNumber).toHaveBeenCalledTimes(2);
    expect(result.current.currentWinningNumber).toBe(29);
  });

  it('increments stats and auto-advances when answer is correct', async () => {
    getRandomWinningNumber.mockReturnValueOnce(7).mockReturnValueOnce(32);
    validateSectorSelection.mockReturnValue({ isCorrect: true });
    const onCorrect = jest.fn();

    const { result } = renderHook(() => useSectorTrainingSession({ mode: 'random', onCorrect }));

    await act(async () => {
      await result.current.handleSectorPress('voisins');
    });

    expect(result.current.stats).toEqual({ correct: 1, total: 1 });
    expect(onCorrect).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.currentWinningNumber).toBe(32);
    expect(result.current.isProcessing).toBe(false);
  });

  it('increments total and stays on same number when answer is incorrect', async () => {
    getRandomWinningNumber.mockReturnValue(17);
    validateSectorSelection.mockReturnValue({ isCorrect: false });
    const onIncorrect = jest.fn();

    const { result } = renderHook(() => useSectorTrainingSession({ mode: 'random', onIncorrect }));

    await act(async () => {
      await result.current.handleSectorPress('tier');
    });

    expect(result.current.stats).toEqual({ correct: 0, total: 1 });
    expect(onIncorrect).toHaveBeenCalledTimes(1);
    expect(result.current.isProcessing).toBe(false);
    expect(getRandomWinningNumber).toHaveBeenCalledTimes(1);
  });
});

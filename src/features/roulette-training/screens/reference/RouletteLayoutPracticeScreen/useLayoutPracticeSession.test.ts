import { act, renderHook } from '@testing-library/react-native';
import { BetType } from '@app-types/roulette.types';
import { useLayoutPracticeSession } from './useLayoutPracticeSession';

const mockDispatch = jest.fn();
const mockPlaceBet = jest.fn((payload) => ({ type: 'roulette/placeBet', payload }));
const mockClearBets = jest.fn(() => ({ type: 'roulette/clearBets' }));
const mockSetSelectedChipValue = jest.fn((payload) => ({ type: 'roulette/setSelectedChipValue', payload }));

let mockState = {
  roulette: {
    selectedChipValue: 25,
    placedBets: [] as Array<{ amount: number }>,
  },
};

jest.mock('@store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (s: typeof mockState) => unknown) => selector(mockState),
}));

jest.mock('@store/rouletteSlice', () => ({
  placeBet: (payload: unknown) => mockPlaceBet(payload),
  clearBets: () => mockClearBets(),
  setSelectedChipValue: (payload: number) => mockSetSelectedChipValue(payload),
}));

describe('useLayoutPracticeSession', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockState = {
      roulette: {
        selectedChipValue: 25,
        placedBets: [],
      },
    };
  });

  it('exposes selected chip value and total amount from store', () => {
    mockState.roulette.placedBets = [{ amount: 1 }, { amount: 3 }, { amount: 2 }];

    const { result } = renderHook(() => useLayoutPracticeSession());

    expect(result.current.selectedChipValue).toBe(25);
    expect(result.current.totalBetAmount).toBe(6);
  });

  it('updates selected number when number is pressed', () => {
    const { result } = renderHook(() => useLayoutPracticeSession());

    act(() => {
      result.current.handleNumberPress(17);
    });

    expect(result.current.selectedNumber).toBe(17);
  });

  it('dispatches setSelectedChipValue on chip selection', () => {
    const { result } = renderHook(() => useLayoutPracticeSession());

    act(() => {
      result.current.handleChipSelect(100);
    });

    expect(mockSetSelectedChipValue).toHaveBeenCalledWith(100);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'roulette/setSelectedChipValue',
      payload: 100,
    });
  });

  it('dispatches placeBet and shows bet details alert', () => {
    const showAlert = jest.fn();
    jest.spyOn(Date, 'now').mockReturnValue(123456789);
    const { result } = renderHook(() => useLayoutPracticeSession({ showAlert }));

    act(() => {
      result.current.handleBetAreaPress(BetType.STRAIGHT, [7]);
    });

    expect(mockPlaceBet).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'roulette/placeBet',
      })
    );
    expect(showAlert).toHaveBeenCalledWith(
      'STRAIGHT Bet',
      expect.stringContaining('Numbers: 7')
    );

    (Date.now as jest.MockedFunction<typeof Date.now>).mockRestore();
  });

  it('clears bets, resets selected number, and shows cleared alert', () => {
    const showAlert = jest.fn();
    const { result } = renderHook(() => useLayoutPracticeSession({ showAlert }));

    act(() => {
      result.current.handleNumberPress(20);
      result.current.handleClearBets();
    });

    expect(mockClearBets).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'roulette/clearBets' });
    expect(result.current.selectedNumber).toBeNull();
    expect(showAlert).toHaveBeenCalledWith('Cleared', 'All bets have been cleared');
  });
});

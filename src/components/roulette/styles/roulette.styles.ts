import { StyleSheet } from 'react-native';

export const getRouletteStyles = (cellSize: number) => StyleSheet.create({
  // Container styles
  container: {
    backgroundColor: '#1a472a',
    padding: 0,
    borderRadius: 0,
    borderWidth: 0,
    alignSelf: 'flex-start',
  },
  
  // Main layout
  mainLayout: {
    flexDirection: 'row',
    backgroundColor: '#0d3320',
    alignItems: 'flex-start',
    borderRadius: 0,
    padding: 8,
  },
  
  // Number cell styles
  numberCell: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
    backgroundColor: '#000000',
  },
  redCell: {
    backgroundColor: '#FF0000',
  },
  blackCell: {
    backgroundColor: '#000000',
  },
  greenCell: {
    backgroundColor: '#4EA72E',
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: cellSize * 0.45,
    fontWeight: 'bold',
  },
  redText: {
    color: '#DC143C',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  
  // Wrapper styles
  numberWrapper: {
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
  
  // Bet area styles
  horizontalSplit: {
    position: 'absolute',
    right: -8,
    top: 0,
    width: 16,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  verticalSplit: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: cellSize,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  cornerBet: {
    position: 'absolute',
    bottom: -12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  streetBet: {
    position: 'absolute',
    top: -12,
    left: 0,
    width: cellSize,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sixLineBet: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
  },
});

export const getZeroColumnStyles = (cellSize: number) => StyleSheet.create({
  zeroColumn: {
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 0,
    paddingLeft: 0,
  },
  zeroCell: {
    width: cellSize * 1.5,
    height: cellSize * 3 + 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
    marginLeft: 0,
  },
  zeroSplit: {
    position: 'absolute',
    right: -8,
    width: 16,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  zeroSplitTop: {
    top: 0,
  },
  zeroSplitMiddle: {
    top: cellSize + 1,
  },
  zeroSplitBottom: {
    top: cellSize * 2 + 2,
  },
  firstCorner: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  zeroStreetBet: {
    position: 'absolute',
    top: cellSize * 2 - 12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  zeroStreetBet2: {
    position: 'absolute',
    top: cellSize - 12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export const getOutsideBetsStyles = (cellSize: number) => StyleSheet.create({
  outsideBetsRow: {
    flexDirection: 'row',
    backgroundColor: '#0d3320',
  },
  emptyCorner: {
    width: cellSize * 1.5,
    backgroundColor: '#0d3320',
  },
  dozensRow: {
    flex: 1,
    flexDirection: 'row',
  },
  evenMoneyRow: {
    flex: 1,
    flexDirection: 'row',
  },
  dozenBet: {
    width: cellSize * 4,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d3320',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  evenMoneyBet: {
    width: cellSize * 2,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d3320',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  outsideBetText: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export const getColumnBetsStyles = (cellSize: number) => StyleSheet.create({
  columnBetsContainer: {
    justifyContent: 'flex-start',
  },
  columnBet: {
    width: cellSize * 1.5,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d3320',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  columnBetText: {
    color: '#FFD700',
    fontSize: cellSize * 0.45,
    fontWeight: 'bold',
  },
});

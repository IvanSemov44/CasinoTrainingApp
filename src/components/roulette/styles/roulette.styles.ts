import { StyleSheet } from 'react-native';

export const getRouletteStyles = (cellSize: number) => StyleSheet.create({
  // Container styles
  container: {
    backgroundColor: '#000000',
    padding: 0,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#000000',
    alignSelf: 'flex-start',
  },
  
  // Main layout
  mainLayout: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    alignItems: 'flex-start',
  },
  
  // Number cell styles
  numberCell: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#000000',
  },
  redCell: {
    backgroundColor: '#DC143C',
  },
  blackCell: {
    backgroundColor: '#000000',
  },
  greenCell: {
    backgroundColor: '#008000',
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
    borderColor: '#FFFFFF',
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
    backgroundColor: '#000000',
  },
  emptyCorner: {
    width: cellSize * 1.5,
    backgroundColor: '#000000',
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
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  evenMoneyBet: {
    width: cellSize * 2,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  outsideBetText: {
    color: '#FFFFFF',
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
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  columnBetText: {
    color: '#FFFFFF',
    fontSize: cellSize * 0.45,
    fontWeight: 'bold',
  },
});

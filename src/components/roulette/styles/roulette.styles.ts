import { StyleSheet } from 'react-native';

export const getRouletteStyles = (cellSize: number) => StyleSheet.create({
  // Container styles
  container: {
    backgroundColor: '#1a472a',
    padding: 0,
    borderRadius: 0,
    borderWidth: 0,
    alignSelf: 'flex-start',
    overflow: 'visible',
  },
  
  // Main layout
  mainLayout: {
    flexDirection: 'row',
    backgroundColor: '#0d3320',
    alignItems: 'flex-start',
    borderRadius: 0,
    padding: 8,
    overflow: 'visible',
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
    overflow: 'visible',
    position: 'relative',
    zIndex: 1,
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
    overflow: 'visible',
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  
  // Bet area styles
  horizontalSplit: {
    position: 'absolute',
    right: -Math.round(cellSize * 0.175),
    top: 0,
    width: Math.round(cellSize * 0.35),
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    elevation: 50,
    overflow: 'visible',
  },
  verticalSplit: {
    position: 'absolute',
    bottom: -Math.round(cellSize * 0.175),
    left: 0,
    width: cellSize,
    height: Math.round(cellSize * 0.35),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    elevation: 50,
    overflow: 'visible',
  },
  cornerBet: {
    position: 'absolute',
    bottom: -Math.round(cellSize * 0.25),
    right: -Math.round(cellSize * 0.25),
    width: Math.round(cellSize * 0.5),
    height: Math.round(cellSize * 0.5),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 60,
    elevation: 60,
    overflow: 'visible',
  },
  streetBet: {
    position: 'absolute',
    top: -Math.round(cellSize * 0.25),
    left: 0,
    width: cellSize,
    height: Math.round(cellSize * 0.5),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    elevation: 50,
    overflow: 'visible',
  },
  sixLineBet: {
    position: 'absolute',
    top: -Math.round(cellSize * 0.25),
    right: -Math.round(cellSize * 0.25),
    width: Math.round(cellSize * 0.5),
    height: Math.round(cellSize * 0.5),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 55,
    elevation: 55,
    overflow: 'visible',
  },
});

export const getZeroColumnStyles = (cellSize: number) => StyleSheet.create({
  zeroColumn: {
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 0,
    paddingLeft: 0,
    overflow: 'visible',
    zIndex: 1,
  },
  zeroCell: {
    width: cellSize * 1.5,
    height: cellSize * 3 + 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
    marginLeft: 0,
    overflow: 'visible',
    position: 'relative',
    zIndex: 1,
  },
  zeroSplit: {
    position: 'absolute',
    right: -8,
    width: 16,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    elevation: 50,
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
    zIndex: 60,
    elevation: 60,
  },
  zeroStreetBet: {
    position: 'absolute',
    top: cellSize * 2 - 12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    elevation: 50,
  },
  zeroStreetBet2: {
    position: 'absolute',
    top: cellSize - 12,
    right: -12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    elevation: 50,
  },
});

export const getOutsideBetsStyles = (cellSize: number) => StyleSheet.create({
  outsideBetsRow: {
    flexDirection: 'row',
    backgroundColor: '#0d3320',
    overflow: 'visible',
  },
  emptyCorner: {
    width: cellSize * 1.5,
    backgroundColor: '#0d3320',
  },
  dozensRow: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'visible',
  },
  evenMoneyRow: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'visible',
  },
  dozenBet: {
    width: cellSize * 4,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d3320',
    borderWidth: 1,
    borderColor: '#FFD700',
    overflow: 'visible',
    position: 'relative',
    zIndex: 1,
  },
  evenMoneyBet: {
    width: cellSize * 2,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d3320',
    borderWidth: 1,
    borderColor: '#FFD700',
    overflow: 'visible',
    position: 'relative',
    zIndex: 1,
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
    overflow: 'visible',
  },
  columnBet: {
    width: cellSize * 1.5,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d3320',
    borderWidth: 1,
    borderColor: '#FFD700',
    overflow: 'visible',
    position: 'relative',
    zIndex: 1,
  },
  columnBetText: {
    color: '#FFD700',
    fontSize: cellSize * 0.45,
    fontWeight: 'bold',
  },
});

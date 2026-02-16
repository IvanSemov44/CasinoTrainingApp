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
  
  // Grid container for layered rendering
  gridContainer: {
    position: 'relative',
    overflow: 'visible',
  },
  
  // Bet areas layer - positioned on top of cells
  betAreasLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
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
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  
  // Bet area styles - positioned relative to grid
  horizontalSplit: {
    position: 'absolute',
    width: Math.round(cellSize * 0.6),
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
    elevation: 500,
    marginLeft: cellSize - Math.round(cellSize * 0.3),
  },
  verticalSplit: {
    position: 'absolute',
    width: cellSize,
    height: Math.round(cellSize * 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
    elevation: 500,
    marginTop: cellSize - Math.round(cellSize * 0.3),
  },
  cornerBet: {
    position: 'absolute',
    width: Math.round(cellSize * 0.6),
    height: Math.round(cellSize * 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 600,
    elevation: 600,
    marginLeft: cellSize - Math.round(cellSize * 0.3),
    marginTop: cellSize - Math.round(cellSize * 0.3),
  },
  streetBet: {
    position: 'absolute',
    width: cellSize,
    height: Math.round(cellSize * 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
    elevation: 500,
    marginTop: -Math.round(cellSize * 0.3),
  },
  sixLineBet: {
    position: 'absolute',
    width: Math.round(cellSize * 0.6),
    height: Math.round(cellSize * 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 550,
    elevation: 550,
    marginLeft: cellSize - Math.round(cellSize * 0.3),
    marginTop: -Math.round(cellSize * 0.3),
  },
});

export const getZeroColumnStyles = (cellSize: number) => StyleSheet.create({
  zeroColumn: {
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 0,
    paddingLeft: 0,
    overflow: 'visible',
  },
  betAreasLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
    overflow: 'visible',
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
  },
  zeroSplit: {
    position: 'absolute',
    left: cellSize * 1.5,
    width: 16,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
    elevation: 500,
    overflow: 'visible',
  },
  zeroSplitTop: {
    top: 8,
  },
  zeroSplitMiddle: {
    top: 8 + cellSize + 1,
  },
  zeroSplitBottom: {
    top: 8 + cellSize * 2 + 2,
  },
  firstCorner: {
    position: 'absolute',
    top: -4,
    left: cellSize * 1.5 - 4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 600,
    elevation: 600,
    overflow: 'visible',
  },
  zeroStreetBet: {
    position: 'absolute',
    top: 8 + cellSize * 2 - 12,
    left: cellSize * 1.5 - 4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
    elevation: 500,
    overflow: 'visible',
  },
  zeroStreetBet2: {
    position: 'absolute',
    top: 8 + cellSize - 12,
    left: cellSize * 1.5 - 4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
    elevation: 500,
    overflow: 'visible',
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
  },
  columnBetText: {
    color: '#FFD700',
    fontSize: cellSize * 0.45,
    fontWeight: 'bold',
  },
});

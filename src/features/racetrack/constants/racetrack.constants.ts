// European roulette wheel order - complete sequence for neighbors calculation
export const WHEEL_ORDER = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30,
  8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7,
  28, 12, 35, 3, 26
];

// Racetrack number positions
export const TOP_NUMBERS = [
  { num: '5', color: '#FF0000' },
  { num: '24', color: '#000000' },
  { num: '16', color: '#FF0000' },
  { num: '33', color: '#000000' },
  { num: '1', color: '#FF0000' },
  { num: '20', color: '#000000' },
  { num: '14', color: '#FF0000' },
  { num: '31', color: '#000000' },
  { num: '9', color: '#FF0000' },
  { num: '22', color: '#000000' },
  { num: '18', color: '#FF0000' },
  { num: '29', color: '#000000' },
  { num: '7', color: '#FF0000' },
  { num: '28', color: '#000000' },
  { num: '12', color: '#FF0000' },
  { num: '35', color: '#000000' },
];

export const BOTTOM_NUMBERS = [
  { num: '30', color: '#FF0000' },
  { num: '11', color: '#000000' },
  { num: '36', color: '#FF0000' },
  { num: '13', color: '#000000' },
  { num: '27', color: '#FF0000' },
  { num: '6', color: '#000000' },
  { num: '34', color: '#FF0000' },
  { num: '17', color: '#000000' },
  { num: '25', color: '#FF0000' },
  { num: '2', color: '#000000' },
  { num: '21', color: '#FF0000' },
  { num: '4', color: '#000000' },
  { num: '19', color: '#FF0000' },
  { num: '15', color: '#000000' },
  { num: '32', color: '#FF0000' },
];

export const LEFT_NUMBERS = [
  { num: '10', color: '#000000', x: 205, y: 225 },
  { num: '23', color: '#FF0000', x: 188, y: 280 },
  { num: '8', color: '#000000', x: 205, y: 335 },
];

export const RIGHT_NUMBERS = [
  { num: '3', color: '#FF0000', x: 935, y: 225 },
  { num: '26', color: '#000000', x: 946, y: 280 },
  { num: '0', color: '#4EA72E', x: 935, y: 335 },
];

// Bottom row cell boundaries for positioning
export const BOTTOM_CELL_BOUNDARIES = [
  239, 281.84, 324.38, 366.92, 409.46, 452, 504.8, 
  557.6, 610.4, 651.2, 692, 732.8, 773.6, 814.4, 855.2, 896
];

// SVG ViewBox constants
export const VIEWBOX = {
  x: 140,
  y: 140,
  width: 880,
  height: 280,
};

// Sector boundaries
export const SECTORS = {
  tier: { startX: 221, endX: 428 },
  orphelins: { startX: 428, endX: 610 },
  voisins: { startX: 610, endX: 815 },
  zero: { startX: 815, endX: 917 },
  ovalTop: 203,
  ovalBottom: 342,
};

// Section labels
export const SECTION_LABELS = [
  { name: 'Tier', x: 311, y: 277 },
  { name: 'Orphelins', x: 462, y: 275 },
  { name: 'Voisins', x: 670, y: 276 },
  { name: 'Zero', x: 850, y: 274 },
];

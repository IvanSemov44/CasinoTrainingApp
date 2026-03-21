export type SectionType = 'tier' | 'orphelins' | 'voisins' | 'zero';

export interface RacetrackOverlaysProps {
  width: number;
  height: number;
  onNumberPress?: (number: string) => void;
  onSectionPress?: (section: SectionType) => void;
}

export interface SectorButtonConfig {
  section: SectionType;
  startX: number;
  endX: number;
  radiusLeft?: number;
  radiusRight?: number;
}

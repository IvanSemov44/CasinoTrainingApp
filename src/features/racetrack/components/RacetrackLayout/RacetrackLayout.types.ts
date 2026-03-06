export type SectionType = 'tier' | 'orphelins' | 'voisins' | 'zero';

export interface RacetrackLayoutProps {
  width?: number;
  onNumberPress?: (number: string) => void;
  onSectionPress?: (section: SectionType) => void;
}

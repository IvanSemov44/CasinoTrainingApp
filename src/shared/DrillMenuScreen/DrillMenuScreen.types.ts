export interface DrillMenuItem {
  drillType: string;
  label: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

export interface DrillMenuScreenProps<T extends DrillMenuItem = DrillMenuItem> {
  title: string;
  drills: T[];
  onPress: (drillType: T['drillType']) => void;
}

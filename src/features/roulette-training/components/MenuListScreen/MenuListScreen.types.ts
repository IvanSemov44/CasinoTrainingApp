export type Difficulty = 'easy' | 'medium' | 'hard';

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  onPress: () => void;
  extraInfo?: string;
}

// MenuTheme kept for backwards compatibility — ignored internally
export type MenuTheme = 'green' | 'dark';

export interface MenuListScreenProps {
  title: string;
  subtitle?: string;
  items: MenuItem[];
  theme?: MenuTheme;
  isLoading?: boolean;
}

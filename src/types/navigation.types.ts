import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

/**
 * Navigation prop type for screens
 */
export type NavigationProp<RouteName extends keyof RootStackParamList> = 
  StackNavigationProp<RootStackParamList, RouteName>;

/**
 * Route prop type for screens
 */
export type RoutePropType<RouteName extends keyof RootStackParamList> = 
  RouteProp<RootStackParamList, RouteName>;

/**
 * Screen props type for screens
 */
export type ScreenProps<RouteName extends keyof RootStackParamList> = {
  navigation: NavigationProp<RouteName>;
  route: RoutePropType<RouteName>;
};

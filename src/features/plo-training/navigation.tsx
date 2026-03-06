import React from 'react';
import type { PLODifficulty } from './types';

// TODO: Implement PLOMenuScreen and PLOGameTrainingScreen screens
// import PLOMenuScreen from './screens/PLOMenuScreen';
// import PLOGameTrainingScreen from './screens/PLOGameTrainingScreen';

export type PLOStackParamList = {
  PLOMenu: undefined;
  PLOGameTraining: { difficulty: PLODifficulty };
};

// const Stack = createStackNavigator<PLOStackParamList>();
// const PLOMenuScreenWithBoundary = withErrorBoundary(PLOMenuScreen, 'PLO Training');
// const PLOGameTrainingScreenWithBoundary = withErrorBoundary(PLOGameTrainingScreen, 'PLO Training');

export const PLORoutes = () => {
  // TODO: Implement screens and uncomment route definitions
  return <></>;
  // return (
  //   <>
  //     <Stack.Screen
  //       name="PLOMenu"
  //       component={PLOMenuScreenWithBoundary}
  //       options={{ title: 'PLO Training' }}
  //     />
  //     <Stack.Screen
  //       name="PLOGameTraining"
  //       component={PLOGameTrainingScreenWithBoundary}
  //       options={{ title: 'Game Training' }}
  //     />
  //   </>
  // );
};

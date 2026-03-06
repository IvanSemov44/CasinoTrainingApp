import React from 'react';
import { CallBetMode } from './types';

// TODO: Implement CallBetsMenuScreen and CallBetsTrainingScreen screens
// import { CallBetsMenuScreen, CallBetsTrainingScreen } from './screens';

export type CallBetsStackParamList = {
  CallBetsMenu: undefined;
  CallBetsTraining: { mode: CallBetMode };
};

// const Stack = createStackNavigator<CallBetsStackParamList>();
// const CallBetsMenuScreenWithBoundary = withErrorBoundary(CallBetsMenuScreen, 'Call Bets Training');
// const CallBetsTrainingScreenWithBoundary = withErrorBoundary(CallBetsTrainingScreen, 'Call Bets Training');

export function CallBetsRoutes() {
  // TODO: Implement screens and uncomment route definitions
  return <></>;
  // return (
  //   <>
  //     <Stack.Screen
  //       name="CallBetsMenu"
  //       component={CallBetsMenuScreenWithBoundary}
  //       options={{
  //         title: 'Call Bets Training',
  //         headerStyle: { backgroundColor: COLORS.background.primary },
  //         headerTintColor: COLORS.text.gold,
  //       }}
  //     />
  //     <Stack.Screen
  //       name="CallBetsTraining"
  //       component={CallBetsTrainingScreenWithBoundary}
  //       options={{
  //         title: 'Training',
  //         headerStyle: { backgroundColor: COLORS.background.primary },
  //         headerTintColor: COLORS.text.gold,
  //       }}
  //     />
  //   </>
  // );
}

export type { CallBetMode } from './types';

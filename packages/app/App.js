import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import ResolveAuthScreen from './src/screens/ResolveAuth';
import AccountScreen from './src/screens/Account';
import SignupScreen from './src/screens/Signup';
import SigninScreen from './src/screens/Signin';
import TrackCreateScreen from './src/screens/TrackCreate';
import TrackDetailScreen from './src/screens/TrackDetail';
import TrackListScreen from './src/screens/TrackList';
import { Provider as AuthProvider } from './src/context/Auth';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen,
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

const Root = () => {
  return (
    <AuthProvider>
      <App
        ref={navigator => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};

export default Root;

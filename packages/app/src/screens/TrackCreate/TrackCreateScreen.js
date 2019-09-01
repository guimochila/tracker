// import '../../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Text, Icon } from 'react-native-elements';

import Map from '../../components/Map';
import TrackForm from '../../components/TrackForm';
import { Context as LocationContext } from '../../context/Location';
import useLocation from '../../hooks/useLocation';

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(LocationContext);
  const callback = useCallback(
    location => {
      addLocation(location, state.recording);
    },
    [state.recording],
  );
  const [error] = useLocation(isFocused || state.recording, callback);

  return (
    <SafeAreaView>
      <Text h2>Create a track</Text>
      <Map />
      {error && <Text>Please enable location services.</Text>}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: 'Add track',
  tabBarIcon: <Icon type="font-awesome" name="plus" size={20} />,
};

export default withNavigationFocus(TrackCreateScreen);

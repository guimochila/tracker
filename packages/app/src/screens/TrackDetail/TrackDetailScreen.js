import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

import { Context as TrackContext } from '../../context/Track';

const TrackDetailScreen = ({ navigation }) => {
  const {
    state: { tracks },
  } = useContext(TrackContext);
  const _id = navigation.getParam('_id');

  const track = tracks.find(track => track._id === _id);
  const initialCoords = track.locations[0].coords;

  return (
    <View>
      <Text>{track.name}</Text>
      <MapView
        style={{ height: 300 }}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
      >
        <Polyline coordinates={track.locations.map(loc => loc.coords)} />
      </MapView>
    </View>
  );
};

export default TrackDetailScreen;

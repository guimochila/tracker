import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import styled from 'styled-components/native';

import { Context as LocationContext } from '../../context/Location';

const MapContainer = styled(MapView)`
  height: 300;
`;

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <MapContainer
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Circle
          center={currentLocation.coords}
          radius={30}
          strokeColor="rgba(158,158,255,1.0)"
          fillColor="rgba(158,158,255,0.3)"
        />
        <Polyline coordinates={locations.map(loc => loc.coords)} />
      </MapContainer>
    </View>
  );
};

export default Map;

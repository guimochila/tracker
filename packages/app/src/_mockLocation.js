/* eslint-disable no-underscore-dangle */
import * as Location from 'expo-location';

const tenMetersWithDregrees = 0.0001;

const getLocation = increment => ({
  timestamp: 1000000,
  coords: {
    speed: 0,
    heading: 0,
    accuracy: 5,
    altitudeAccuracy: 5,
    altitude: 5,
    longitude: -122.0312186 + increment * tenMetersWithDregrees,
    latitude: 37.33233141 + increment * tenMetersWithDregrees,
  },
});

let counter = 0;

setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });

  counter += 1;
}, 1000);

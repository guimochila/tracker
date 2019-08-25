import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

const TrackListScreen = ({ navigation }) => {
  return (
    <>
      <Text>TrackListScreen</Text>
      <Button
        title="Go to track details"
        onPress={() => navigation.navigate('TrackDetail')}
      />
    </>
  );
};

export default TrackListScreen;

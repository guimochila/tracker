/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Context as TrackContext } from '../../context/Track';

const NoLocations = () => <Text>Loading...</Text>;

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <FlatList
        data={state.tracks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TrackDetail', { _id: item._id });
              }}
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={NoLocations}
      />
    </>
  );
};

TrackListScreen.navigationOptions = {
  title: 'Tracks',
};

export default TrackListScreen;

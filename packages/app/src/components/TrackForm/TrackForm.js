import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { Context as LocationContext } from '../../context/Location';
import useSaveTrack from '../../hooks/useSaveTrack';

const TrackForm = () => {
  const { state, startRecording, stopRecording, setName } = useContext(
    LocationContext,
  );
  const [saveTrack] = useSaveTrack();

  const { name, recording, locations } = state;

  return (
    <>
      <Input placeholder="Enter name" onChangeText={setName} value={name} />
      {recording ? (
        <Button title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      {!recording && locations.length ? (
        <Button title="Save Recording" onPress={saveTrack} />
      ) : null}
    </>
  );
};

export default TrackForm;

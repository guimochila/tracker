export const startRecording = dispatch => () => {
  dispatch({ type: 'START_RECORDING' });
};

export const stopRecording = dispatch => () => {
  dispatch({ type: 'STOP_RECORDING' });
};

export const addLocation = dispatch => (location, recording) => {
  dispatch({ type: 'ADD_CURRENT_LOCATION', payload: location });
  if (recording) {
    dispatch({ type: 'ADD_LOCATION', payload: location });
  }
};

export const setName = dispatch => name => {
  dispatch({ type: 'SET_NAME', payload: name });
};

export const reset = dispatch => () => {
  dispatch({ type: 'RESET' });
};

import createDataContext from '../createDataContext';

import {
  startRecording,
  stopRecording,
  addLocation,
  setName,
  reset,
} from './Location.actions';

const initialState = {
  recording: false,
  locations: [],
  currentLocation: null,
  name: '',
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'START_RECORDING':
      return { ...state, recording: true };
    case 'STOP_RECORDING':
      return { ...state, recording: false };
    case 'ADD_LOCATION':
      return { ...state, locations: [...state.locations, action.payload] };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'RESET':
      return { ...state, name: '', locations: [] };
    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, setName, reset },
  initialState,
);

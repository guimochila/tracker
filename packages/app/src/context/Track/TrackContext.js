import createDataContext from '../createDataContext';
import { fetchTracks, createTrack } from './TrackActions';

const initialState = [];

const trackReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TRACKS':
      return action.payload;
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  initialState,
);

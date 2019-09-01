import trackerApi from '../../api/tracker';

export const fetchTracks = dispatch => async () => {
  const response = await trackerApi.get('api/tracks');
  dispatch({ type: 'FETCH_TRACKS', payload: response.data });
};
export const createTrack = dispatch => async (name, locations) => {
  await trackerApi.post('api/tracks', { name, locations });
};

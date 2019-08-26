import trackerApi from '../../api/tracker';
import { _storeData, _getData } from '../../helpers/asyncStorage';

import { navigate } from '../../navigationRef';

export const signup = dispatch => async ({ name, email, password }) => {
  try {
    const {
      data: { token },
    } = await trackerApi.post('/signup', {
      name,
      email,
      password,
    });

    await _storeData('token', token);
    dispatch({ type: 'SIGNUP', payload: token });
    navigate('TrackList');
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response));
  }
};

export const signin = dispatch => {
  return ({ email, password }) => {};
};

export const signout = dispatch => {
  return () => {};
};

export const setError = error => ({
  type: 'SET_ERROR',
  payload: error,
});

export const cleanError = dispatch => () => {
  dispatch({
    type: 'CLEAN_ERROR',
  });
};

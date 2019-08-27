import trackerApi from '../../api/tracker';
import { _storeData, _getData, _removeData } from '../../helpers/asyncStorage';

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
    dispatch({ type: 'SIGNIN', payload: token });
    navigate('TrackList');
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response));
  }
};

export const signin = dispatch => async ({ email, password }) => {
  try {
    const {
      data: { token },
    } = await trackerApi.post('/signin', { email, password });
    await _storeData('token', token);
    dispatch({ type: 'SIGNIN', payload: token });
    navigate('TrackList');
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    });
  }
};

export const tryLocalSignin = dispatch => async () => {
  const token = await _getData('token');
  console.log(token);

  if (token) {
    dispatch({ type: 'SIGNIN', payload: token });
    navigate('TrackList');
  } else {
    navigate('loginFlow');
  }
};

export const signout = dispatch => async () => {
  await _removeData('token');
  dispatch({ type: 'SIGNOUT' });
  navigate('loginFlow');
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

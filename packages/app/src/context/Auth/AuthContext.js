import createDataContext from '../createDataContext';
import {
  signin,
  signout,
  signup,
  cleanError,
  tryLocalSignin,
} from './AuthActions';

const initialState = { token: null, errorMessage: '' };

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, errorMessage: action.payload };
    case 'CLEAN_ERROR':
      return { ...state, errorMessage: '' };
    case 'SIGNIN':
      return { errorMessage: '', token: action.payload };
    case 'SIGNOUT':
      return { errorMessage: '', token: null };
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, cleanError, tryLocalSignin },
  initialState,
);

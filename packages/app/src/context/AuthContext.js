import createDataContext from './createDataContext';

const initialState = { isSignedIn: false };

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {},
  initialState,
);

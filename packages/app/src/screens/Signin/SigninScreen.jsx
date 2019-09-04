import React, { useContext } from 'react';
import { NavigationEvents } from 'react-navigation';

import { Context as AuthContext } from '../../context/Auth';
import Signin from '../../components/Signin';
import NavLink from '../../components/NavLink';
import { Container } from './SigninScreen.styles';

const SigninScreen = () => {
  const { state, signin, cleanError } = useContext(AuthContext);
  return (
    <Container>
      <NavigationEvents onWillBlur={cleanError} />
      <Signin
        error={state.errorMessage}
        onSubmit={signin}
        cleanError={cleanError}
      />
      <NavLink
        title="Not already registered? Sign up here"
        routeName="Signin"
      />
    </Container>
  );
};

SigninScreen.navigationOptions = () => ({
  header: null,
});

export default SigninScreen;

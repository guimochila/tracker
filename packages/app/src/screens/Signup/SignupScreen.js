import React, { useContext } from 'react';

import { Context as AuthContext } from '../../context/Auth';
import Signup from '../../components/Signup';
import NavLink from '../../components/NavLink';
import { Container } from './SignupScreen.styles';

const SignupScreen = () => {
  const { state, signup, cleanError } = useContext(AuthContext);

  return (
    <Container>
      <Signup
        error={state.errorMessage}
        onSubmit={signup}
        cleanError={cleanError}
      />
      <NavLink
        title="Already have an account? Sign in instead"
        routeName="Signin"
      />
    </Container>
  );
};

SignupScreen.navigationOptions = () => ({
  header: null,
});

export default SignupScreen;

import React, { useState } from 'react';
import { Text, Button } from 'react-native-elements';
import { Alert } from 'react-native';

import FormInput from '../FormInput';

const Signin = ({ onSubmit, cleanError, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (error) {
    Alert.alert('Ooops!', error.message);
    cleanError();
  }

  return (
    <>
      <Text h3>Sign In</Text>
      <FormInput
        label="Email"
        handleChange={setEmail}
        icon={{ type: 'entypo', name: 'mail' }}
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        label="Password"
        handleChange={setPassword}
        icon={{ type: 'font-awesome', name: 'user-secret' }}
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />

      <Button title="Sign In" onPress={() => onSubmit({ email, password })} />
    </>
  );
};

export default Signin;

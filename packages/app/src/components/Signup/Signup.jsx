import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';

import FormInput from '../FormInput';

const Signup = ({ error, onSubmit, cleanError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (error) {
    Alert.alert('Ooops!', error.message);
    cleanError();
  }

  return (
    <>
      <Text h3>Sign up for Tracker</Text>
      <FormInput
        label="Name"
        handleChange={setName}
        icon={{ type: 'font-awesome', name: 'user' }}
        value={name}
        autoCapitalize="none"
        autoCorrect={false}
      />

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

      <Button
        title="Sign Up"
        onPress={() => onSubmit({ name, email, password })}
      />
    </>
  );
};

export default Signup;

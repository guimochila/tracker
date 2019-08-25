import React, { useState } from 'react';
import { Button, Input, Icon } from 'react-native-elements';

import { Container, Title, inputStyles } from './SignupScreen.styles';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Title> Sign Up for Tracker</Title>
      <Input
        containerStyle={inputStyles}
        label="Name"
        leftIcon={
          <Icon
            name="user"
            size={24}
            color="black"
            containerStyle={{ marginRight: 20 }}
            type="font-awesome"
          />
        }
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        containerStyle={inputStyles}
        label="Email"
        leftIcon={
          <Icon
            name="mail"
            size={24}
            color="black"
            containerStyle={{ marginRight: 20 }}
            type="entypo"
          />
        }
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        containerStyle={inputStyles}
        label="Password"
        leftIcon={
          <Icon
            name="user-secret"
            size={24}
            color="black"
            containerStyle={{ marginRight: 20 }}
            type="font-awesome"
          />
        }
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={() => navigation.navigate('Signin')} />
    </Container>
  );
};

SignupScreen.navigationOptions = () => ({
  header: null,
});

export default SignupScreen;

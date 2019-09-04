import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';

import { Context as AuthContext } from '../../context/Auth';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View>
        <Text>Account Screen</Text>
        <Button title="Sign Out" onPress={signout} />
      </View>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <Icon type="font-awesome" name="gear" size={20} />,
};

export default AccountScreen;

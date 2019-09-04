import React from 'react';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const NavLink = ({ title, routeName, navigation }) => {
  return (
    <Button
      type="clear"
      title={title}
      onPress={() => navigation.navigate(routeName)}
    />
  );
};

export default withNavigation(NavLink);

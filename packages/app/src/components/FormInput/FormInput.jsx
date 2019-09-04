import React from 'react';
import { Input, Icon } from 'react-native-elements';

import { inputStyles } from './FormInput.styles';

const FormInput = ({ label, handleChange, icon, ...props }) => {
  let renderIcon = null;

  if (icon) {
    renderIcon = (
      <Icon
        type={icon.type}
        name={icon.name}
        size={24}
        color="black"
        containerStyle={{ marginRight: 20 }}
      />
    );
  }

  return (
    <Input
      containerStyle={inputStyles}
      label={label}
      leftIcon={renderIcon}
      onChangeText={handleChange}
      {...props}
    />
  );
};

export default FormInput;

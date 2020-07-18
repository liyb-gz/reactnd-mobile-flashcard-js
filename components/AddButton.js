import React from 'react';
import { Icon } from 'react-native-elements';
import styles from '../styles/styles';
const AddButton = ({ onPress, color }) => {
  return (
    <Icon
      name="add"
      reverse
      raised
      color={color}
      containerStyle={styles.floatingButton}
      onPress={onPress}
    />
  );
};
export default AddButton;

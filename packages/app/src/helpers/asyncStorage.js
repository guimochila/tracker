import { AsyncStorage } from 'react-native';

export const _storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(`@Tracker:${key}`, data);
  } catch (error) {
    console.log(error);
  }
};

export const _getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return;
  } catch (error) {
    console.log(error);
  }
};

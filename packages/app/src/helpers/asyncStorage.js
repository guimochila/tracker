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
    const value = await AsyncStorage.getItem(`@Tracker:${key}`);
    return value || null;
  } catch (error) {
    console.log(error);
  }
};

export const _removeData = async key => {
  try {
    return await AsyncStorage.removeItem(`@Tracker:${key}`);
  } catch (error) {
    console.log(error);
  }
};

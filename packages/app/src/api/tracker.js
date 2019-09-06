import axios from 'axios';
import { _getData } from '../helpers/asyncStorage';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.36:3000/',
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await _getData('token');
    if (token) {
      const newConfig = undefined;
      newConfig.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default axiosInstance;

import { getToken, removeToken } from '@/utils/token';
import axios, { AxiosInstance } from 'axios';
import { queryClient } from '../main';

const apiInstance: AxiosInstance = axios.create({
  baseURL: `http://3.107.76.196`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

apiInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await removeToken();
      if (queryClient) {
        queryClient.clear();
      }
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

export default apiInstance;

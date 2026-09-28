import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Intercepteur dynamique pour gérer à la fois le JSON et l'envoi de fichiers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Initialise headers de manière sécurisée en respectant le typage d'Axios
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }

    if (!config.headers['Content-Type']) {
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

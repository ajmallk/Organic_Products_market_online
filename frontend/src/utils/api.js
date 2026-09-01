import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://organic-products-market-online.onrender.com/api/register';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add a request interceptor to include the JWT token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authTokens') 
      ? JSON.parse(localStorage.getItem('authTokens')).access 
      : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

import instance from './axios';

export const register = (userData) => {
  return instance.post('/api/register', userData);
};

export const login = (credentials) => {
  return instance.post('/api/login', credentials);
};

export const forgotPassword = (email) => {
  return instance.post('/api/forgot-password', { email });
};
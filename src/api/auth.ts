import { request } from 'libs/request';

const setHeaderAuthorization = (token: string) => {
  request.defaults.headers.common.Authorization = `Bearer ${  token}`;
};

const removeHeaderAuthorization = () => {
  delete request.defaults.headers.common.Authorization;
};

const login = (email: string, password: string) =>
  request.post('/auth/login', {
    email,
    password
  });

const register = (firstname: string, lastname: string, email: string, password: string) =>
  request.post('/auth/register', {
    firstname,
    lastname,
    email,
    password
  });

const getUser = () => request.get('/auth/user');

export const authApi = {
  login,
  register,
  getUser,
  setHeaderAuthorization,
  removeHeaderAuthorization
};

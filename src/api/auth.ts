import { request } from 'libs/request';

const setHeaderAuthorization = (token: string) => {
  request.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeHeaderAuthorization = () => {
  delete request.defaults.headers.common.Authorization;
};

const login = async (email: string, password: string) =>
  request.post('/auth/login', {
    email,
    password,
  });

const register = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) =>
  request.post('/auth/register', {
    firstname,
    lastname,
    email,
    password,
  });

const getUser = async () => request.get('/auth/user');

export const authApi = {
  login,
  register,
  getUser,
  setHeaderAuthorization,
  removeHeaderAuthorization,
};

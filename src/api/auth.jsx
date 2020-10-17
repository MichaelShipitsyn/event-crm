import { request } from 'libs/request';

const setHeaderAuthorization = (token) => {
  request.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

const removeHeaderAuthorization = () => {
  delete request.defaults.headers.common['Authorization'];
};

const login = (email, password) =>
  request.post('/auth/login', {
    email,
    password
  });

const register = (firstname, lastname, email, password) =>
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

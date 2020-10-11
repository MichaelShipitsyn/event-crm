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

const getUser = () => request.get('/auth/user');

export const authApi = {
  login,
  getUser,
  setHeaderAuthorization,
  removeHeaderAuthorization
};

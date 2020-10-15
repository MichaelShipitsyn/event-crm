import axios from 'axios';
import store from 'store';
import { logoutUser } from 'store/auth/thunks';

const { REACT_APP_API_URL } = process.env;

const request = axios.create({
  baseURL: REACT_APP_API_URL
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      store.dispatch(logoutUser());
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export { request };

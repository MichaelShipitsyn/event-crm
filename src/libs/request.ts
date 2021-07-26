import axios from 'axios';
import store from 'store';
import { logoutUser } from 'store/auth/thunks';
import { showAlert } from 'store/global/slice';

const { REACT_APP_API_URL } = process.env;

const request = axios.create({
  baseURL: REACT_APP_API_URL,
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 401 &&
      store.getState().auth.isAuthenticated
    ) {
      store.dispatch(logoutUser());
      window.location.href = '/';
    }

    if (error.response.status >= 500) {
      store.dispatch(
        showAlert({
          alertMessage: 'Ошибка сервера. Обратитесь к администрации',
          alertType: 'error',
        })
      );
    }

    return Promise.reject(error);
  }
);

export { request };

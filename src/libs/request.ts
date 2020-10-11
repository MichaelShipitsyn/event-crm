import axios from 'axios';
const { REACT_APP_API_URL } = process.env;

const request = axios.create({
  baseURL: REACT_APP_API_URL
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export { request };

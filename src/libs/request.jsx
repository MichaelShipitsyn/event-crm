import axios from 'axios';
const { REACT_APP_API_URL } = process.env;

const request = axios.create({
  baseURL: REACT_APP_API_URL
});

export { request };

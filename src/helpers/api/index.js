import axios from 'axios';

const baseURL = process.env.REACT_APP_API
  ? process.env.REACT_APP_API
  //dev
  : 'http://localhost:3001';

const version = 'v1';

export const apiURL = baseURL + `/${version}`;

const api = axios.create({
  baseURL: apiURL,
  // withCredentials: true, // Required for http-only cookie
});

export default api;

import axios from 'axios';
import { TOKEN } from '../constants';

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

export const getAuthConfig = () => {
  const authToken = localStorage.getItem(TOKEN);
  const config = {
    headers: {
      'Authorization': authToken
    }
  }
  
  return config;
}

export default api;

import axios from 'axios';
// import { TOKEN } from '../constants';
import reduxStore from '../../redux/store';

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

const getAuthToken = () => {
  const reduxState = reduxStore.getState() || {};
  console.log(reduxState)
  const user = reduxState?.user || {};
  console.log(user);
  const token = user?.token || 'empty_token';
  return token;
}

export const getAuthConfig = () => {
  const authToken = getAuthToken();
  const config = {
    headers: {
      'Authorization': authToken
    }
  }
  
  return config;
}

export default api;

import api from '..'
import { getAuthConfig } from "..";
const baseURL = '/users';

export const getLoggedInUserInfo = async () => {
  return api.get(`${baseURL}/me`);
}

export const getUserInfo = async () => {
  const config = getAuthConfig();
  return api.get(`${baseURL}/owner`,config);
}

export const handleSignUp = async (userInfo) => {
  return api.post(`${baseURL}/sign-up`, userInfo);
}

const UserAPI = {
  getUserInfo,
  getLoggedInUserInfo,
  handleSignUp
}

export default UserAPI;
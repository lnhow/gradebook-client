import api from '..'
import { getAuthConfig } from "..";
const baseURL = '/users';

export const getUserInfo = async () => {
  const config = getAuthConfig();
  return api.get(`${baseURL}/owner`,config);
}

export const handleSignUp = async (userInfo) => {
  return api.post(`${baseURL}/sign-up`, userInfo);
}


export const updateUser= async (newUser) => {
  const config = getAuthConfig();
  return api.put(`${baseURL}/update`, newUser, config);
}

export const changePassword= async (data) => {
  const config = getAuthConfig();
  return api.post(`${baseURL}/change-password`, data, config);
}

const UserAPI = {
  getUserInfo,
  handleSignUp,
  updateUser,
  changePassword
}

export default UserAPI;
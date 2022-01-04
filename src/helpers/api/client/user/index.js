import api from '../../'
import { getAuthConfig } from '../../';
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

export const handleActivation = async (activation_id = '') => {
  const endpoint = '/activation';
  const data = {
    ot_code: activation_id,
  }
  return api.post(`${baseURL}${endpoint}`, data);
}

export const verifyOneTimeCode = async (ot_code = '') => {
  const endpoint = '/verify/ot-code';
  const params = {
    ot_code: ot_code,
  }
  return api.get(`${baseURL}${endpoint}`, {
    params: params
  });
}

export const handleForgotPassword = async (formData = {}) => {
  const endpoint = '/password/forgot';
  const data = {
    email: formData.email,
  }
  return api.post(`${baseURL}${endpoint}`, data);
}

export const handleResetPassword = async (reset_id = '', formData = {}) => {
  const endpoint = '/password/reset';
  const data = {
    ot_code: reset_id,
    ...formData
  }
  return api.post(`${baseURL}${endpoint}`, data);
}

const UserAPI = {
  getUserInfo,
  handleSignUp,
  updateUser,
  changePassword,
  
  handleActivation,
  handleForgotPassword,
  handleResetPassword,
  verifyOneTimeCode,
}

export default UserAPI;
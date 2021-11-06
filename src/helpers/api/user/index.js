import api from '..'

const baseURL = '/users';

export const getLoggedInUserInfo = async () => {
  return api.get(`${baseURL}/me`);
}

export const handleSignUp = async (userInfo) => {
  return api.post(`${baseURL}/sign-up`, userInfo);
}

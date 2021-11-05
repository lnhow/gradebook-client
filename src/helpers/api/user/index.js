import api from '..'

const baseURL = '/users';

export const getLoggedInUserInfo = async () => {
  return api.get(`${baseURL}/me`);
}

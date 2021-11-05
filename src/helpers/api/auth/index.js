import api, { getAuthConfig } from "..";

const baseURL = '/auth';

export const selfMakeSignIn = async (userInfo) => {
  return api.post(`${baseURL}/sign-in`, userInfo);
}

export const signOut = async () => {
  const config = getAuthConfig();
  return api.post(`${baseURL}/sign-out`, {}, config);
}

export const googleSignIn = (googleData) => {
  // API do not support yet
  // return api.post('/auth/google', {
  //   token: googleData.token,
  // });
}

const AuthAPI = {
  selfMakeSignIn,
  googleSignIn,
  signOut
}

export default AuthAPI;

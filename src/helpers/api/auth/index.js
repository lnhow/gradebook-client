import api from "..";

const baseURL = '/auth';

export const signIn = async () => {

}

export const signOut = async () => {
  return api.post(`${baseURL}/sign-out`);
}

export const googleSignIn = (googleData) => {
  // API do not support yet
  // return api.post('/auth/google', {
  //   token: googleData.token,
  // });
}

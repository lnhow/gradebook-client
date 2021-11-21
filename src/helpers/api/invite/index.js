import api from "..";
import { getAuthConfig } from '..';

const baseURL = '/invite';

export const sendEmailInvite = (inviteInfo) => {
  const config = getAuthConfig();
  return api.post(baseURL, {...inviteInfo}, config);
}

export const JoinInvite = (inviteInfo) => {
  const config = getAuthConfig();
  return api.post(`${baseURL}/join`, {...inviteInfo}, config);
}

const InviteAPI = {
  sendEmailInvite,
  JoinInvite
}

export default InviteAPI;

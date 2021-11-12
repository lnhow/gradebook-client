import api from "..";
import { getAuthConfig } from '..';

const baseURL = '/invite...';

export const sendEmailInvite = (inviteInfo) => {
  const config = getAuthConfig();
  return api.post(baseURL, {...inviteInfo}, config);
}

const InviteAPI = {
  sendEmailInvite,
}

export default InviteAPI;

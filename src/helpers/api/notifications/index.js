import api from '..'
import { getAuthConfig } from '..';

const baseURL = '/notification';

export const readAllNoti = () => {
    const config = getAuthConfig();

    return api.put(`${baseURL}/`, {}, config);
}

export const fetchAll = () => {
    const config = getAuthConfig();

    return api.get(`${baseURL}`, config);
}

export const readNoti = (notiId) => {
    const endpointURL = '/' + notiId;
    const config = getAuthConfig();

    return api.put(`${baseURL}${endpointURL}`, {}, config);
}

const NotiAPI = {
    readAllNoti,
    fetchAll,
    readNoti,
}

export default NotiAPI;

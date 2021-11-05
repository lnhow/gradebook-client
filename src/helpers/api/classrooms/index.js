import api from "..";
import { getAuthConfig } from "..";

const baseURL = '/classrooms';

export const fetchAll = () => {
  const config = getAuthConfig();
  return api.get(baseURL, config);
}

export const addNewClassroom = (newClassroom) => {
  const config = getAuthConfig();
  return api.post(baseURL, {...newClassroom}, config);
}

const ClassroomAPI = {
  fetchAll,
  addNewClassroom
}

export default ClassroomAPI;
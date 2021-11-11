import api from "..";
import { getAuthConfig } from "..";

const baseURL = '/classrooms';

export const fetchAll = () => {
  const config = getAuthConfig();
  return api.get(baseURL, config);
}

export const fetchClassroom = (classId) => {
  const config = getAuthConfig();
  return api.get(`${baseURL}/${classId}`, config);
}

export const addNewClassroom = (newClassroom) => {
  const config = getAuthConfig();
  return api.post(baseURL, {...newClassroom}, config);
}

const ClassroomAPI = {
  fetchAll,
  fetchClassroom,
  addNewClassroom,
}

export default ClassroomAPI;
import api from "..";
import { getAuthConfig } from "..";

const baseURL = '/classrooms';

export const fetchAll = (fetchDisableClass=false) => {
  const config = getAuthConfig();
  let query = '?';
  if (fetchDisableClass) {
    query += 'status=D';
  } else {
    query += 'status=A'
  }
  return api.get(`${baseURL}${query}`, config);
}

export const fetchClassroom = (classId) => {
  const config = getAuthConfig();
  return api.get(`${baseURL}/${classId}`, config);
}

export const fetchClassroomByInvite = (token,classId) => {
  const config = getAuthConfig();
  return api.get(`${baseURL}/by-invite?token=${token}&class_id=${classId}`, config);
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
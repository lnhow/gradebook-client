import api from "..";

const baseURL = '/classrooms';

export const fetchAll = () => {
  return api.get(baseURL);
}

export const addNewClassroom = (newClassroom) => {
  return api.post(baseURL, {...newClassroom});
}

const ClassroomAPI = {
  fetchAll,
  addNewClassroom
}

export default ClassroomAPI;
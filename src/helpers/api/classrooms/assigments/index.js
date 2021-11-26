import api from '../..'
import { getAuthConfig } from '../..';

const baseURL = '/classrooms';

export const addNewAssignment = (classAssignment) => {
  const config = getAuthConfig();
  return api.post(baseURL, classAssignment, config);
}

export const updateAssignment = (classAssignment) => {
  const config = getAuthConfig();
  return api.patch(baseURL, classAssignment, config);
}

export const deleteAssignment = (classAssignment) => {
  const config = getAuthConfig();
  return api.delete(baseURL, classAssignment, config);
}

export const reOrderAssigments = (classAssignmentOrder = []) => {
  const config = getAuthConfig();
  return api.post(baseURL, classAssignmentOrder, config);
}

import api from '..'
import { getAuthConfig } from '..';

const baseURL = '/assignment';

export const addNewAssignment = (classAssignment) => {
  const config = getAuthConfig();
  return api.post(baseURL, classAssignment, config);
}

export const updateAssignment = (assignmentId, classAssignment) => {
  const config = getAuthConfig();
  return api.put(`${baseURL}/${assignmentId}`, classAssignment, config);
}

export const removeAssignment = (assignmentId) => {
  const config = getAuthConfig();
  return api.delete(`${baseURL}/${assignmentId}`, config);
}

export const reOrderAssigments = (classAssignmentOrder = []) => {
  const config = getAuthConfig();
  return api.put(`${baseURL}/arrange`, classAssignmentOrder, config);
}

const AssignmentAPI = {
  addNewAssignment,
  updateAssignment,
  removeAssignment,
  reOrderAssigments,
}

export default AssignmentAPI;

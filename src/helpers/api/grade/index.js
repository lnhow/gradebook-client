import api from '..'
import { getAuthConfig } from '..';

const baseURL = '/grade';

export const teacherGetGrade = (classId) => {
  const endpointURL = '/classgrade';
  const config = getAuthConfig();

  return api.get(`${baseURL}${endpointURL}/${classId}`, config);
}

export const studentGetGrade = (classId) => {
  const endpointURL = '/studentgrade';
  const config = getAuthConfig();

  return api.get(`${baseURL}${endpointURL}/${classId}`, config);
}

export const teacherEditGradeCell = (studentId, assignmentId, grade) => {
  const endpointURL = '/update';
  const config = getAuthConfig();
  const dataInput = {
    student_id: studentId,
    assignment_id: assignmentId,
    grade
  }
  
  return api.put(`${baseURL}${endpointURL}`, dataInput, config);
}

const GradeAPI = {
  teacherGetGrade,
  teacherEditGradeCell,

  studentGetGrade,
}

export default GradeAPI;

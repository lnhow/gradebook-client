import api from '..'
import { getAuthConfig } from '..';

const baseURL = '/grade';

export const teacherGetGrade = (classId) => {
  const gradeURL = '/classgrade';
  const config = getAuthConfig();
  
  return api.get(`${baseURL}${gradeURL}/${classId}`, config);
}

const GradeAPI = {
  teacherGetGrade
}

export default GradeAPI;

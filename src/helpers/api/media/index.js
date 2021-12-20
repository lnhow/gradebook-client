import api from '..'
import { getAuthConfig } from '..';

const baseURL = '/media';

export const getTemplateStudent = () => {
  const endpointURL = '/download?file=./uploads/file_excel/template_import_students.xlsx';
  const config = {
    ...getAuthConfig(),
    responseType: 'blob'
  };

  return api.get(`${baseURL}${endpointURL}`, config);
}

export const getTemplateGrade = () => {
  const endpointURL = '/download?file=./uploads/file_excel/template_import_grades.xlsx';
  const config = {
    ...getAuthConfig(),
    responseType: 'blob'
  };

  return api.get(`${baseURL}${endpointURL}`, config);
}

export const getTemplateGradeById = (assignmentId) => {
  const endpointURL = `/export-template-grades?assignment_id=${assignmentId}`;
  const config = {
    ...getAuthConfig(),
    responseType: 'blob'
  };

  return api.get(`${baseURL}${endpointURL}`, config);
}

export const getExportedGrades = (classId) => {
  const endpointURL = `/export-classgrade/${classId}`;
  const config = {
    ...getAuthConfig(),
    responseType: 'blob'
  };

  return api.get(`${baseURL}${endpointURL}`, config);
}

export const importStudent = (classId, fileFormData) => {
  const endpointURL = `/import-students?class_id=${classId}`;
  const config = {
    ...getAuthConfig(),
  };
  const reqBody = fileFormData;

  return api.post(`${baseURL}${endpointURL}`, reqBody, config);
}

export const importGrade = (assignmentid, fileFormData) => {
  const endpointURL = `/import-grades?assignment_id=${assignmentid}`;
  const config = {
    ...getAuthConfig(),
  };
  const reqBody = fileFormData;

  return api.post(`${baseURL}${endpointURL}`, reqBody, config);
}

const MediaAPI = {
  getTemplateStudent,
  getTemplateGrade,
  getTemplateGradeById,
  getExportedGrades,

  importStudent,
  importGrade,
}

export default MediaAPI;

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

export const getExportedGrades = (classId) => {
  const endpointURL = `/export-classgrade/${classId}`;
  const config = {
    ...getAuthConfig(),
    responseType: 'blob'
  };

  return api.get(`${baseURL}${endpointURL}`, config);
}

const MediaAPI = {
  getTemplateStudent,
  getTemplateGrade,
  getExportedGrades,
}

export default MediaAPI;

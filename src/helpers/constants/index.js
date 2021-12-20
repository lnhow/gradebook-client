export const TOKEN = 'tWERMBMNVMVCMoFGFYkRTRYUeKJDTn';
export const USER_INFO = 'ASDFGHJQWERTmnlkijoij';
export const USER_CLASS_ROLES = Object.freeze({
  TEACHER: 'T',
  STUDENT: 'S'
});

// Accept constraint for import grade & import student
export const ACCEPT_IMPORT_MIMETYPES = Object.freeze([
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
])

const Constants = {
  TOKEN,
  USER_INFO,
  USER_CLASS_ROLES,
  ACCEPT_IMPORT_MIMETYPES
}

export default Constants;

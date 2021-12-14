import { USER_CLASS_ROLES } from '../../../../helpers/constants';

export const DEFAULT_USER_CLASS_ROLE = USER_CLASS_ROLES.STUDENT;

export const USER_INITIAL_STATE = {
  user_id: '',
  user_code: '',
  full_name: '',
  role: DEFAULT_USER_CLASS_ROLE,
}

export const CLASS_INITIAL_STATE = {
  class_id: '',
  class_name: '',
  subject: '',
  description: '',
  created_at: '',
  updated_at: '',
  status: '',
  users: [],
  owner: {
    user_id: '',
    avatar: '',
    full_name: '',
  }
}

export const CLASS_GRADE_INITIAL_STATE = [];

export const CLASS_ASSIGNMENTS_INITIAL_STATE = [];

export const getClassInfo = (classInfo) => {
  const usersInClass = classInfo.listUser || [];

  return {
    class_id: classInfo.id || '',
    class_name: classInfo.class_name || '',
    subject: classInfo.subject || '',
    description: classInfo.description || '',
    created_at: classInfo.created_at || '',
    updated_at: classInfo.updated_at || '',
    status: classInfo.status || '',
    users: usersInClass,
    owner: {
      user_id: classInfo.owner_id || '',
      avatar: classInfo.owner_avatar || '',
      full_name: classInfo.owner_name || '',
    }
  }
}

export const getClassAssignments = (classInfo) => {
  const assignments = classInfo.listAssignment || [];
  return assignments;
}

export const getCurrentUserInfoInClass = (usersInClass, currentUser) => {
  const currentUsersInClass = usersInClass.filter((singleUser) => singleUser.user_id === currentUser.id)
  let currentUserInClass = (currentUsersInClass.length > 0) ? currentUsersInClass[0] : USER_INITIAL_STATE;

  return {
    user_id: currentUserInClass.user_id,
    user_code: currentUserInClass.user_code || '',
    full_name: currentUserInClass.full_name || '',
    role: currentUserInClass.role || DEFAULT_USER_CLASS_ROLE,
  }
}

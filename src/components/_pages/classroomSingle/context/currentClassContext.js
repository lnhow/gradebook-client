import { createContext } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../../../redux/slices/user';

import { USER_CLASS_ROLES } from '../../../../helpers/constants';

const DEFAULT_USER_CLASS_ROLE = USER_CLASS_ROLES.STUDENT;

const USER_INITIAL_STATE = {
  user_id: '',
  user_code: '',
  full_name: '',
  role: DEFAULT_USER_CLASS_ROLE,
}

const CLASS_INITIAL_STATE = {
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

export const CurrentClassContext = createContext({
  currentClass: CLASS_INITIAL_STATE,
  currentUser: USER_INITIAL_STATE,
  isTeacher: USER_INITIAL_STATE.role === USER_CLASS_ROLES.TEACHER  //Is current signed in user a teacher
});

export default function CurrentClassProvider({classroom_info = {}, children}) {
  const user = useSelector(selectUser);
  const usersInClass = classroom_info.listUser || [];

  const currentUsersInClass = usersInClass.filter((singleUser) => singleUser.user_id === user.id)
  let currentUserInClass = (currentUsersInClass.length > 0) ? currentUsersInClass[0] : USER_INITIAL_STATE;
  
  currentUserInClass = {
    user_id: currentUserInClass.user_id,
    user_code: currentUserInClass.user_code || '',
    full_name: currentUserInClass.full_name || '',
    role: currentUserInClass.role || DEFAULT_USER_CLASS_ROLE,
  }

  let currentClass = {
    class_id: classroom_info.id || '',
    class_name: classroom_info.class_name || '',
    subject: classroom_info.subject || '',
    description: classroom_info.description || '',
    created_at: classroom_info.created_at || '',
    updated_at: classroom_info.updated_at || '',
    status: classroom_info.status || '',
    users: usersInClass,
    owner: {
      user_id: classroom_info.owner_id || '',
      avatar: classroom_info.owner_avatar || '',
      full_name: classroom_info.owner_name || '',
    }
  }

  const contextValue = {
    currentClass: currentClass,
    currentUser: currentUserInClass,
    isTeacher: currentUserInClass.role === USER_CLASS_ROLES.TEACHER,
  }

  return (
    <CurrentClassContext.Provider value={contextValue}>
      {children}
    </CurrentClassContext.Provider>
  )
}
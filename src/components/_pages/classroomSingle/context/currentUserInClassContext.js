import { createContext } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../../../redux/slices/user';

import { USER_CLASS_ROLES } from '../../../../helpers/constants';

const DEFAULT_USER_CLASS_ROLE = USER_CLASS_ROLES.STUDENT;

const INITIAL_STATE = {
  user_id: '',
  user_code: '',
  full_name: '',
  role: DEFAULT_USER_CLASS_ROLE,
}

export const CurrentUserInClassContext = createContext({
  currentUser: INITIAL_STATE,
  isTeacher: INITIAL_STATE.role === USER_CLASS_ROLES.TEACHER  //Is current signed in user a teacher
});

export default function CurrentUserInClassProvider({classroom_info = {}, children}) {
  const user = useSelector(selectUser);
  const usersInClass = classroom_info.listUser || [];

  const currentUsersInClass = usersInClass.filter((singleUser) => singleUser.user_id === user.id)
  let currentUserInClass = (currentUsersInClass.length > 0) ? currentUsersInClass[0] : INITIAL_STATE;
  
  currentUserInClass = {
    user_id: currentUserInClass.user_id,
    user_code: currentUserInClass.user_code || '',
    full_name: currentUserInClass.full_name || '',
    role: currentUserInClass.role || DEFAULT_USER_CLASS_ROLE,
  }

  const contextValue = {
    currentUser: currentUserInClass,
    isTeacher: currentUserInClass.role === USER_CLASS_ROLES.TEACHER,
  }

  return (
    <CurrentUserInClassContext.Provider value={contextValue}>
      {children}
    </CurrentUserInClassContext.Provider>
  )
}


import { createContext } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../../../redux/slices/user';

const INITIAL_STATE = {
  user_id: '',
  user_code: '',
  full_name: '',
  role: 'S',  //Student
}

export const CurrentUserInClassContext = createContext({
  currentUser: INITIAL_STATE,
  isTeacher: false       //Is current signed in user a teacher
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
    role: currentUserInClass.role || 'S'
  }

  const contextValue = {
    currentUser: currentUserInClass,
    isTeacher: currentUserInClass.role === 'T'
  }

  return (
    <CurrentUserInClassContext.Provider value={contextValue}>
      {children}
    </CurrentUserInClassContext.Provider>
  )
}


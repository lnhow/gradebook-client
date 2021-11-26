import { createContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../../../redux/slices/user';
import { USER_CLASS_ROLES } from '../../../../helpers/constants';

import { 
  CLASS_INITIAL_STATE, CLASS_ASSIGNMENTS_INITIAL_STATE, USER_INITIAL_STATE,
  getClassInfo, getCurrentUserInfoInClass, getClassAssignments
} from './helpers';

export const CurrentClassContext = createContext({
  currentClass: CLASS_INITIAL_STATE,
  setCurrentClass: () => {},  //EMPTY FUNCTION
  classAssignments: CLASS_ASSIGNMENTS_INITIAL_STATE,
  setClassAssignments: () => {},
  addClassAssignment: () => {},
  removeClassAssignment: () => {},
  updateClassAssignment: () => {},
  currentUser: USER_INITIAL_STATE,
  isTeacher: USER_INITIAL_STATE.role === USER_CLASS_ROLES.TEACHER  //Is current signed in user a teacher
});

export default function CurrentClassProvider({classroom_info = {}, children}) {
  const user = useSelector(selectUser);
  const [currentClass, _setCurrentClass] = useState(getClassInfo(classroom_info));
  const [classAssignments, _setClassAssignments] = useState(getClassAssignments(classroom_info));
  const currentUserInClass = getCurrentUserInfoInClass(currentClass.users, user);

  const setCurrentClass = (classroom_info) => {
    _setCurrentClass(getClassInfo(classroom_info));
  }

  const setClassAssignments = (newClassAssignments = []) => {
    _setClassAssignments(newClassAssignments);
  }

  const addClassAssignment = (newAssignment) => {
    const assignment = {
      ...newAssignment,
      id: classAssignments.length,
      position: classAssignments.length
    }
    setClassAssignments([
      ...classAssignments,
      assignment
    ]);
  }

  const updateClassAssignment = (updatedAssignment) => {
    const index = classAssignments.findIndex(x => x.id === updatedAssignment.id);
    if (index === -1) {
      // handle error
      return;
    }
    else {
      setClassAssignments([
        ...classAssignments.slice(0,index),
        Object.assign({}, classAssignments[index], updatedAssignment),
        ...classAssignments.slice(index + 1),
      ])
    }    
  }

  const removeClassAssignment = (assignmentId) => {
    const index = classAssignments.findIndex(x => x.id === assignmentId);
    console.log(index)
    if (index === -1) {
      // handle error
      return;
    }
    else {
      setClassAssignments([
        ...classAssignments.slice(0,index),
        ...classAssignments.slice(index + 1),
      ])
    }    
  }

  const contextValue = {
    currentClass: currentClass,
    setCurrentClass: setCurrentClass,
    classAssignments: classAssignments,
    setClassAssignments: setClassAssignments,
    addClassAssignment: addClassAssignment,
    removeClassAssignment,
    updateClassAssignment,
    currentUser: currentUserInClass,
    isTeacher: currentUserInClass.role === USER_CLASS_ROLES.TEACHER,
  }

  return (
    <CurrentClassContext.Provider value={contextValue}>
      {children}
    </CurrentClassContext.Provider>
  )
}

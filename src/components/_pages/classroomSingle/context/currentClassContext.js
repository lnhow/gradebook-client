import { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { selectUser } from '../../../../redux/slices/user';
import { USER_CLASS_ROLES } from '../../../../helpers/constants';

import { 
  CLASS_INITIAL_STATE, CLASS_ASSIGNMENTS_INITIAL_STATE, USER_INITIAL_STATE,
  getClassInfo, getCurrentUserInfoInClass, getClassAssignments
} from './helpers';

import AssignmentAPI from '../../../../helpers/api/assigments';
import { getErrorMessage, isErrorResponse } from '../../../../helpers/error';

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
    const submitData = {
      ...newAssignment,
      class_id: currentClass.class_id
    }
    
    AssignmentAPI.addNewAssignment(submitData)
    .then((res) => {
      if (!isErrorResponse(res)) {
        const assignment = res.data.data;
        localAddClassAssignment(assignment);
        toast.success('Thành công');
      } else {  // There is an error
        const err = { response: res };
        toast.error(`Lỗi thêm điểm mới - ${getErrorMessage(err)}`);
      }
    })
    .catch((err) => {
      toast.error(`Lỗi thêm điểm mới - ${getErrorMessage(err)}`);
    })
  }

  const updateClassAssignment = (updatedAssignment) => {
    // TODO: Call API here, if success calls local update
    localUpdateClassAssignment(updatedAssignment);
  }

  const removeClassAssignment = (assignmentId) => {
    // TODO: Call API here, if success calls local remove
    localRemoveClassAssignment(assignmentId);   
  }

  /**
   * Add class assignment to LOCAL STATE
   * @param {*} newAssignment the new assignment info object
   */
  const localAddClassAssignment = (newAssignment) => {
    setClassAssignments([
      ...classAssignments,
      newAssignment
    ]);
  }

  /**
   * Update class assignment in LOCAL STATE
   * @param {*} updatedAssignment the updated assignment info object
   */
  const localUpdateClassAssignment = (updatedAssignment) => {
    const index = classAssignments.findIndex(x => x.id === updatedAssignment.id);
    if (index === -1) {
      // Not found
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

  /**
   * Remove class assignment from LOCAL STATE
   * @param {*} assignmentId Id of the assignment to remove
   */
  const localRemoveClassAssignment = (assignmentId) => {
    const index = classAssignments.findIndex(x => x.id === assignmentId);
    if (index === -1) {
      // Not found
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

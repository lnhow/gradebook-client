import { createContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../../../redux/slices/user';
import { USER_CLASS_ROLES } from '../../../../helpers/constants';

import { 
  CLASS_INITIAL_STATE, CLASS_ASSIGNMENTS_INITIAL_STATE, USER_INITIAL_STATE,
  getClassInfo, getCurrentUserInfoInClass, getClassAssignments
} from './helpers';

import AssignmentAPI from '../../../../helpers/api/assigments';
import { handleAPICallSuccess, handleAPICallError } from '../../../../helpers/handleAPICall';

export const CurrentClassContext = createContext({
  currentClass: CLASS_INITIAL_STATE,
  setCurrentClass: () => {},  //EMPTY FUNCTION
  classAssignments: CLASS_ASSIGNMENTS_INITIAL_STATE,
  setClassAssignments: () => {},
  addClassAssignment: () => {},
  removeClassAssignment: () => {},
  updateClassAssignment: () => {},
  reOrderAssigments: () => {},
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
    .then(handleAPICallSuccess(
      (assignmentData) => { localAddClassAssignment(assignmentData); },
      'Thành công',
      'Lỗi thêm điểm mới'
    ))
    .catch(handleAPICallError('Lỗi thêm điểm mới'));
  }

  const updateClassAssignment = (updatedAssignment) => {
    AssignmentAPI.updateAssignment(updatedAssignment.id, updatedAssignment)
    .then(handleAPICallSuccess(
      () => { localUpdateClassAssignment(updatedAssignment); },
      'Thành công',
      'Lỗi chỉnh sửa điểm'
    ))
    .catch(handleAPICallError('Lỗi chỉnh sửa điểm'));
  }

  const removeClassAssignment = (assignmentId) => {
    AssignmentAPI.removeAssignment(assignmentId)
    .then(handleAPICallSuccess(
      () => { localRemoveClassAssignment(assignmentId); },
      'Thành công',
      'Lỗi xóa điểm'
    ))
    .catch(handleAPICallError('Lỗi xóa điểm'));   
  }

  const reOrderClassAssignment = (newAssignment) => {
    let list_assignment =[]
    newAssignment.forEach ((e) => list_assignment.push(e.id))
    console.log(list_assignment)
    const submitData = {
      class_id: currentClass.class_id,
      list_assignment
    }
    localReOrderClassAssignment(newAssignment)
    
    AssignmentAPI.reOrderAssigments(submitData)
    .then(
    )
    .catch(handleAPICallError('Lỗi cập nhập thứ tự'));   
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

  const localReOrderClassAssignment = (newAssignment) => {
    newAssignment.forEach ((e,index) => e.position=index)
    setClassAssignments(newAssignment)
  }

  const contextValue = {
    currentClass: currentClass,
    setCurrentClass: setCurrentClass,
    classAssignments: classAssignments,
    setClassAssignments: setClassAssignments,
    addClassAssignment: addClassAssignment,
    removeClassAssignment,
    updateClassAssignment,
    reOrderClassAssignment,
    currentUser: currentUserInClass,
    isTeacher: currentUserInClass.role === USER_CLASS_ROLES.TEACHER,
  }

  return (
    <CurrentClassContext.Provider value={contextValue}>
      {children}
    </CurrentClassContext.Provider>
  )
}

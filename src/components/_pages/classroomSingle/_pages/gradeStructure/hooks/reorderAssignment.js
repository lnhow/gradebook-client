import { useContext } from 'react';

import { CurrentClassContext } from '../../../context/currentClassContext';
import AssignmentAPI from '../../../../../../helpers/api/assigments';
import { handleAPICallError } from '../../../../../../helpers/handleAPICall';

const useReOrderAssignment = () => {
  const { currentClass, setClassAssignments } = useContext(CurrentClassContext);

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

  const localReOrderClassAssignment = (newAssignment) => {
    newAssignment.forEach ((e,index) => e.position=index)
    setClassAssignments(newAssignment)
  }

  return reOrderClassAssignment;
}

export default useReOrderAssignment;

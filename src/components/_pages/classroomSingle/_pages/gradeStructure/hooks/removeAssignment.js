import { toast } from 'react-toastify';
import { useContext } from 'react';

import { CurrentClassContext } from '../../../context/currentClassContext';
import AssignmentAPI from '../../../../../../helpers/api/assigments';
import { handleAPICallSuccess, handleAPICallError } from '../../../../../../helpers/handleAPICall';

const useRemoveClassAssignment = () => {
  const { classAssignments, setClassAssignments } = useContext(CurrentClassContext);

  const removeClassAssignment = (
    assignmentId, 
    errCallback = () => {}, 
    finalCallback = () => {}
  ) => {
    const loadingToastId = toast.loading('Thực hiện thao tác xóa...');

    AssignmentAPI.removeAssignment(assignmentId)
    .then(handleAPICallSuccess(
      () => { localRemoveClassAssignment(assignmentId); },
      'Thành công',
      'Lỗi xóa điểm'
    ))
    .catch(() => {
      handleAPICallError('Lỗi xóa điểm');
      errCallback();
    })
    .finally(() => {
      toast.dismiss(loadingToastId);
      finalCallback();
    });
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

  return removeClassAssignment;
}

export default useRemoveClassAssignment;

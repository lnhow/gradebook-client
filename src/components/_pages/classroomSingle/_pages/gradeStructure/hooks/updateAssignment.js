import { toast } from 'react-toastify';
import { useContext } from 'react';

import { CurrentClassContext } from '../../../context/currentClassContext';
import AssignmentAPI from '../../../../../../helpers/api/assigments';
import { handleAPICallSuccess, handleAPICallError } from '../../../../../../helpers/handleAPICall';

const useUpdateClassAssignment = () => {
  const { classAssignments, setClassAssignments } = useContext(CurrentClassContext);

  const updateClassAssignment = (updatedAssignment, finalCallback = () => {}) => {
    const loadingToastId = toast.loading('Thực hiện chỉnh sửa...');

    AssignmentAPI.updateAssignment(updatedAssignment.id, updatedAssignment)
    .then(handleAPICallSuccess(
      () => { localUpdateClassAssignment(updatedAssignment); },
      'Thành công',
      'Lỗi chỉnh sửa điểm'
    ))
    .catch(handleAPICallError('Lỗi chỉnh sửa điểm'))
    .finally(() => {
      toast.dismiss(loadingToastId);
      finalCallback();
    });
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

  return updateClassAssignment;
}

export default useUpdateClassAssignment;

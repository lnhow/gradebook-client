import { toast } from 'react-toastify';
import { useContext } from 'react';

import { CurrentClassContext } from '../../../context/currentClassContext';
import AssignmentAPI from '../../../../../../helpers/api/assigments';
import { handleAPICallSuccess, handleAPICallError } from '../../../../../../helpers/handleAPICall';

const useAddClassAssignment = () => {
  const { currentClass, classAssignments, setClassAssignments } = useContext(CurrentClassContext);

  const addClassAssignment = (newAssignment, finalCallback = () => {}) => {
    const submitData = {
      ...newAssignment,
      class_id: currentClass.class_id
    }

    const loadingToastId = toast.loading('Đang thêm điểm mới...');

    AssignmentAPI.addNewAssignment(submitData)
    .then(handleAPICallSuccess(
      (assignmentData) => { localAddClassAssignment(assignmentData); },
      'Thành công',
      'Lỗi thêm điểm mới'
    ))
    .catch(handleAPICallError('Lỗi thêm điểm mới'))
    .finally(() => {
      toast.dismiss(loadingToastId);
      finalCallback();
    });
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

  return addClassAssignment;
}

export default useAddClassAssignment;

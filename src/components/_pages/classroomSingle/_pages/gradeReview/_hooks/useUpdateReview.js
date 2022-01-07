import { toast } from 'react-toastify';
import { useContext } from 'react';

import GradeReviewAPI from '../../../../../../helpers/api/client/gradeReview';
import { ReviewListContext } from '../_context/reviewContext';
import { handleAPICallSuccess, handleAPICallError } from '../../../../../../helpers/handleAPICall';

export default function useUpdateReview() {
  const { reviews, setReview } = useContext(ReviewListContext);

  const updateClassAssignment = (reviewId, updated, finalCallback = () => {}) => {
    const loadingToastId = toast.loading('Thực hiện chốt điểm...');

    GradeReviewAPI.updateReview(reviewId, updated)
    .then(handleAPICallSuccess(
      () => { 
        localUpdateClassAssignment(reviewId, updated); 
      },
      'Thành công',
      'Lỗi chốt điểm'
    ))
    .catch(handleAPICallError('Lỗi chốt điểm'))
    .finally(() => {
      toast.dismiss(loadingToastId);
      finalCallback();
    });
  }

  /**
   * Update class review in LOCAL STATE
   * @param {*} updated the updated review info object
   */
   const localUpdateClassAssignment = (reviewId, updated) => {
    const index = reviews.findIndex(x => x.id === reviewId);
    if (index === -1) {
      // Not found
      return;
    }
    else {
      setReview([
        ...reviews.slice(0,index),
        Object.assign({}, reviews[index], updated),
        ...reviews.slice(index + 1),
      ])
    }    
  }

  return updateClassAssignment;
}

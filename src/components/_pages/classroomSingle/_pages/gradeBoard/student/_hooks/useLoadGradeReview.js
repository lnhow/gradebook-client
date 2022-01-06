import { useContext } from 'react';
import { CurrentClassContext } from '../../../../context/currentClassContext';
import { MyGradeContext } from '../_context/myGradeContext';

import GradeReviewAPI from '../../../../../../../helpers/api/client/gradeReview';
import { handleAPICallError } from '../../../../../../../helpers/handleAPICall';

export default function useLoadGradeReview() {
  const { currentClass } = useContext(CurrentClassContext);
  const { 
    setReview,
    addReview,
    setIsFinalPage,
    nextReviewPage,
  } = useContext(MyGradeContext);

  /// If reload === false then load more
  const loadGradeReview = async (reload = false) => {
    return new Promise((resolve, reject) => {
      const classId = currentClass.class_id;
      setIsFinalPage(false);
      if (reload) { // Reset reviews
        setReview([]);
      }
      GradeReviewAPI.listReview(classId, nextReviewPage)
      .then((res) => {
        // console.log(res.data);
        const newReviews = res.data.data;
        if (newReviews.length === 0) {
          // There is no reviews any more
          setIsFinalPage(true);
          return resolve(newReviews);
        }
        addReview(newReviews);
        return resolve(newReviews);
      })
      .catch((err) => {
        handleAPICallError()(err);
        return reject(err);
      })
    })
  }

  return loadGradeReview;
}
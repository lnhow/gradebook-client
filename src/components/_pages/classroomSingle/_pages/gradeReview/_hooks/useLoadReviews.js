import { useContext } from 'react';
import { CurrentClassContext } from '../../../context/currentClassContext';
import { ReviewListContext } from '../_context/reviewContext';

import GradeReviewAPI from '../../../../../../helpers/api/client/gradeReview';
import { handleAPICallError } from '../../../../../../helpers/handleAPICall';

export default function useLoadReviews() {
  const { currentClass } = useContext(CurrentClassContext);
  const { 
    reviews,
    setReview,
    setIsFinalPage,
    nextReviewPage,
  } = useContext(ReviewListContext);

  /// If reload === false then load more
  const loadGradeReview = async (reload = false) => {
    return new Promise((resolve, reject) => {
      const classId = currentClass.class_id;
      let page = nextReviewPage;
      setIsFinalPage(false);
      if (reload) { // Reset reviews
        setReview([], 1);
        page = 1
      }
      GradeReviewAPI.listReview(classId, page)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success === false) {
          throw new Error(res.data.message);
        }
        const total = res.data.total;
        const newReviews = res.data.data;
        if (newReviews.length === 0) {
          // There is no reviews any more
          setIsFinalPage(true);
          return resolve(newReviews);
        }

        if (reviews.length + newReviews.length >= total) {
          setIsFinalPage(true);
        }

        let initialReviews = [];
        if (!reload) {
          initialReviews = [...reviews];
        }
        setReview([...initialReviews, ...newReviews], page + 1);
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
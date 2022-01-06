import { createContext, useState } from 'react';

const GRADE_INITIAL_STATE = {};
const REVIEWS_INITIAL_STATE = [];
const REVIEW_NEXT_PAGE_INITIAL = 1;
const REVIEW_FINAL_PAGE_INITIAL = false;
const FUNCTION_INITIAL_STATE = () => {};

export const MyGradeContext = createContext({
  grade: GRADE_INITIAL_STATE,
  setGrade: FUNCTION_INITIAL_STATE,
  reviews: REVIEWS_INITIAL_STATE,
  setReview: FUNCTION_INITIAL_STATE,
  addReview: FUNCTION_INITIAL_STATE,
  nextReviewPage: REVIEW_NEXT_PAGE_INITIAL,
  isFinalPage: REVIEW_FINAL_PAGE_INITIAL,
  setIsFinalPage: FUNCTION_INITIAL_STATE,
})

export default function MyGradeProvider({children}) {
  const [grade, _setGrade] = useState(GRADE_INITIAL_STATE);
  const [reviews, _setReview] = useState(REVIEWS_INITIAL_STATE);
  const [nextReviewPage, _setNextReviewPage] = useState(REVIEW_NEXT_PAGE_INITIAL);
  const [isFinalPage, _setIsFinalPage] = useState(REVIEW_FINAL_PAGE_INITIAL);

  const setGrade = (grade = {}) => {
    _setGrade(grade);
  }

  const setReview = (reviews = {}) => {
    _setReview(reviews);
    _setNextReviewPage(REVIEW_NEXT_PAGE_INITIAL);
  }

  const addReview = (moreReview = []) => {
    const updatedReviews = [...reviews, ...moreReview];
    _setReview(updatedReviews);
    _setNextReviewPage(nextReviewPage + 1);
  }

  const setIsFinalPage = (b = false) => {
    _setIsFinalPage(b);
  }

  const contextValue = {
    grade,
    setGrade,
    reviews,
    setReview,
    addReview,
    nextReviewPage,
    isFinalPage,
    setIsFinalPage,
  }

  return (
    <MyGradeContext.Provider value={contextValue}>
      {children}
    </MyGradeContext.Provider>
  )
}

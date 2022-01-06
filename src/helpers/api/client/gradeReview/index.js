import api from '../../'
import { getAuthConfig } from '../../';

const baseURL = '/gradereview';
const baseURLComment = '/gradecomment';

export const listReview = async (classId, page) => {
  const config = getAuthConfig();
  const data = {
    class_id: classId,
    page: page,
  }

  return api.post(`${baseURL}`, data, config);
}

export const studentPostReviewRequest = async (studentId, input) => {
  // const endpointURL = '/update';
  // const config = getAuthConfig();
  // const dataInput = {
  //   student_id: studentId,
  //   assignment_id: assignmentId,
  //   grade
  // }
  
  // return api.put(`${baseURL}${endpointURL}`, dataInput, config);
}

/// Grade review----------------------------------------------------------

export const listComment = async (reviewId, page = 1) => {
  const config = getAuthConfig();
  const data = {
    review_id: reviewId,
    page: page
  }

  return api.post(`${baseURLComment}`, data, config);
}

export const postComment = async (reviewId, form = {}) => {
  const endpoint = '/new';
  const config = getAuthConfig();
  const data = {
    review_id: reviewId,
    ...form,
  }

  return api.post(`${baseURLComment}${endpoint}`, data, config);
}

export const GradeReviewCommentAPI = {
  postComment,
  listComment,
}

const GradeReviewAPI = {
  studentPostReviewRequest,
  listReview,
  CommentAPI: GradeReviewCommentAPI,
}

export default GradeReviewAPI;

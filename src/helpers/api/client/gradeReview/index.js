import api from '../../'
import { getAuthConfig } from '../../';

const baseURL = '/gradereview';

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

const GradeReviewAPI = {
  studentPostReviewRequest,
  listReview,
}

export default GradeReviewAPI;

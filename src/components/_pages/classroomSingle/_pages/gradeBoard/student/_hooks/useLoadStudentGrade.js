import { useContext } from 'react';
import { CurrentClassContext } from '../../../../context/currentClassContext';
import GradeAPI from '../../../../../../../helpers/api/grade';
import { handleAPICallError } from '../../../../../../../helpers/handleAPICall';

export default function useLoadStudentGrade() {
  const { currentClass } = useContext(CurrentClassContext);
  const loadStudentGrade = async () => { 
    return new Promise((resolve, reject) => {
      const classId = currentClass.class_id;
      
      GradeAPI.studentGetGrade(classId)
      .then((result) => {
        console.log(result);
        return resolve(result.data.data);
      })
      .catch((err) => {
        handleAPICallError()(err);
        return reject(err);
      });
    });
  }

  return loadStudentGrade;
}

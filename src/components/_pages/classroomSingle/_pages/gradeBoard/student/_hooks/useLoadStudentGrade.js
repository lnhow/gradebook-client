import { useContext } from 'react';
import { CurrentClassContext } from '../../../../context/currentClassContext';
import { MyGradeContext } from '../_context/myGradeContext';
import GradeAPI from '../../../../../../../helpers/api/grade';
import { handleAPICallError } from '../../../../../../../helpers/handleAPICall';

export default function useLoadStudentGrade() {
  const { currentClass } = useContext(CurrentClassContext);
  const { setGrade } = useContext(MyGradeContext);

  const loadStudentGrade = async () => { 
    return new Promise((resolve, reject) => {
      const classId = currentClass.class_id;
      
      GradeAPI.studentGetGrade(classId)
      .then((result) => {
        const grade = result.data.data;
        setGrade(grade);
        return resolve(grade);
      })
      .catch((err) => {
        handleAPICallError()(err);
        return reject(err);
      });
    });
  }

  return loadStudentGrade;
}

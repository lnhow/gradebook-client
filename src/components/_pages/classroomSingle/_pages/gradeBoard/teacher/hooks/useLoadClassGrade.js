import { useContext } from 'react';
import GradeAPI from '../../../../../../../helpers/api/grade';
import { CurrentClassContext } from '../../../../context/currentClassContext';

export default function useLoadClassGrade() {
  const { 
    setClassGrades, 
    currentClass
  } = useContext(CurrentClassContext);

  const processGrade = (grade) => {
    return {
      id: grade.id,
      grade: grade.grade
    }
  }
  const processRow = (row) => {
    const student_id = row.student_code.toString();
    const fullname = row.full_name;
    const summary = typeof(row.totalPoint) != 'number' ? '_' : row.totalPoint;
    const grades = row.listGrade.map(processGrade);

    return {
      id: student_id,
      student_id,
      fullname,
      summary,
      list_grade: grades,
    }
  }

  const processData = (result) => {
    return result.map(processRow);
  }

  const loadClassGrades = async () => {
    return new Promise((resolve, reject) => {
      GradeAPI.teacherGetGrade(currentClass.class_id)
      .then((result) => {
        const processedData = processData(result.data.data);
        setClassGrades(processedData);
        
        return resolve(result)
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      })
    })
    
  }

  return loadClassGrades;
}

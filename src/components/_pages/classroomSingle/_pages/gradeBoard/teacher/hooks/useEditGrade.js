import { useContext } from 'react';
import GradeAPI from '../../../../../../../helpers/api/grade';
import { CurrentClassContext } from '../../../../context/currentClassContext';
import { handleAPICallError } from '../../../../../../../helpers/handleAPICall';
import { 
  getGradeFromAssignmentId,
  getGradeIndexFromAssignmentId,
  calculateSummaryAtRow
} from '../../_helpers';

export default function useEditGrade() {
  const { 
    classGrades, 
    classAssignments, 
    setClassGrades 
  } = useContext(CurrentClassContext);

  const localEditGrade = (index, assignmentId, newGrade) => {
    
    if (index < 0 || index > classGrades.length) {
      return;
    }

    const row = Object.assign({}, classGrades[index]);
    // Assign new grade
    const gradeIndex = getGradeIndexFromAssignmentId(assignmentId, row);
    if (gradeIndex === -1) {
      return;
    }
    row.list_grade[gradeIndex].grade = newGrade;
    row.summary = calculateSummaryAtRow(row, classAssignments);
    // After local update
    // console.log(row);
    
    setClassGrades([
      ...classGrades.slice(0, index),
      row,
      ...classGrades.slice(index + 1)
    ]);
  }

  const editGrade = (studentId, assignmentId, newGrade) => {
    //console.log(studentId + " " + assignmentId + " " + newGrade)
    const index = classGrades.findIndex((row) => row.student_id === studentId);
    if (index === -1) {
      return;
    }

    const row = classGrades[index];
    const oldGrade = getGradeFromAssignmentId(assignmentId, row);
    const revertLocalGradeChange = () => {
      localEditGrade(index, assignmentId, oldGrade);
    }
    
    // Double check to see it it should be axed
    const grade = parseFloat(newGrade);
    if (isNaN(grade) || oldGrade === grade) {
      revertLocalGradeChange();
      return;
    }
    GradeAPI.teacherEditGradeCell(studentId, assignmentId, grade)
    .then((result) => {
      //console.log(result);
      localEditGrade(index, assignmentId, grade)
    })
    .catch((error) => {
      handleAPICallError('Lỗi chỉnh sửa điểm')(error);
      revertLocalGradeChange();
    })
  }

  return editGrade
}

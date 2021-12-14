import { useContext } from 'react';
import { CurrentClassContext } from '../../../../context/currentClassContext';

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
    row[assignmentId] = newGrade;
    
    // Re-calculate summary
    let summary = 0;
    let totalWeight = 0;
    
    classAssignments.forEach((assignment) => {
      const grade = row[assignment.id];
      if (grade !== null && grade !== undefined) {
        summary += grade * assignment.weight;
        totalWeight += assignment.weight;
      }
    })
    row.summary = (summary / totalWeight).toFixed(2);

    
    setClassGrades([
      ...classGrades.slice(0, index),
      row,
      ...classGrades.slice(index + 1)
    ]);
  }

  const editGrade = (studentId, assignmentId, newGrade) => {
    console.log(studentId + " " + assignmentId + " " + newGrade)
    const index = classGrades.findIndex((row) => row.student_id === studentId);
    if (index === -1) {
      return;
    }
    const row = classGrades[index];
    const oldGrade = row[assignmentId];
    
    const grade = parseFloat(newGrade);
    if (isNaN(grade)) {
      localEditGrade(index, assignmentId, oldGrade);
      return;
    }
    localEditGrade(index, assignmentId, grade)
  }

  return editGrade
}

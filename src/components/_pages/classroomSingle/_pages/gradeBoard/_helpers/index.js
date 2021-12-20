export const DEFAULT_GRADE = '_';
export const GRADE_FINALIZED = 'Y';
export const GRADE_NOT_FINALIZED = 'N';

export const isGradeFinalized = (finalization) => {
  return finalization === GRADE_FINALIZED;
}

export const getGradeFromAssignmentId = (assignmentId, row) => {
  let result = DEFAULT_GRADE;
  
  const index = getGradeIndexFromAssignmentId(assignmentId, row);
  if (index !== -1) {
    result = row.list_grade[index].grade;
  }
  return result;
}

export const getGradeIndexFromAssignmentId = (assignmentId, row) => {
  const index = row.list_grade.findIndex((grade) => {
    return grade.id === assignmentId;
  });
  return index;
}

export const calculateSummaryAtRow = (row, assignmentArr = []) => {
  // Re-calculate summary
  let summary = 0;
  let totalWeight = 0;
  let isAColEmpty = false;
  
  for (let i = 0; i < assignmentArr.length; i++) {
    const assignment = assignmentArr[i];
    const gradeValue = getGradeFromAssignmentId(assignment.id, row);
    const grade = parseFloat(gradeValue);

    if (isNaN(grade)) {
      isAColEmpty = true;
      break;
    }

    summary += grade * assignment.weight;
    totalWeight += assignment.weight;
  }

  if (isAColEmpty) {
    return DEFAULT_GRADE;
  }

  summary = (summary / totalWeight).toFixed(2);
  return summary;
}
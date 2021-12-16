import { useContext } from 'react';
import { CurrentClassContext } from '../../../../../../context/currentClassContext';

import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { isGradeFinalized } from '../../../../_helpers';

export default function StudentGradeTable({studentGrade}) {
  const { classAssignments } = useContext(CurrentClassContext);

  let isAllFinalized = classAssignments.every((assignment) => 
    isGradeFinalized(assignment.finalized)
  );
  let grades = {};
  if (!isEmptyObject(studentGrade)) {
    grades = processRow(studentGrade, isAllFinalized);
  }

  // Map assignment to columns
  const assignmentCols = classAssignments.map((assignment) => {
    const fieldName = getAssignmentField(assignment.id);
    const headerName = assignment.title;
    const finalized = isGradeFinalized(assignment.finalized);

    return {
      field: fieldName,
      headerName,
      minWidth: 150, 
      flex: 1,
      renderHeader: (params) => {
        return <span>{`${params.colDef.headerName} (${assignment.weight})`} </span>
      },
      renderCell: (params) => {
        if (finalized) {
          return `${params.value} / 10`;
        }
        return '(Chưa có)';
      }     
    }
  });

  const colsDef = [
    {field: 'student_id', headerName: 'MSSV', minWidth: 110},
    {field: 'fullname', headerName: 'Họ tên', minWidth: 200},
    {field: 'summary', headerName: 'Tổng điểm', minWidth: 150}
  ].concat(assignmentCols);

  const data = (isEmptyObject(grades)) ? [] : [mapStudentGrade(grades)];
  
  return (
    <Box sx={TableContainerSX}>
      <DataGrid
        columns={colsDef}
        rows={data}
      />
    </Box>
  )
}

const isEmptyObject = (obj) => {
  const condition = obj && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype;
  return condition;
}

// Map grade list to table
const mapStudentGrade = (grade) => {
  const list_grade = {};
  grade.list_grade.forEach(grade => {
    const formattedGrade = grade.grade === "" ? "_" : grade.grade;
    list_grade[getAssignmentField(grade.id)] = formattedGrade;
  });
  const result = {
    ...grade,
    ...list_grade,
  }
  result.list_grade = undefined;

  return result;
};

const getAssignmentField = (assignmentId) => {
  return assignmentId.toString();
}

const processGrade = (grade) => {
  const gradeValue = grade.grade;
  const finalized = isGradeFinalized(grade.finalized);

  return {
    id: grade.id,
    grade: gradeValue,
    finalized: finalized,
  }
}
const processRow = (row, isAllFinalized) => {
  const student_id = row.student_code;
  const fullname = row.full_name;
  const summary = 
    (typeof(row.totalPoint) != 'number' || !isAllFinalized) ? '(Chưa có)' : row.totalPoint;
  const grades = row.listGrade.map(processGrade);
  
  //console.log(row);

  return {
    id: student_id,
    student_id,
    fullname,
    summary,
    list_grade: grades,
  }
}

const TableContainerSX = {
  display: 'flex', 
  height: 200,
  // Show red color when validation fail
  '& .Mui-error': {
    bgcolor: (theme) =>
      `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
  },
}

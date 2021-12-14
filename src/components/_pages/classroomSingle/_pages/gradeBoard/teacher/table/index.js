import {
  Paper,
  Box,
} from '@mui/material';
import { 
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid';

import { useContext } from 'react';
import { CurrentClassContext } from '../../../../context/currentClassContext';
import useEditGrade from '../hooks/useEditGrade';

import CustomColumnMenu from './customs/columnMenu';
import CustomNoRowsOverlay from './customs/noRowsOverlay';

import validateGrade from './validation/grade';

export default function GradeTable() {
  const { classAssignments, classGrades } = useContext(CurrentClassContext);
  const editGrade = useEditGrade();
  
  const assignmentMap = {};
  const assignmentCols = classAssignments.map((assignment) => {
    const fieldName = assignment.id.toString();
    const headerName = assignment.title;

    assignmentMap[fieldName] = {
      assignmentId: assignment.id,
      field: fieldName,
      headerName: headerName
    }

    return {
      field: fieldName,
      headerName,
      minWidth: 150,
      assignment_id: assignment.id,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = validateGrade(params.props.value);
        return { ...params.props, error: !isValid };
      }
      
    }
  })
  const colsDef = [
    {field: 'student_id', headerName: 'MSSV', minWidth: 110},
    {field: 'fullname', headerName: 'Họ tên', minWidth: 200},
    {field: 'summary', headerName: 'Tổng điểm', minWidth: 150}
  ].concat(assignmentCols);
  const data = classGrades;

  const onCellEditCommit = (params, event, detail) => {
    // console.log(params);
    const studentId = params.id;
    const assignmentId = assignmentMap[params.field].assignmentId;
    const newValue = params.value;
    editGrade(studentId, assignmentId, newValue)
  }

  const toggleGradeDisplay = (assignment_id) => {
    console.log(assignment_id);
  }

  const importGrade = (assignment_id) => {
    console.log(assignment_id);
  }

  return (
    <Paper>
      <Box 
        sx={{
          display: 'flex', 
          minHeight: 400,
          // Show red color when validation fail
          '& .Mui-error': {
            bgcolor: (theme) =>
              `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
            color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
          },
        }}
      >
        <DataGrid
          autoHeight
          columns={colsDef}
          rows={data}
          onCellEditCommit={onCellEditCommit}
          components={{
            ColumnMenu: CustomColumnMenu,
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{
            columnMenu: {
              toggleGrade: toggleGradeDisplay,
              importGrade
            }
          }}
        />
      </Box>
    </Paper>
  )
}

import {
  Paper,
  Box,
} from '@mui/material';
import { 
  DataGrid,
} from '@mui/x-data-grid';

import { useContext, useState } from 'react';
import { CurrentClassContext } from '../../../../context/currentClassContext';
import useEditGrade from '../hooks/useEditGrade';
import useUpdateClassAssignment from '../../../gradeStructure/hooks/updateAssignment';

import CustomColumnMenu from './customs/columnMenu';
import CustomNoRowsOverlay from './customs/noRowsOverlay';

import validateGrade from './helpers/validation/grade';
import { GRADE_FINALIZED, GRADE_NOT_FINALIZED, isGradeFinalized } from '../../_helpers';
import CustomToolbar from './customs/toolBar';
import ImportGradeDialog from '../dialogs/importGrade';
import MediaAPI from '../../../../../../../helpers/api/media';

export default function GradeTable({refreshData = () => {}}) {
  const { classAssignments, classGrades, currentClass } = useContext(CurrentClassContext);
  const editGrade = useEditGrade();
  const updateAssignment = useUpdateClassAssignment();

  const [isImportGradeOpen, setImportGradeOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  
  // A helper hash map to help with edittings
  const assignmentMap = {};

  let totalWeight = classAssignments.reduce((prev, curr) => prev + curr.weight, 0);

  // Map assignment to columns
  const assignmentCols = classAssignments.map((assignment) => {
    const fieldName = getAssignmentField(assignment.id);
    const headerName = assignment.title;

    assignmentMap[fieldName] = {
      assignmentId: assignment.id,
      field: fieldName,
      headerName: headerName,
      finalized: isGradeFinalized(assignment.finalized)
    }

    return {
      field: fieldName,
      headerName,
      minWidth: 150,
      assignment_id: assignment.id,
      editable: true,
      flex: 1,
      preProcessEditCellProps: (params) => {
        const isValid = validateGrade(params.props.value);
        return { ...params.props, error: !isValid };
      },
      renderHeader: (params) => {
        return <span>{`${params.colDef.headerName} (${assignment.weight})`} </span>
      },
      valueFormatter: (params) => {
        return `${params.value} / 10`;
      }
      
    }
  })

  // Define columns
  const colsDef = [
    {field: 'student_id', headerName: 'MSSV', minWidth: 110},
    {field: 'fullname', headerName: 'Họ tên', minWidth: 200},
    {
      field: 'summary', 
      headerName: `Tổng điểm (${totalWeight})`, 
      minWidth: 150,
      renderCell: (params) => {
        return params.value + ' / 10';
      }
    }
  ].concat(assignmentCols);

  // console.log(colsDef)
  // Map grade list to table
  const data = classGrades.map((grade) => {
    const list_grade = {};
    grade.list_grade.forEach(grade => {
      const formattedGrade = grade.grade === "" ? "_" : grade.grade;
      list_grade[`${getAssignmentField(grade.id)}`] = formattedGrade;
    });
    const result = {
      ...grade,
      ...list_grade,
    }
    result.list_grade = undefined;
    // console.log(result);

    return result;
  });

  const onCellEditCommit = (params, event, detail) => {
    //console.log(params);
    const studentId = params.id;
    const assignmentId = assignmentMap[params.field].assignmentId;
    const newValue = params.value;
    editGrade(studentId, assignmentId, newValue)
  }

  const toggleGradeDisplay = (assignment_field, callback = () => {}) => {
    const assignmentId = assignmentMap[assignment_field].assignmentId;
    let isFinalized = assignmentMap[assignment_field].finalized;
    // Toggle finalized around
    let newFinalized = isFinalized ? GRADE_NOT_FINALIZED : GRADE_FINALIZED;
    const submitValues = {
      class_id: currentClass.class_id,
      id: assignmentId,
      finalized: newFinalized
    }

    updateAssignment(submitValues, () => {
      callback();
    })
  }

  const getAssignmentTemplate = (assignment_field) => {
    const assignment = assignmentMap[assignment_field];
    return MediaAPI.getTemplateGradeById(assignment.assignmentId);
  }

  const importGrade = (assignment_field) => {
    const assignment = assignmentMap[assignment_field];
    setSelectedAssignment(assignment);
    toggleImportGrade(true);
  }

  const toggleImportGrade = (b) => {
    setImportGradeOpen(b);
  }

  return (
    <Paper>
      <Box sx={TableContainerSX}>
        <DataGrid
          columns={colsDef}
          rows={data}
          onCellEditCommit={onCellEditCommit}
          components={{
            ColumnMenu: CustomColumnMenu,
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{
            columnMenu: {
              toggleGrade: toggleGradeDisplay,
              importGrade,
              getAssignmentTemplate,
              assignmentMap,
            }
          }}
        />
      </Box>
      <ImportGradeDialog 
        open={isImportGradeOpen}
        handleClose={() => {toggleImportGrade(false)}}
        assignment={selectedAssignment}
        onSuccess={() => { refreshData(); }}
      />
    </Paper>
  )
}

const getAssignmentField = (assignmentId) => {
  return assignmentId.toString();
}

const TableContainerSX = {
  display: 'flex', 
  height: 600,
  // Show red color when validation fail
  '& .Mui-error': {
    bgcolor: (theme) =>
      `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
  },
}

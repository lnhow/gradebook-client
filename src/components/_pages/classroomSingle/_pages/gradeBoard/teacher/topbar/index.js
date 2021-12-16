import {
  Typography,
  Box
} from '@mui/material';
import { useState } from 'react';
import GradeboardMenu from './gradeboardMenu';
import ImportStudentDialog from '../dialogs/importStudent';

export default function Topbar({refreshData}) {
  const [isImportStudentOpen, setImportStudentOpen] = useState(false);

  const toggleImportStudent = () => {
    setImportStudentOpen(!isImportStudentOpen);
  }

  const onImportStudentSuccess = () => {
    refreshData();
  }

  const handleClose = () => {
    setImportStudentOpen(false);
  }

  return (
    <Box display='flex' justifyContent='space-between'>
      <Typography variant='h6'>Điểm của lớp</Typography>
      <Box>
        <GradeboardMenu 
          handleRefresh={refreshData}
          toggleImportStudent={toggleImportStudent}
        />
        <ImportStudentDialog
          open={isImportStudentOpen}
          handleClose={handleClose}
          onSuccess={onImportStudentSuccess}
        />
      </Box>
    </Box>
  )
}

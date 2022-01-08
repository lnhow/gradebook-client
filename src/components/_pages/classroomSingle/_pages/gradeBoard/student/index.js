import {
  Container,
  Box,
  Typography,
} from '@mui/material';
import GradeReview from './_components/gradeReview';
import StudentGradeBoard from './_components/studentGrade';
import MyGradeProvider from './_context/myGradeContext';

import { useContext } from 'react';
import { CurrentClassContext } from '../../../context/currentClassContext';

export default function StudentGrade() {
  const { currentClass } = useContext(CurrentClassContext);

  if (!currentClass.class_id || currentClass.class_id === '') {
    // Handle no class_id error when switch / reload this page 
    return (
      <Container maxWidth='xl'>
        &nbsp;
      </Container>
    )
  }

  return (
    <MyGradeProvider>
      <Container maxWidth='lg'>
        <Box marginY={2}>
          <Typography>Điểm của tôi</Typography>
        </Box>
        <Box marginY={1}>
          <StudentGradeBoard/>
        </Box>
      </Container>
      <Box marginTop={4}>
        <GradeReview/>
      </Box>
    </MyGradeProvider>
  )
}

import {
  Container,
  Box,
  Typography,
} from '@mui/material';
import GradeReview from './_components/gradeReview';
import StudentGradeBoard from './_components/studentGrade';
import MyGradeProvider from './_context/myGradeContext';

export default function StudentGrade() {
  return (
    <MyGradeProvider>
      <Container maxWidth='xl'>
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

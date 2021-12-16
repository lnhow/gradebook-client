import {
  Container,
  Box,
  Typography,
} from '@mui/material';
import StudentGradeBoard from './_components/studentGrade';

export default function StudentGrade() {
  return (
    <Container maxWidth='xl'>
      <Box marginY={2}>
        <Typography>Điểm của tôi</Typography>
      </Box>
      <Box marginY={1}>
        <StudentGradeBoard/>
      </Box>
    </Container>
  )
}

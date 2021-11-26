import {
  Container,
  Box,
  Typography
} from '@mui/material';
import AssigmentList from './assignmentList';
import CreateGradeForm from './createForm';

export default function ClassroomGradeStructure() {
  return (
    <Container maxWidth='md'>
      <Box margin={2}>
        <Typography variant='h6'>Chỉnh sửa cấu trúc điểm</Typography>
      </Box>
      <CreateGradeForm/>
      <AssigmentList/>
    </Container>
  )
}

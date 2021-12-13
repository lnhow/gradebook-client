import {
  Container,
  Box
} from '@mui/material';
import GradeTable from './table';
import Topbar from './topbar';

export default function TeacherGradeBoard() {
  return (
    <Container maxWidth='xl'>
      <Box marginY={2}>
        <Topbar/>
      </Box>
      <GradeTable/>
    </Container>
  )
}
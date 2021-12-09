import {
  Container,
  Box
} from '@mui/material';
import Topbar from './topbar';

export default function ClassroomGradeBoard() {
  return (
    <Container maxWidth='xl'>
      <Box marginY={1}>
        <Topbar/>
      </Box>
    </Container>
  )
}

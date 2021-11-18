import {
  Container,
  Box,
  Typography
} from '@mui/material';
import ClassroomDetailSummary from './classroomSummary.js';


function ClassroomDetailPage({classroom}) {
  return (
    <Container maxWidth='md'>
      <Box margin={2}>
        <Typography variant='h6'>Chi tiết lớp</Typography>
      </Box>
      <ClassroomDetailSummary classroom={classroom}/>
    </Container>
  )
}

export default ClassroomDetailPage;

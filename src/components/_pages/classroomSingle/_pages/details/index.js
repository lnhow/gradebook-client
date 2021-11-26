import {
  Container,
  Box,
  Typography
} from '@mui/material';
import GradeStructureSummary from '../../_common/gradeStructureSummary/index.js';
import ClassroomDetailSummary from './classroomSummary.js';


function ClassroomDetailPage({classroom}) {
  return (
    <Container maxWidth='md'>
      <Box margin={2}>
        <Typography variant='h6'>Chi tiết lớp</Typography>
      </Box>
      <ClassroomDetailSummary classroom={classroom}/>
      <Box marginY={2}>
        <GradeStructureSummary/>
      </Box>
    </Container>
  )
}

export default ClassroomDetailPage;

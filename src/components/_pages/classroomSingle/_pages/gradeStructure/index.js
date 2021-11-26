import {
  Container,
  Box
} from '@mui/material';
import GradeStructureSummary from '../../_common/gradeStructureSummary';
import AssigmentList from './assignmentList';
import CreateGradeForm from './createForm';

export default function ClassroomGradeStructure() {
  return (
    <Container maxWidth='md'>
      <Box marginY={1}>
        <GradeStructureSummary/>
      </Box>
      <CreateGradeForm/>
      <AssigmentList/>
    </Container>
  )
}

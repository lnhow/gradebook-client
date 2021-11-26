import { 
  Stack, 
  Box, Paper, Typography, Button
} from '@mui/material';

import { AlignCenter } from '../../../../../_common/utilBoxes';

import { useContext } from 'react';
import { CurrentClassContext } from '../../../context/currentClassContext';
import AssigmentListItem from './assignmentListItem';
import { AssignmentPositionSorter } from '../../../_helpers';

export default function AssignmentList() {
  const { classAssignments } = useContext(CurrentClassContext);
  let displayAssignments = [ ...classAssignments ]; // Sort is mutatable
  displayAssignments.sort(AssignmentPositionSorter);

  return (
    <Box marginTop={2}>
      <Paper>
        <Box padding={1}>
          <AlignCenter display='flex' >
            <Typography sx={{flexGrow: 1}}>Cấu trúc điểm</Typography>
            <Button variant='contained'>Sửa thứ tự</Button>
          </AlignCenter>
        </Box>
      </Paper>
      <Stack my={2} spacing={1}>
        {displayAssignments.map((assignment) => (
          <AssigmentListItem key={assignment.id} assignment={assignment}/>
        ))}
      </Stack>
    </Box>
  )
}

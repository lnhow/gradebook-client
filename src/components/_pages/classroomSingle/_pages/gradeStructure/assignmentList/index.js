import { 
  Stack, 
  Box, Paper, Typography, Button
} from '@mui/material';

import { AlignCenter } from '../../../../../_common/utilBoxes';

import { useContext } from 'react';
import { CurrentClassContext } from '../../../context/currentClassContext';
import AssigmentListItem from './assignmentListItem';

export default function AssignmentList() {
  const { classAssignments } = useContext(CurrentClassContext);

  return (
    <Box marginTop={2}>
      <Paper>
        <Box padding={1}>
          <AlignCenter display='flex' >
            <Typography sx={{flexGrow: 1}}>Cấu trúc điểm</Typography>
            <Button variant='contained'>Lưu vị trí</Button>
          </AlignCenter>
        </Box>
      </Paper>
      <Stack my={2} spacing={1}>
        {classAssignments.map((assignment) => (
          <AssigmentListItem key={assignment.id} assignment={assignment}/>
        ))}
      </Stack>
    </Box>
  )
}

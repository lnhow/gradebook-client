import { Stack } from '@mui/material';
import { useContext } from 'react';
import { CurrentClassContext } from '../../../context/currentClassContext';
import AssigmentListItem from './assignmentListItem';

export default function AssignmentList() {
  const { classAssignments } = useContext(CurrentClassContext);
  console.log(classAssignments)
  return (
    <Stack my={2} spacing={1}>
      {classAssignments.map((assignment) => (
        <AssigmentListItem key={assignment.id} assignment={assignment}/>
      ))}
    </Stack>
  )
}

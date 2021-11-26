import { Stack } from '@mui/material';
import { useContext } from 'react';
import { CurrentClassContext } from '../../../context/currentClassContext';
import AssigmentListItem from './assignmentListItem';

export default function AssignmentList() {
  const { classAssignments } = useContext(CurrentClassContext);
  return (
    <Stack my={2} spacing={1}>
      {classAssignments.map((assignment, index) => (
        <AssigmentListItem key={index} assignment={assignment}/>
      ))}
    </Stack>
  )
}

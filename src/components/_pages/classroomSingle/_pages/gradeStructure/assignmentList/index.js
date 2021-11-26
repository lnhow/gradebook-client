import { 
  Stack, 
  Box, Paper, Typography, Button
} from '@mui/material';

import { useState ,useLayoutEffect} from 'react';
import { AlignCenter } from '../../../../../_common/utilBoxes';

import { useContext } from 'react';
import { CurrentClassContext } from '../../../context/currentClassContext';
import AssigmentListItem from './assignmentListItem';
import { AssignmentPositionSorter } from '../../../_helpers';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  margin: `0 0 8px 0`,
  ...draggableStyle
});

export default function AssignmentList() {
  const { classAssignments ,reOrderClassAssignment} = useContext(CurrentClassContext);
  useLayoutEffect(() => {
    let displayAssignments = [ ...classAssignments ]; // Sort is mutatable
    displayAssignments.sort(AssignmentPositionSorter);
    setAssignments(displayAssignments)
  }, [classAssignments])
  const [assignments, setAssignments] = useState()
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newAssignments = reorder(
      assignments,
      result.source.index,
      result.destination.index
    );
    reOrderClassAssignment(newAssignments)
    
  }

  return (
    <Box marginTop={2}>
      <Paper>
        <Box padding={1}>
          <AlignCenter display='flex' >
            <Typography sx={{flexGrow: 1}}>Cấu trúc điểm</Typography>
          </AlignCenter>
        </Box>
      </Paper>
      <Stack my={2} spacing={1}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
              >
              {assignments && assignments.map((assignment,index) => (
                <Draggable key={assignment.id} draggableId={`${assignment.id}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <AssigmentListItem key={assignment.id} assignment={assignment}/>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
             </div>
            )}
          </Droppable>
        </DragDropContext>
      </Stack>
    </Box>
  )
}
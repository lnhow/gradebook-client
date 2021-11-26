import { 
  Box, Typography, Paper,
  IconButton
} from '@mui/material';
import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { AlignCenter } from '../../../../../../_common/utilBoxes';
import AssignmentEditForm from './assignmentEditForm.js';
import AssignmentDeleteForm from './assignmentDeleteForm';

export default function AssigmentListItem({assignment = {}}) {
  const { title, weight } = assignment;
  const [ itemState, setItemState ] = useState({
    isEditting: false,
    isDeleting: false,
  });

  const toggleEdit = () => {
    setItemState({ 
      isEditting: !itemState.isEditting,
      isDeleting: false
    });
  }

  const onEditClose = () => {
    setItemState({
      ...itemState,
      isEditting: false,
    });
  }

  const toggleDelete = () => {
    setItemState({ 
      isEditting: false,
      isDeleting: !itemState.isDeleting
    });
  }

  const onDeleteClose = () => {
    setItemState({ 
      ...itemState,
      isDeleting: false
    });
  }

  return (
    <Paper>
      <Box padding={1}>
        <Box display='flex'>
          <AlignCenter sx={{ flexGrow: 1}}>
            <Typography variant='body1' sx={{ flexGrow: 1}}>
              <b>{title}</b> (Trọng số: {weight})
            </Typography>
            <IconButton onClick={toggleEdit}><EditIcon/></IconButton>
            <IconButton onClick={toggleDelete}><DeleteIcon/></IconButton>
          </AlignCenter>
        </Box>
        {itemState.isEditting &&
          <AssignmentEditForm 
            assignment={assignment}
            handleClose={onEditClose}
          />
        }
        {itemState.isDeleting &&
          <AssignmentDeleteForm 
            assignment={assignment}
            handleClose={onDeleteClose}
          />
        }
      </Box>
    </Paper>
  )
}

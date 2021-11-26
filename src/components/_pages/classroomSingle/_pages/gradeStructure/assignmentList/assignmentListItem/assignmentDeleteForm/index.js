import { Box, Typography, Button, Stack } from '@mui/material';
import { useContext } from 'react';
import { AlignCenter } from '../../../../../../../_common/utilBoxes';
import { CurrentClassContext } from '../../../../../context/currentClassContext';

export default function AssignmentDeleteForm({
  assignment, 
  handleClose = () => {}
}) {
  const { id } = assignment;
  const { removeClassAssignment } = useContext(CurrentClassContext);

  const handleDeleteAssignment = () => {
    removeClassAssignment(id);
  }

  const onClose = () => {
    handleClose();
  }

  return (
    <Box padding={1}>
      <AlignCenter flexDirection='column'>
        <Box padding={1}>
          <Typography>Xác nhận xóa?</Typography>
        </Box>
        <Stack spacing={2} direction='row'>
          <Button 
            variant='contained'
            color='error'
            onClick={handleDeleteAssignment}
          >
            Xóa
          </Button>
          <Button 
            variant='outlined'
            color='defaultColor'
            onClick={onClose}
          >
            Hủy
          </Button>
        </Stack>
      </AlignCenter>
    </Box>
  )
}

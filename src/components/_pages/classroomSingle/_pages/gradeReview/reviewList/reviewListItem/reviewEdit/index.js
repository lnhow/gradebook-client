import {
  Button,
} from '@mui/material';

import { useState } from 'react';
import ReviewEditForm from './editForm';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ReviewEdit({
  review = {}
}) {
  const [ editOpen, setEditOpen ] = useState(false);

  const icon = editOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>

  const toggleEdit = () => {
    setEditOpen(!editOpen);
  }

  return (
    <>
      <Button
        fullWidth
        onClick={toggleEdit}
        startIcon={icon}
      >
        Cập nhật phúc khảo
      </Button>
      {editOpen && (
        <ReviewEditForm
          review={review}
          handleClose={toggleEdit}
        />
      )}
    </>
  )
}

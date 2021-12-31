import { Button } from '@mui/material';
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';

import RequestReviewDialog from './dialog';

export default function GradeReviewModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  const toggleClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Button onClick={toggleOpen} startIcon={<AddIcon />}>
        Tạo yêu cầu
      </Button>
      <RequestReviewDialog 
        open={isOpen}
        toggleClose={toggleClose}
      />
    </>
  )
}

import { Button } from '@mui/material';
import { useState } from 'react';

import CommentDialog from './dialog';

export default function CommentModal({
  review = {},
  onSuccess = () => {}
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  const toggleClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Button fullWidth onClick={toggleOpen}>
        Xem Comment
      </Button>
      <CommentDialog 
        review={review}
        open={isOpen}
        toggleClose={toggleClose}
        onSuccess={onSuccess}
      />
    </>
  )
}

import { Button } from '@mui/material';
import { useState } from 'react';

import CommentDialog from './dialog';

export default function CommentModal({
  review = {},
  comments = [],
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
        Xem Comment {comments.length > 0 && `(${comments.length})`}
      </Button>
      <CommentDialog 
        review={review}
        comments={comments}
        open={isOpen}
        toggleClose={toggleClose}
        onSuccess={onSuccess}
      />
    </>
  )
}

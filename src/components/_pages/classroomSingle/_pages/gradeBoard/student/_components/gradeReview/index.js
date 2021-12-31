import {
  Container,
  Box,
  Typography,
  // Paper
} from '@mui/material';

import { useContext, useEffect } from 'react';
import { MyGradeContext } from '../../_context/myGradeContext';
import GradeReviewList from './reviewList';

import GradeReviewModal from './reviewPostDialog';

const mockReviews = [
  {
    id: 1,
    reason: 'Lý do lý do lý do',
    assignment: 'Cột điểm',
    expected_grade: '9',
    comments: [
      {
        id: 1,
        content: 'asasas',
      },
      {
        id: 2,
        content: 'asasas',
      },
      {
        id: 3,
        content: 'asasas',
      },
      {
        id: 4,
        content: 'asasas',
      },
      {
        id: 5,
        content: 'asasas',
      },
    ]
  },
  {
    id: 2,
    reason: 'Lý do lý do lý do',
    assignment: 'Cột điểm',
    expected_grade: '9',
    comments: [
      {
        id: 1,
        content: 'asasas',
      },
      {
        id: 2,
        content: 'asasas',
      },
    ]
  },

]

export default function GradeReview() {
  const { setReview } = useContext(MyGradeContext);

  useEffect(() => {
    setReview(mockReviews);
  }, [setReview])

  return (
    <Container maxWidth='md'>
      <Box sx={{display: 'flex'}}>
        <Typography variant='h5' sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <b>Phúc khảo</b>
        </Typography>
        <GradeReviewModal/>
      </Box>
      <GradeReviewList/>
    </Container>
  )
}

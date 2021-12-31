import {
  Box,
  Grid
} from '@mui/material';
import { useContext } from 'react';
import { MyGradeContext } from '../../../_context/myGradeContext';
import ReviewListItem from './reviewListItem';

export default function GradeReviewList({
  handleChange = () => {}
}) {
  const { reviews } = useContext(MyGradeContext);

  return (
    <Box sx={{marginTop: 2}}>
      <Grid container spacing={2}>
        {reviews.map(review => (
          <Grid
            key={review.id}
            item
            xs={12}
          >
            <ReviewListItem review={review}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

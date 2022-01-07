import {
  Paper, 
  Box,
} from '@mui/material';
import CommentModal from './commentModal';
import ReviewDetails from './reviewDetails';
import ReviewEdit from './reviewEdit';

export default function ReviewListItem({
  review = {}
}) {
  return (
    <Paper>
      <Box padding={1}>
        <ReviewDetails review={review}/>
        <CommentModal
          review={review}
        />
        <ReviewEdit 
          review={review}
        />
      </Box>
    </Paper>
  )
}

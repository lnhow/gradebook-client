import {
  Paper, 
  Box,
  Typography,
} from '@mui/material';
import CommentModal from './commentModal';

export default function ReviewListItem({
  review = {}
}) {
  return (
    <Paper>
      <Box padding={1}>
        <Box padding={1}>
          <Typography>{review.reason}</Typography>
        </Box>
        <CommentModal
          review={review}
          comments={review.comments}
        />
      </Box>
    </Paper>
  )
}

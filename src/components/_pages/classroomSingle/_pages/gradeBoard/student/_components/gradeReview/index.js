import {
  Container,
  Box,
  Typography,
  // Paper
} from '@mui/material';
import GradeReviewModal from './reviewPostDialog';

export default function GradeReview() {
  return (
    <Container maxWidth='md'>
      <Box sx={{display: 'flex'}}>
        <Typography variant='h5' sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <b>Phúc khảo</b>
        </Typography>
        <GradeReviewModal/>
      </Box>
      
      {/* List of reviews comment */}
    </Container>
  )
}

import {
  Paper, 
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CommentModal from './commentModal';

import { useContext } from 'react';
import { CurrentClassContext } from '../../../../../../../context/currentClassContext';

const reviewStatus = {
  'N': {
    text: 'Đang chờ phúc khảo',
    color: 'primary',
  },
  'Y': {
    text: 'Đã chốt phúc khảo',
    color: 'success',
  },
  'D': {
    text: '(Đã xóa)',
    color: 'text.secondary'
  },
}

export default function ReviewListItem({
  review = {}
}) {
  const { classAssignments } = useContext(CurrentClassContext);
  let reviewStatusText = reviewStatus[review.status];
  if (!reviewStatusText) {
    reviewStatusText = reviewStatus['N'];
  }
  let assignmentInfo = classAssignments.find((x) => x.id === review.assignment_id) || {};
  // console.log(review);
  // console.log(assignmentInfo);

  return (
    <Paper>
      <Box padding={1}>
        <Box padding={1}>
          <Typography variant='caption'>
            <b>Trạng thái </b>
          </Typography>
          <Typography variant='caption' color={reviewStatusText.color}>
            {reviewStatusText.text}
          </Typography>
          <Box>
            <Typography variant='caption'>
              <b>MSSV</b> {review.student_id}
            </Typography>
            <Typography variant='caption' marginLeft={3}>
              <b>Cột điểm</b> {`${assignmentInfo.title} (${assignmentInfo.weight})`}
            </Typography>
          </Box>
          <Typography component='div' variant='caption'><b>Lý do</b></Typography>
          <Box my={1}>
            <ClipTypography>
              {review.explanation}
            </ClipTypography>
          </Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box>
              <Typography variant='caption'>
                <b>Điểm mong muốn </b>
              </Typography>
              <Typography>{review.expected_grade}</Typography>
            </Box>
            <Box>
              <Typography variant='caption'>
                <b>Điểm chốt</b>
              </Typography>
              <Typography>{review.final_grade ? review.final_grade : '_'}</Typography>
            </Box>
          </Stack>
          

        </Box>
        <CommentModal
          review={review}
        />
      </Box>
    </Paper>
  )
}

const ClipTypography = styled(Typography)(() => ({
  wordWrap: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
}));

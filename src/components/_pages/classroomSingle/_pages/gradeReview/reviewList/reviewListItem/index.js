import {
  Paper, 
  Box,
  Typography,
  Stack,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CommentModal from './commentModal';

import { getLocalDatetimeString } from '../../../../../../../helpers/datetime';

import { useContext } from 'react';
import { CurrentClassContext } from '../../../../context/currentClassContext';

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
  let fullname = review.owner_name || '';
  let avatar = review.owner_avatar || ''; 
  console.log(review);
  // console.log(assignmentInfo);

  return (
    <Paper>
      <Box padding={1}>
        <Box padding={1}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent='space-between'
          >
            <Stack direction='row'>
              <Avatar
                sx={{ bgcolor: 'defaultColor' }}
                alt={fullname}
                src={avatar}
              >
                {/* Fallback to first letter of user's fullname */}
                {fullname ? fullname.charAt(0) : null}
              </Avatar>
              <Box mx={1}>
                <Typography variant='body1'>
                  {fullname}
                </Typography>
                <Typography variant='caption'>
                  <b>MSSV</b> {review.student_id}
                </Typography>
              </Box>
            </Stack>
            <Box display='flex' flexDirection='column'>
              <div>
                <Typography variant='caption'>
                  <b>Trạng thái </b>
                </Typography>
                <Typography variant='caption' color={reviewStatusText.color}>
                  {reviewStatusText.text}
                </Typography>
              </div>
              <Typography variant='caption'>
                {review.created_at && `${getLocalDatetimeString(review.created_at)}`}
              </Typography>
            </Box>
          </Stack>
          <Box my={1}>
            <Typography component='div' variant='caption'><b>Lý do</b></Typography>
            <ClipTypography>
              {review.explanation}
            </ClipTypography>
          </Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
          >
            <Box>
              <Typography variant='caption'>
              <b>Cột điểm</b>
              </Typography>
              <Typography variant='subtitle2'>
                {`${assignmentInfo.title} (${assignmentInfo.weight})`}
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>
                <b>Điểm mong muốn</b>
              </Typography>
              <Typography variant='subtitle2'>
                {review.expected_grade}
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>
                <b>Điểm chốt</b>
              </Typography>
              <Typography variant='subtitle2'>
                {review.final_grade ? review.final_grade : '_'}
              </Typography>
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

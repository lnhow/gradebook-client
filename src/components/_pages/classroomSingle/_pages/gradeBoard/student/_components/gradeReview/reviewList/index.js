import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import {
  LoadingButton,
} from '@mui/lab';
import { useContext } from 'react';

import Loader from '../../../../../../../../_common/loader';

import { MyGradeContext } from '../../../_context/myGradeContext';

import ReviewListItem from './reviewListItem';
import { getErrorMessage } from '../../../../../../../../../helpers/error';

export default function GradeReviewList({
  loading = false,
  loadingMore = false,
  error = null,
  loadMore = () => {}
}) {
  const { reviews, isFinalPage } = useContext(MyGradeContext);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return (
      <Box sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <Typography align='center'>{`Lỗi - ${getErrorMessage(error)}`}</Typography>
      </Box>
    );
  }

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
      {isFinalPage ? (
        <Box sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Typography align='center'>Đã tới cuối danh sách</Typography>
        </Box>
      ) : (
        <Box mt={2}>
          <LoadingButton 
            loading={loadingMore}
            fullWidth
            onClick={loadMore}>
              Tải thêm
          </LoadingButton>
        </Box>
      )}
    </Box>
  )
}

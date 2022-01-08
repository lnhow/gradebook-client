import {
  Container,
  Box,
  Typography,
  // Paper
} from '@mui/material';
import GradeReviewList from './reviewList';

import GradeReviewModal from './reviewPostDialog';

import { useState, useEffect } from 'react';
import useLoadGradeReview from '../../_hooks/useLoadGradeReview';

export default function GradeReview() {
  const loadReviews = useLoadGradeReview();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadedOnce, setIsLoadedOnce] = useState(false);

  useEffect(() => {
    if (!isLoadedOnce) {
      setIsLoadedOnce(true);
      _loadReview(loadReviews, setIsLoading);
    }
  }, [loadReviews, isLoadedOnce]);

  const _loadReview = (loadReviews = () => {}, loadIndicate = () => {}) => {
    loadIndicate(true);
    loadReviews()
    .then(() => {
    })
    .catch((err) => {
      setError(err);
    })
    .finally(() => {
      loadIndicate(false);
    })
  }

  const loadMore = () => {
    _loadReview(loadReviews, setIsLoadingMore);
  }

  const refresh = () => {
    _loadReview(() => loadReviews(true), setIsLoading);
  }


  return (
    <Container maxWidth='lg'>
      <Box sx={{display: 'flex'}}>
        <Typography variant='h5' sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <b>Phúc khảo</b>
        </Typography>
        <GradeReviewModal
          onSuccess={refresh}
        />
      </Box>
      <GradeReviewList
        error={error}
        loading={isLoading}
        loadingMore={isLoadingMore}
        loadMore={loadMore}
      />
    </Container>
  )
}

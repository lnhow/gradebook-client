import { 
  DialogContent,
  Box,
  DialogActions,
  Stack,
} from '@mui/material';

import { useState, useEffect } from 'react';

import CommentList from '../commentList';
import CommentForm from '../inputBox';
import { GradeReviewCommentAPI } from '../../../../../../../../../../../../../helpers/api/client/gradeReview';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../../../../../../../../../../helpers/error';

export default function CommentContainer({
  reviewId = '',
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [comments, setComments] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const loadReview = (
    id = '', 
    page = 1,
    refresh = false, 
    add = () => {},
    setLoading = () => {},
  ) => {
    setLoading(true);
    if (refresh) {
      setIsEnd(false);
      setNextPage(1);
      setComments([]);
    }
    GradeReviewCommentAPI.listComment(id, page)
    .then((res) => {
      const additionalComments = res.data.data;
      console.log(res.data);
      if (additionalComments.length === 0) {
        setIsEnd(true);
      }
      add(additionalComments, res.data.total);
    })
    .catch((err) => {
      toast.error(`Lỗi - ${getErrorMessage(err)}`)
    })
    .finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    loadReview(reviewId, 1, true, 
      (more, total) => {
        if (more.length >= total) {
          setIsEnd(true);
        }
        setComments(more);
        setNextPage(2);
      },
      setIsLoading,
    );
  }, [reviewId]);

  const loadRefresh = () => {
    loadReview(reviewId, 1, true,
      (more, total) => {
        if (more.length >= total) {
          setIsEnd(true);
        }
        setComments(more);
        setNextPage(2);
      },
      setIsLoading,
    );
  }

  const loadMoreReview = () => {
    loadReview(
      reviewId, 
      nextPage,
      false, 
      (more, total = 0) => {
        if (comments.length + more.length >= total) {
          setIsEnd(true);
        }
        setComments([...comments, ...more]);
        setNextPage(nextPage + 1);
      },
      setIsLoadingMore
    );
  }

  return (
    <>
      <DialogContent dividers={true}>
        <Box sx={{height: '400px', overflow: 'auto'}}>
          <CommentList 
            loading={isLoading}
            loadingMore={isLoadingMore}
            comments={comments}
            loadMore={loadMoreReview}
            isEnd={isEnd}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Stack width='100%'>
          <CommentForm 
            reviewId={reviewId}
            onSubmitSuccess={loadRefresh}
          />
        </Stack>
      </DialogActions>
    </>
  )
}

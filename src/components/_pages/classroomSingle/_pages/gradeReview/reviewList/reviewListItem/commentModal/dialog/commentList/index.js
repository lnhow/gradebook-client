import { LoadingButton } from '@mui/lab';
import { 
  List,
  CircularProgress,
  Box,
} from '@mui/material';
import CommentListItem from './commentListItem';

export default function CommentList({
  comments = [],
  loading = true,
  loadingMore = false,
  loadMore = () => {},
  isEnd = false,
}) {
  if (loading) {
    return (
      <Box display='flex' justifyContent='center' mt={2}>
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <List>
      {comments.map((comment) => (
        <CommentListItem key= {comment.id} comment={comment}/>
      ))}
      {isEnd ? (
        <Box display='flex' justifyContent='center' mt={2} color='text.secondary'>
          Cuối danh sách
        </Box>
      ): (
        <LoadingButton
          fullWidth
          loading={loadingMore} 
          onClick={loadMore}
        >
          Tải thêm
        </LoadingButton>
      )}
    </List>
  )
}

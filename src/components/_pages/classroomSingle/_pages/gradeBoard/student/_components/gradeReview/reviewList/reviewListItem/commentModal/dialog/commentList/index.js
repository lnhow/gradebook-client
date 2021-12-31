import { List } from '@mui/material';
import CommentListItem from './commentListItem';

export default function CommentList({comments = []}) {
  return (
    <List>
      {comments.map((comment) => (
        <CommentListItem key= {comment.id} comment={comment}/>
      ))}
    </List>
  )
}

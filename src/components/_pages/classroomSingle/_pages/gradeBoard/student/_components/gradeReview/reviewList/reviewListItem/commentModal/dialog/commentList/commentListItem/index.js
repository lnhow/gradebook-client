import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../../../../../../../../../redux/slices/user';

import {
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import {
  styled
} from '@mui/material/styles';

import { getLocalDatetimeString } from '../../../../../../../../../../../../../../helpers/datetime';

export default function CommentListItem({comment = {}}) {
  const loginUser = useSelector(selectUser);
  const ownerName = comment.owner_id === loginUser.id ? 'Tôi' : `${comment.full_name}(Giáo viên)`;

  // console.log(comment)

  return (
    <ListItem alignItems='flex-start'>
      {/* <ListItemAvatar>
        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
      </ListItemAvatar> */}
      <ListItemText
        primary={
          <ClipTypography>
            {comment.content}
          </ClipTypography>
        }
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component='span'
              variant='caption'
              // color='text.secondary'
            >
              <b>{ownerName}</b> - 
              {comment.created_at && ` Tạo ${getLocalDatetimeString(comment.created_at)}`}
              {comment.updated_at && ` Cập nhật ${getLocalDatetimeString(comment.created_at)}`}
            </Typography>
          </>
        }
      />
    </ListItem>
  )
}

const ClipTypography = styled(Typography)(() => ({
  wordWrap: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
}));

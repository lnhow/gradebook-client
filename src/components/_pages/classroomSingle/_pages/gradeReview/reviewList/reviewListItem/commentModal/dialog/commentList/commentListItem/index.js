import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../../../../../../redux/slices/user';

import {
  ListItem,
  ListItemText,
  Box,
  Typography
} from '@mui/material';
import {
  styled
} from '@mui/material/styles';

import { getLocalDatetimeString } from '../../../../../../../../../../../helpers/datetime';

export default function CommentListItem({comment = {}}) {
  const loginUser = useSelector(selectUser);
  const ownerName = comment.owner_id === loginUser.id ? 
    `${comment.full_name} (Tôi)` : `${comment.full_name}`;

  // console.log(comment)

  return (
    <ListItem 
      alignItems='flex-start'
      sx={{
        paddingY: 0
      }}
    >
      {/* <ListItemAvatar>
        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
      </ListItemAvatar> */}      
      <ListItemText
        primary={
          <Box>
            <Typography
              variant='subtitle2'
            >
              <b>{ownerName}</b>
            </Typography>
            <ClipTypography>
              {comment.content}
            </ClipTypography>
          </Box>
        }
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component='span'
            variant='caption'
            // color='text.secondary'
          >
            {comment.created_at && `${getLocalDatetimeString(comment.created_at)}`}
            {comment.updated_at && ` Cập nhật ${getLocalDatetimeString(comment.created_at)}`}
          </Typography>
        }
      />
      {/* </Box> */}
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

import { Box, Button, IconButton, Avatar } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../redux/slices/user';

export default function OpenDrawerButton({onClick}) {
  const user = useSelector(selectUser);
  
  if (user.isLogin) {
    return (
      <Button 
        color='defaultColor'
        endIcon={
          <Avatar
            alt={user.username}
            src={user.avatar}
          >
            {/* Fallback to first letter of user's username */}
            {user.username ? user.username.charAt(0) : null}
          </Avatar>
        }
        onClick={onClick}
      >
        {/* 1 line , clip overflow text */}
        <Box sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: '100px',
          textAlign: 'right'
        }}>
          {user.username}
        </Box>
      </Button>
    )
  }

  return (
    <IconButton onClick={onClick}>
      <Avatar/>
    </IconButton>
  )
}

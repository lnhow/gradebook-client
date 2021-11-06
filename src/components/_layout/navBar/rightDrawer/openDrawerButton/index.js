import { Box, Button, IconButton, Avatar } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../redux/slices/user';

export default function OpenDrawerButton({onClick}) {
  const user = useSelector(selectUser);
  
  if (user.isLogin) {
    const fullname = user.full_name;
    return (
      <Button 
        color='defaultColor'
        endIcon={
          <Avatar
            alt={fullname}
            src={user.avatar}
          >
            {/* Fallback to first letter of user's fullname */}
            {fullname ? fullname.charAt(0) : null}
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
          {fullname}
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

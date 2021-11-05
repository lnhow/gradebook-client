import { Box, IconButton, Button, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LoginIcon from '@mui/icons-material/Login';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../redux/slices/user';
import SignOutButton from '../../../../_common/signOutButton';

const SpaceBetween = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  justifyContent: 'space-between',
}));

const AlignEnd = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  justifyContent: 'flex-end',
}));

const AlignCenter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1)
}));

export default function Header({
  toggleClose
}) {
  const user = useSelector(selectUser);
  let avatar = null;
  let username = null;

  if (user.isLogin) {
    username = user.username;
    avatar = user.avatar
  }

  return (
    <>
      <SpaceBetween>
        <IconButton onClick={toggleClose}><ChevronRightIcon/></IconButton>
        <AlignCenter>
          {/* 1 line , clip overflow text */}
          <Box mr={1} sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '120px',
            textAlign: 'right'
          }}>
            {username}
          </Box>
          <Avatar
              alt={username}
              src={avatar}
          >
            {/* Fallback to first letter of user's username */}
            {username ? username.charAt(0) : null}
          </Avatar>
        </AlignCenter>
      </SpaceBetween>
      <AlignEnd>
        {user.isLogin ? 
          <SignOutButton onAfterClicked={toggleClose}/>
          :
          <Button 
            component={Link} to='/signin'
            variant='outlined'
            startIcon={<LoginIcon/>}
          >Sign in</Button>
        }
      </AlignEnd>
    </>
  )
}

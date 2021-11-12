import { Box, Typography, Divider, IconButton, Stack } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SingleUserListItem from './singleUserListItem.js';

export default function UserListByRole({userInfosList=[], title=''}) {
  return (
    <Box>
      <Box sx={{display: 'flex'}}>
        <Typography variant='h5' sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <b>{title}</b>
        </Typography>
        <IconButton><PersonAddIcon/></IconButton>
      </Box>
      <Divider/>
      <Stack m={2} spacing={2}
        divider={<Divider light/>}
      >
        {userInfosList.map((userInfo) => (
          <SingleUserListItem key={userInfo.user_id} userInfo={userInfo}/>
        ))}
      </Stack>
    </Box>
  )
}

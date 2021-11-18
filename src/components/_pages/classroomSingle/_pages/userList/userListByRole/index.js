import { Box, Typography, Divider, Stack } from '@mui/material';

import SingleUserListItem from './singleUserListItem.js';
import InviteUserModal from '../../../../../_common/modals/inviteUserModal/index.js';

import { USER_CLASS_ROLES } from '../../../../../../helpers/constants/index.js';

export default function UserListByRole({
  userInfosList=[], role,
  showInviteControl=false, classInfo
}) {
  let roleName = '';
  switch (role) {
    case USER_CLASS_ROLES.TEACHER:
      roleName = 'Giáo viên';
      break;
    case USER_CLASS_ROLES.STUDENT:
    default:
      roleName = 'Học sinh';
      break;
  }

  return (
    <Box>
      <Box sx={{display: 'flex'}}>
        <Typography variant='h5' sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <b>{roleName}</b>
        </Typography>
        {(showInviteControl && <InviteUserModal classInfo={classInfo} role={role}/>)}
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

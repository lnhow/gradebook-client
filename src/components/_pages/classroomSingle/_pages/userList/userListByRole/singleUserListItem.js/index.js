import { Box, Typography, Avatar } from '@mui/material';
import { AlignCenter } from '../../../../../../_common/utilBoxes';

export default function SingleUserListItem({userInfo = {}}) {
  const fullname = userInfo.full_name;
  const avatar = userInfo.avatar;
  return (
    <Box display='flex' paddingX={2}>
      <Avatar
        sx={{ bgcolor: 'defaultColor' }}
        alt={fullname}
        src={avatar}
      >
        {/* Fallback to first letter of user's fullname */}
        {fullname ? fullname.charAt(0) : null}
      </Avatar>
      <AlignCenter mx={2} sx={{ flexGrow: 1}}>
        <Typography variant='body1' sx={{ flexGrow: 1}}>
          {fullname}
        </Typography>
      </AlignCenter>
    </Box>
  )
}

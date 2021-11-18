import { 
  Paper,
  Box,
} from '@mui/material';

import { 
  CreatorInfo, ClassBasicInfo, ClassDescription, UserStats 
} from './components';

export default function ClassroomDetailSummary({classroom}) {

  const usersInClass = classroom.listUser || [];
  const ownerInfo = {
    fullname: classroom.owner_name,
    avatar: classroom.owner_avatar,
    id: classroom.owner_id
  }
  const createdAt = classroom.created_at;

  return (
    <Paper>
      <Box padding={2}>
        <Box mb={1}>
          <ClassBasicInfo
            className={classroom.class_name}
            subject={classroom.subject}
          />
        </Box>
        <Box my={2}>
          <ClassDescription description={classroom.description}/>
        </Box>
        <Box display='flex' justifyContent='space-between' my={2} flexWrap='wrap'>
          <UserStats usersInClass={usersInClass}/>
          <CreatorInfo
            creator={ownerInfo}
            createdAt={createdAt}
          />
        </Box>
      </Box>
    </Paper>
  )
}

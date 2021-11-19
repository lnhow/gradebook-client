import {
  Box,
  Typography,
  Chip,
  Stack,
  Paper
} from '@mui/material';

import { USER_CLASS_ROLES } from '../../../../../../helpers/constants/index';

import { getLocalDatetimeString } from '../../../../../../helpers/datetime';
import UserDisplayItem from '../../../../../_common/userDisplayItem';

export function CreatorInfo({creator={}, createdAt}) {
  return (
    <Box my={1}>
      <Typography variant='subtitle2'>
        Tạo{createdAt ? <> vào <i>{getLocalDatetimeString(createdAt)}</i></>:null} bởi
      </Typography>
      <UserDisplayItem
        avatar={creator.avatar}
        fullname={creator.fullname}
      />
    </Box>
  )
}

export function ClassBasicInfo({className= '(Không có)', subject= '(Không có)'}) {
  return (
    <>
      <Typography variant='subtitle1'>Lớp</Typography>
      <Typography variant='h5' sx={{wordWrap: 'break-word'}}>
        <b>{className}</b>
      </Typography>
      <Typography component='div'>Môn <Chip label={<b>{subject}</b>}/></Typography>
    </>
  )
}

export function ClassDescription({description}) {
  const classDescription = description || <i>(Không có)</i>;

  return (
    <Paper variant='outlined'>
      <Box padding={2}>
        <Typography variant='body1'><b>Mô tả</b></Typography>
        <Typography variant='body1'>{classDescription}</Typography>
      </Box>
    </Paper>
  )
}

export function UserStats({usersInClass = []}) {
  const teacherUsers = usersInClass.filter(
    (teacher) => teacher.role === USER_CLASS_ROLES.TEACHER
  );
  const studentUsers = usersInClass.filter(
    (student) => student.role === USER_CLASS_ROLES.STUDENT
  );

  return (
    <Stack 
      direction='row'
      spacing={{ xs: 2, sm: 4, md: 8 }}
      my={1}
    >
      <NumberWithDecoratedLabel 
        label='Thành viên' 
        numberValue={usersInClass.length}
      />
      <NumberWithDecoratedLabel 
        label='Giáo viên' 
        numberValue={teacherUsers.length}
      />
      <NumberWithDecoratedLabel 
        label='Học sinh' 
        numberValue={studentUsers.length}
      />
    </Stack>
  )
}

function NumberWithDecoratedLabel({label, numberValue}) {
  return (
    <Box>
      <Typography>{label}</Typography>
      <Typography variant='h6'><b>{numberValue}</b></Typography>
    </Box>
  )
}

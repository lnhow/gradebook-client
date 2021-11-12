import { Container, Box } from '@mui/material';
import { useContext } from 'react';

import { USER_CLASS_ROLES } from '../../../../../helpers/constants';

import { CurrentUserInClassContext } from '../../context/currentUserInClassContext';
import UserListByRole from './userListByRole';

function ClassroomUsersPage({classroom = {}}) {
  const { isTeacher } = useContext(CurrentUserInClassContext);
  
  const usersInClass = classroom.listUser || [];

  const teacherUsers = usersInClass.filter(
    (teacher) => teacher.role === USER_CLASS_ROLES.TEACHER
  );
  const studentUsers = usersInClass.filter(
    (student) => student.role === USER_CLASS_ROLES.STUDENT
  );

  const inviteControlProps = { ...classroom };
  delete inviteControlProps.listUser;

  return (
    <Container maxWidth='md'>
      <Box mt={3}>
        <UserListByRole
          title='Giáo viên'
          userInfosList={teacherUsers}
          showInviteControl={isTeacher}
          inviteControlProps={inviteControlProps}
        />
        <UserListByRole
          title='Học sinh'
          userInfosList={studentUsers}
          showInviteControl={isTeacher}
          inviteControlProps={inviteControlProps}
        />
      {JSON.stringify(classroom)}
      <p>Is current user teacher: {`${isTeacher}`}</p>
      </Box>
    </Container>
  )
}

export default ClassroomUsersPage;

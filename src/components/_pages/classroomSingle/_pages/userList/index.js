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

  const classInfo = { ...classroom };
  delete classInfo.listUser;

  return (
    <Container maxWidth='md'>
      <Box mt={3}>
        <Box mb={8}>
          <UserListByRole
            role={USER_CLASS_ROLES.TEACHER}
            userInfosList={teacherUsers}
            showInviteControl={isTeacher}
            classInfo={classInfo}
          />
        </Box>
        <Box mb={8}>
          <UserListByRole
            role={USER_CLASS_ROLES.STUDENT}
            userInfosList={studentUsers}
            showInviteControl={isTeacher}
            classInfo={classInfo}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default ClassroomUsersPage;

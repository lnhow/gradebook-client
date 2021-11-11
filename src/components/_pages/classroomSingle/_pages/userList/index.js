import { useContext } from 'react';

import { CurrentUserInClassContext } from '../../context/currentUserInClassContext';

function ClassroomUsersPage({classroom}) {
  const { isTeacher } = useContext(CurrentUserInClassContext);

  return <div>
    <h2>Classroom users page</h2>
    {JSON.stringify(classroom)}
    <p>Is current user teacher: {`${isTeacher}`}</p>
  </div>
}

export default ClassroomUsersPage;

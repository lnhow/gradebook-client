import { 
  Switch, Route, Redirect, useRouteMatch, 
  useParams, generatePath
} from 'react-router-dom';
import { useContext } from 'react';

import ClassroomDetailPage from '../_pages/details';
import ClassroomUsersPage from '../_pages/userList';
import ClassroomGradeStructure from '../_pages/gradeStructure';
import ClassroomGradeBoard from '../_pages/gradeBoard';

import { CurrentClassContext } from '../context/currentClassContext';
import ClassroomGradeReview from '../_pages/gradeReview';

export default function ClassroomRoutes({ classroom }) {
  let { path } = useRouteMatch();
  const { class_id } = useParams();
  const alternativePath = generatePath(path, { class_id }); 

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ClassroomDetailPage classroom={classroom}/>
      </Route>
      <Route exact path={`${path}/participants`}>
        <ClassroomUsersPage classroom={classroom}/>
      </Route>
      <Route exact path={`${path}/grade`}>
        <ClassroomGradeBoard/>
      </Route>
      <TeacherOnlyRoute exact path={`${path}/grade-structure`} alternative={alternativePath}>
        <ClassroomGradeStructure/>
      </TeacherOnlyRoute>
      <TeacherOnlyRoute exact path={`${path}/grade-review`} alternative={alternativePath}>
        <ClassroomGradeReview/>
      </TeacherOnlyRoute>
      <Route>
        <Redirect to='/notfound'/>
      </Route>
    </Switch>
  )
}

function TeacherOnlyRoute({path, exact = true, alternative, children}) {
  const { isTeacher } = useContext(CurrentClassContext);

  return (
    <Route path={path} exact={exact}>
      {isTeacher ? children : <Redirect to={alternative}/>}
    </Route>
  )
}

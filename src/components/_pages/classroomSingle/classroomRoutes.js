import { 
  Switch, Route, useRouteMatch
} from 'react-router-dom';

import ClassroomDetailPage from './_pages/details';
import ClassroomUsersPage from './_pages/userList';

export default function ClassroomRoutes({ classroom }) {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ClassroomDetailPage classroom={classroom}/>
      </Route>
      <Route exact path={`${path}/participants`}>
        <ClassroomUsersPage classroom={classroom}/>
      </Route>
    </Switch>
  )
}

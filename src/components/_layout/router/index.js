import ClassroomList from '../../_pages/classroomList';
import { Route, Switch } from 'react-router-dom';
import NotFoundPage from '../../_pages/notfound';
import SignInPage from '../../_pages/signin';
import SignUpPage from '../../_pages/signup';
import AuthOnlyRoute from './customRoute/authOnlyRoute';
import NonAuthOnlyRoute from './customRoute/nonAuthOnlyRoute';

function Router() {
  return (
    <Switch>
      <AuthOnlyRoute exact path='/'>
        <ClassroomList/>
      </AuthOnlyRoute>
      <NonAuthOnlyRoute exact path='/signin'>
        <SignInPage/>
      </NonAuthOnlyRoute>
      <NonAuthOnlyRoute exact path='/signup'>
        <SignUpPage/>
      </NonAuthOnlyRoute>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  )
}

export default Router;

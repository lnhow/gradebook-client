import { Route, Switch } from 'react-router-dom';
import AuthOnlyRoute from './customRoute/authOnlyRoute';
import NonAuthOnlyRoute from './customRoute/nonAuthOnlyRoute';

// Pages
import NotFoundPage from '../../_pages/notfound';
import ClassroomList from '../../_pages/classroomList';
import ClassroomSinglePage from '../../_pages/classroomSingle';
import SignInPage from '../../_pages/signin';
import SignUpPage from '../../_pages/signup';
import ProfilePage from '../../_pages/profile';
import JoinPage from '../../_pages/join';
import AccountActivationPage from '../../_pages/activation';
import PasswordForgotPage from '../../_pages/passwordForgot';
import PasswordResetPage from '../../_pages/passwordReset';

// Pages

function Router() {
  return (
    <Switch>
      <AuthOnlyRoute exact path='/'>
        <ClassroomList/>
      </AuthOnlyRoute>
      <AuthOnlyRoute path='/class/:class_id'>
        <ClassroomSinglePage/>
      </AuthOnlyRoute>
      <AuthOnlyRoute path='/join'>
        <JoinPage/>
      </AuthOnlyRoute>
      <NonAuthOnlyRoute exact path='/signin'>
        <SignInPage/>
      </NonAuthOnlyRoute>
      <NonAuthOnlyRoute exact path='/signup'>
        <SignUpPage/>
      </NonAuthOnlyRoute>
      <NonAuthOnlyRoute exact path='/activation'>
        <AccountActivationPage/>
      </NonAuthOnlyRoute>
      <NonAuthOnlyRoute exact path='/password/forgot'>
        <PasswordForgotPage/>
      </NonAuthOnlyRoute>
      <NonAuthOnlyRoute exact path='/password/reset'>
        <PasswordResetPage/>
      </NonAuthOnlyRoute>
      <AuthOnlyRoute exact path='/profile'>
        <ProfilePage/>
      </AuthOnlyRoute>
      <Route exact path='/notfound'>
        <NotFoundPage/>
      </Route>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  )
}

export default Router;

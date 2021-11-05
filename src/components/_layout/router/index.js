import ClassroomList from "../../_pages/classroomList";
import { Route, Switch } from 'react-router-dom';
import NotFoundPage from "../../_pages/notfound";
import SignInPage from "../../_pages/signin";
import AuthOnlyRoute from "./customRoute/authOnlyRoute";
import NonAuthOnlyRoute from "./customRoute/nonAuthOnlyRoute";

function Router() {
  return (
    <Switch>
      <AuthOnlyRoute exact path='/'>
        <ClassroomList/>
      </AuthOnlyRoute>
      <NonAuthOnlyRoute exact path='/signin'>
        <SignInPage/>
      </NonAuthOnlyRoute>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  )
}

export default Router;

import React from "react";

import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";

import AccountPage from "./components/accountPage";
import CreateTask from "./components/createTask";
import EditTask from "./components/editTask";
import EditUser from "./components/editUser";
import ForgotPassword from "./components/forgotPassword";
import Dashboard from "./components/dashboard";
import Header from "./components/header";
import LoginPage from "./components/loginPage";
import ResetPassword from "./components/resetPassword";
import Signup from "./components/signup";
import NotFoundPage from "./components/notFoundPage";
import UpdatePassword from "./components/updatePassword";

import { TaskProvider } from "./context/task-context";
import { UserProvider } from "././context/user-context";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import useCheckAuthenticated from "./hooks/useCheckAuthenticated";

export const history = createBrowserHistory();

function App() {
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  const { user, loading } = useCheckAuthenticated();
  if (loading) return <p>Loading...</p>;
  return (
    <Router history={history}>
      <>
        <UserProvider value={user}>
          <TaskProvider>
            <Header />
            <Switch>
              <PublicRoute exact path="/" component={LoginPage} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/create" component={CreateTask} />
              <PrivateRoute path="/edit/:id" component={EditTask} />
              <PrivateRoute path="/editMe" component={EditUser} />
              <PrivateRoute path="/updatePassword" component={UpdatePassword} />
              <PrivateRoute path="/myAccount" component={AccountPage} />
              <PublicRoute exact path="/signup" component={Signup} />
              <PublicRoute path="/forgotPassword" component={ForgotPassword} />
              <PublicRoute
                path="/resetPassword/:token"
                component={ResetPassword}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </TaskProvider>
        </UserProvider>
      </>
    </Router>
  );
}

export default App;

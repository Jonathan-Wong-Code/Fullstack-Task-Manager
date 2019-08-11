import React, { useEffect } from "react";
import axios from "axios";

import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import ResetPassword from "./components/ResetPassword";
import Signup from "./components/Signup";
import NotFoundPage from "./components/NotFoundPage";
import UpdatePassword from "./components/UpdatePassword";

import { TaskProvider } from "./context/task-context";
import { useAuthDispatch, useAuthState } from "./context/auth-context";
import { LOGIN_SUCCESS, AUTH_ERROR } from "./context/types";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const history = createBrowserHistory();

function App() {
  const authDispatch = useAuthDispatch();
  const { error, user } = useAuthState();
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "http://localhost:3000/api/v1/users/checkLoggedIn",
          withCredentials: true
        });

        if (response.data.user) {
          authDispatch({ type: LOGIN_SUCCESS, user: response.data.user });
        }
      } catch (error) {
        authDispatch({ type: AUTH_ERROR, error: error.response.data.message });
      }
    };
    checkLoggedIn();
  }, [authDispatch]);

  if (!user && !error) return <div />;
  return (
    <Router history={history}>
      <>
        <TaskProvider>
          <Header />
          <Switch>
            <PublicRoute exact path="/" component={LoginPage} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create" component={CreateTask} />
            <PrivateRoute path="/edit/:id" component={EditTask} />
            <PrivateRoute path="/updatePassword" component={UpdatePassword} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute path="/forgotPassword" component={ForgotPassword} />
            <PublicRoute
              path="/resetPassword/:token"
              component={ResetPassword}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </TaskProvider>
      </>
    </Router>
  );
}

export default App;

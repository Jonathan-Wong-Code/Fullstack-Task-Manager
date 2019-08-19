import React, { useEffect, useState } from "react";
import axios from "axios";

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
import { useUserDispatch } from "./context/user-context";
import { useAuthDispatch } from "./context/auth-context";
import { LOGIN_SUCCESS, LOGOUT } from "./context/types";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

export const history = createBrowserHistory();

function App() {
  const [loading, setLoading] = useState(true);
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

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
          userDispatch({
            type: LOGIN_SUCCESS,
            user: response.data.user
          });

          setLoading(false);
        }
      } catch (error) {
        authDispatch({ type: LOGOUT, error: error.response.data.message });
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, [authDispatch, userDispatch]);

  if (loading) return <p>Loading...</p>;
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
      </>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
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
import { useAuthDispatch } from "./context/auth-context";
import { LOGIN_SUCCESS, LOGOUT } from "./context/types";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const history = createBrowserHistory();

function App() {
  const [loading, setLoading] = useState(true);
  const authDispatch = useAuthDispatch();
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
          setLoading(false);
        }
      } catch (error) {
        authDispatch({ type: LOGOUT, error: error.response.data.message });
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, [authDispatch]);

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

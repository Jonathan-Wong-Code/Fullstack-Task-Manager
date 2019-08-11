import React, { useEffect } from "react";
import axios from "axios";

import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import NotFoundPage from "./components/NotFoundPage";
import { TaskProvider } from "./context/task-context";
import { useAuthDispatch } from "./context/auth-context";
import { LOGIN_SUCCESS } from "./context/types";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const history = createBrowserHistory();

function App() {
  const authDispatch = useAuthDispatch();
  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/users/checkLoggedIn",
        withCredentials: true
      });

      if (response.data.user) {
        authDispatch({ type: LOGIN_SUCCESS, user: response.data.user });
      }
    };
    checkLoggedIn();
  }, [authDispatch]);

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
            <PublicRoute path="/signup" component={Signup} />
            <Route component={NotFoundPage} />
          </Switch>
        </TaskProvider>
      </>
    </Router>
  );
}

export default App;

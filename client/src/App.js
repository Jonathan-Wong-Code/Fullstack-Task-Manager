import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import { TaskProvider } from "./context/task-context";
import { useAuthDispatch } from "./context/auth-context";

import axios from "axios";
import { LOGIN_SUCCESS } from "./context/types";

const history = createBrowserHistory();

function App() {
  const dispatch = useAuthDispatch();
  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/users/checkLoggedIn",
        withCredentials: true
      });
      if (response) {
        dispatch({ type: LOGIN_SUCCESS, user: response.data.user });
      }
    };
    checkLoggedIn();
  }, [dispatch]);
  return (
    <Router history={history}>
      <>
        <TaskProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create" component={CreateTask} />
            <Route path="/edit/:id" component={EditTask} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </TaskProvider>
      </>
    </Router>
  );
}

export default App;

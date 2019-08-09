import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import { TaskProvider } from "./context/task-context";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <>
        <Header />
        <TaskProvider>
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

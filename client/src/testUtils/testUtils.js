import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { UserProvider } from "./../context/user-context";
import { AuthProvider } from "./../context/auth-context";
import { TaskProvider } from "./../context/task-context";
import React from "react";
export const renderRouter = (
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    ...options
  }
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>, options),
    history
  };
};

export function renderWithContextRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    authValue,
    userValue,
    taskValue,
    ...options
  }
) {
  return {
    ...render(
      <AuthProvider value={authValue}>
        <UserProvider value={userValue}>
          <TaskProvider value={taskValue}>
            <Router history={history}>{ui}</Router>
          </TaskProvider>
        </UserProvider>
      </AuthProvider>,
      options
    ),
    history
  };
}

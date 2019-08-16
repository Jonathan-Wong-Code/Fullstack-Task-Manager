import React from "react";
import { UserProvider } from "./../context/user-context";
import { AuthProvider } from "./../context/auth-context";
import { TaskProvider } from "./../context/task-context";

function TestProvider({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <TaskProvider>{children}</TaskProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default TestProvider;

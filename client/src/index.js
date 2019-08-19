import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { UserProvider } from "././context/user-context";
ReactDOM.render(
  <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AuthProvider>,
  document.getElementById("root")
);

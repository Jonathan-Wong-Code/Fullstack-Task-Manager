import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "./../context/auth-context";

function PublicRoute({ component: Component, ...rest }) {
  const { user } = useAuthState();
  return (
    <Route
      {...rest}
      component={props =>
        user ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
}
export default PublicRoute;

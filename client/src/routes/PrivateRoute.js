import React, { useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "./../context/auth-context";

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuthState();
  return (
    <Route
      {...rest}
      component={props =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
export default PrivateRoute;

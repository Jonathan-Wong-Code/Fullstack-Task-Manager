import React, { useReducer } from "react";
import { useAuthState, useAuthDispatch } from "../../context/auth-context";
import { resetPassword } from "../../async-helpers/auth";
import reducer from "../../reducers/stateReducer";

function ResetPassword({ match }) {
  const [{ password, confirmPassword }, setState] = useReducer(reducer, {
    password: "",
    confirmPassword: ""
  });

  const dispatch = useAuthDispatch();
  const { error } = useAuthState();

  const handleSubmit = async e => {
    e.preventDefault();
    await resetPassword(
      dispatch,
      password,
      confirmPassword,
      match.params.token
    );
    setState({
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <div>
      <h2>Reset password</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="reset-password">Enter Password</label>
        <input
          type="text"
          id="reset-password"
          value={password}
          onChange={e => setState({ password: e.target.value })}
        />
        <label htmlFor="reset-confirm-password">Confirm Password</label>
        <input
          type="text"
          id="reset-confirm-password"
          value={confirmPassword}
          onChange={e => setState({ confirmPassword: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default ResetPassword;

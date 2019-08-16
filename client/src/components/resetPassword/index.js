import React, { useReducer } from "react";
import { useAuthDispatch } from "../../context/auth-context";
import { resetPassword } from "../../async-helpers/auth";
import reducer from "../../reducers/stateReducer";

function ResetPassword({ match }) {
  const [{ password, confirmPassword, error }, setState] = useReducer(reducer, {
    password: "",
    confirmPassword: "",
    error: ""
  });

  const dispatch = useAuthDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const message = await resetPassword(
      dispatch,
      password,
      confirmPassword,
      match.params.token
    );

    if (message) {
      setState({
        password: "",
        confirmPassword: "",
        error: message
      });
    }
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

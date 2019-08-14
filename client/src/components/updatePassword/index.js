import React, { useReducer } from "react";
import { useAuthState, useAuthDispatch } from "../../context/auth-context";
import { updatePassword } from "../../async-helpers/auth";
import reducer from "../../reducers/stateReducer";

function UpdatePassword() {
  const [
    { password, updatedPassword, confirmUpdatedPassword, successMessage },
    setState
  ] = useReducer(reducer, {
    password: "",
    updatedPassword: "",
    confirmUpdatedPassword: "",
    successMessage: ""
  });

  const dispatch = useAuthDispatch();
  const { error } = useAuthState();

  const handleSubmit = async e => {
    e.preventDefault();
    const message = await updatePassword(
      dispatch,
      password,
      updatedPassword,
      confirmUpdatedPassword
    );

    setState({
      successMessage: message,
      password: "",
      confirmUpdatedPassword: "",
      updatedPassword: ""
    });
  };

  return (
    <div>
      <h2>Update password</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="update-password">Enter Current Password</label>
        <input
          type="text"
          id="update-password"
          value={password}
          onChange={e => setState({ password: e.target.value })}
        />

        <label htmlFor="update-new-password">Enter New Password</label>
        <input
          type="text"
          id="update-new-password"
          value={updatedPassword}
          onChange={e => setState({ updatedPassword: e.target.value })}
        />

        <label htmlFor="update-confirm-updated-password">
          Confirm Updated Password
        </label>
        <input
          type="text"
          id="update-confirm-updated-password"
          value={confirmUpdatedPassword}
          onChange={e => setState({ confirmUpdatedPassword: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {error && !successMessage && <p>{error}</p>}
    </div>
  );
}

export default UpdatePassword;

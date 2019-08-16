import React, { useReducer } from "react";
import { updatePassword } from "../../async-helpers/auth";
import reducer from "../../reducers/stateReducer";

function UpdatePassword() {
  const [
    { password, updatedPassword, confirmUpdatedPassword, message },
    setState
  ] = useReducer(reducer, {
    password: "",
    updatedPassword: "",
    confirmUpdatedPassword: "",
    message: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const message = await updatePassword(
      password,
      updatedPassword,
      confirmUpdatedPassword
    );

    setState({
      message: message,
      password: "",
      confirmUpdatedPassword: "",
      updatedPassword: ""
    });
  };

  return (
    <div>
      <h2>Update password</h2>
      <form action="" onSubmit={handleSubmit} data-testid="update-pass-form">
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
      {message && <p data-testid="update-pass-message">{message}</p>}
    </div>
  );
}

export default UpdatePassword;

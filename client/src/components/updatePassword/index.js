import React from "react";
import { updatePassword } from "../../async-helpers/auth";
import useSafeDispatch from "./../../hooks/useSafeDispatch";

function UpdatePassword() {
  const [
    { password, updatedPassword, confirmUpdatedPassword, message, loading },
    setSafeState
  ] = useSafeDispatch({
    password: "",
    updatedPassword: "",
    confirmUpdatedPassword: "",
    message: "",
    loading: false
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setSafeState({ message: "" });

    const message = await updatePassword(
      password,
      updatedPassword,
      confirmUpdatedPassword,
      setSafeState
    );

    setSafeState({
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
          onChange={e => setSafeState({ password: e.target.value })}
        />

        <label htmlFor="update-new-password">Enter New Password</label>
        <input
          type="text"
          id="update-new-password"
          value={updatedPassword}
          onChange={e => setSafeState({ updatedPassword: e.target.value })}
        />

        <label htmlFor="update-confirm-updated-password">
          Confirm Updated Password
        </label>
        <input
          type="text"
          id="update-confirm-updated-password"
          value={confirmUpdatedPassword}
          onChange={e =>
            setSafeState({ confirmUpdatedPassword: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Updating...</p>}
      {message && <p data-testid="update-pass-message">{message}</p>}
    </div>
  );
}

export default UpdatePassword;

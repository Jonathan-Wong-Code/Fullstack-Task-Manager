import React, { useState } from "react";
import { useAuthState, useAuthDispatch } from "../../context/auth-context";
import { sendResetToken } from "../../async-helpers/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState();
  const dispatch = useAuthDispatch();
  const { error } = useAuthState();

  const handleSubmit = async e => {
    e.preventDefault();
    const message = await sendResetToken(email, dispatch);
    setSuccessMessage(message);
    setEmail("");
  };

  return (
    <div>
      <h2>Forgot your password?</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="reset-email">
          Enter your email to receive a reset link!
        </label>
        <input
          type="email"
          id="reset-email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default ForgotPassword;

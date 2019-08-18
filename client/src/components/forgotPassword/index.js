import React from "react";
import { sendResetToken } from "../../async-helpers/auth";
import useSafeDispatch from "./../../hooks/useSafeDispatch";

function ForgotPassword() {
  const [{ email, message, loading }, setSafeState] = useSafeDispatch({
    email: "",
    message: "",
    loading: false
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const message = await sendResetToken(email, setSafeState);
    setSafeState({ email: "", message });
  };

  return (
    <section>
      <h2>Forgot your password?</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="reset-email">
          Enter your email to receive a reset link!
        </label>
        <input
          type="email"
          id="reset-email"
          value={email}
          onChange={e => setSafeState({ email: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      {loading && <p>Sending email...</p>}
    </section>
  );
}

export default ForgotPassword;

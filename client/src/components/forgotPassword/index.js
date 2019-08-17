import React, { useReducer } from "react";
import { useAuthDispatch } from "../../context/auth-context";
import { sendResetToken } from "../../async-helpers/auth";
import reducer from "./../../reducers/stateReducer";

function ForgotPassword() {
  const [{ email, message }, setState] = useReducer(reducer, {
    email: "",
    message: ""
  });

  const dispatch = useAuthDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const message = await sendResetToken(email, dispatch);
    setState({ email: "", message });
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
          onChange={e => setState({ email })}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
}

export default ForgotPassword;

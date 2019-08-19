import React from "react";
import { useAuthDispatch } from "../../context/auth-context";
import useSafeDispatch from "./../../hooks/useSafeDispatch";
import { signupUser } from "../../async-helpers/auth";

function Signup() {
  const dispatch = useAuthDispatch();
  const [
    { name, email, password, confirmPassword, error, loading },
    setSafeState
  ] = useSafeDispatch({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    loading: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const error = await signupUser(dispatch, setSafeState, {
      name,
      email,
      password,
      confirmPassword
    });

    if (error) {
      setSafeState({ error });
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} data-testid="signup-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setSafeState({ name: e.target.value })}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setSafeState({ email: e.target.value })}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={e => setSafeState({ password: e.target.value })}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="text"
          id="confirmPassword"
          value={confirmPassword}
          onChange={e => setSafeState({ confirmPassword: e.target.value })}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p data-testid="signup-error">{error}</p>}
      {loading && <p>Signing up...</p>}
    </div>
  );
}
export default Signup;

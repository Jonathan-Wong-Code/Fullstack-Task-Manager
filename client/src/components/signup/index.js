import React, { useReducer } from "react";
import { useAuthDispatch } from "../../context/auth-context";
import { signupUser } from "../../async-helpers/auth";
import reducer from "../../reducers/stateReducer";

function Signup() {
  const dispatch = useAuthDispatch();
  const [
    { name, email, password, confirmPassword, error },
    setState
  ] = useReducer(reducer, {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const error = await signupUser(dispatch, {
      name,
      email,
      password,
      confirmPassword
    });

    if (error) {
      setState({ error });
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setState({ name: e.target.value })}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setState({ email: e.target.value })}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={e => setState({ password: e.target.value })}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="text"
          id="confirmPassword"
          value={confirmPassword}
          onChange={e => setState({ confirmPassword: e.target.value })}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
export default Signup;

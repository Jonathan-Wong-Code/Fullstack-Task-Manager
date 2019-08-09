import React, { useReducer } from "react";
import {
  useAuthDispatch,
  useAuthState,
  signupUser
} from "./../context/auth-context";

const reducer = (state, newState) => {
  return { ...state, ...newState };
};

function Signup() {
  const dispatch = useAuthDispatch();
  const { error } = useAuthState();
  const [{ name, email, password, confirmPassword }, setState] = useReducer(
    reducer,
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  );

  const handleSubmit = e => {
    e.preventDefault();
    signupUser(dispatch, {
      name,
      email,
      password,
      confirmPassword
    });
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
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setState({ email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={e => setState({ password: e.target.value })}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="text"
          id="confirmPassword"
          value={confirmPassword}
          onChange={e => setState({ confirmPassword: e.target.value })}
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
export default Signup;

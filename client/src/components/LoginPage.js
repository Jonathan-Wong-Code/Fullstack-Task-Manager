import React, { useReducer } from "react";
import {
  useAuthDispatch,
  loginUser,
  useAuthState
} from "../context/auth-context";

const reducer = (state, newState) => {
  return { ...state, ...newState };
};

function LoginPage() {
  const [{ email, password }, setState] = useReducer(reducer, {
    email: "",
    password: ""
  });

  const { error } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    await loginUser(dispatch, email, password);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
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
        <button>Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;

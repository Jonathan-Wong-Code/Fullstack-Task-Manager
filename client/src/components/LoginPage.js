import React, { useReducer } from "react";
import { loginUser } from "./../async-helpers/auth";
import { useAuthDispatch, useAuthState } from "../context/auth-context";
import { useTaskDispatch } from "./../context/task-context";
const reducer = (state, newState) => {
  return { ...state, ...newState };
};

function LoginPage() {
  const [{ email, password }, setState] = useReducer(reducer, {
    email: "",
    password: ""
  });

  const { error } = useAuthState();
  const authDispatch = useAuthDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    await loginUser(authDispatch, email, password, useTaskDispatch);
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
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;

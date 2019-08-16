import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../async-helpers/auth";
import { useAuthDispatch } from "../../context/auth-context";
import { useUserDispatch } from "../../context/user-context";
import reducer from "../../reducers/stateReducer";

function LoginPage() {
  const [{ email, password, error }, setState] = useReducer(reducer, {
    email: "",
    password: "",
    error: ""
  });

  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const message = await loginUser(
      authDispatch,
      userDispatch,
      email,
      password
    );
    if (message) {
      setState({ error: message });
    }
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
        <button type="submit">Login</button>
      </form>
      <Link to="/forgotPassword">Forgot your password?</Link>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;

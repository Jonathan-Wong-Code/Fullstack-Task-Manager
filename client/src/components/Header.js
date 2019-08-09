import React from "react";
import { Link } from "react-router-dom";
import {
  useAuthState,
  logoutUser,
  useAuthDispatch
} from "../context/auth-context";

function Header() {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  console.log(user);
  return (
    <div>
      <h1>TASK MANAGER APP!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
          {!user && (
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          )}
          {user && (
            <li>
              <button onClick={() => logoutUser(dispatch)}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;

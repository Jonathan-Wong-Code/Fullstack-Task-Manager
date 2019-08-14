import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../async-helpers/auth";
import { useAuthState, useAuthDispatch } from "../../context/auth-context";
import { useTaskDispatch } from "../../context/task-context";

function Header() {
  const { user } = useAuthState();
  const authDispatch = useAuthDispatch();
  const taskDispatch = useTaskDispatch();

  const handleLogoutClick = () => {
    logoutUser(authDispatch, taskDispatch);
  };

  return (
    <div>
      <h1>TASK MANAGER APP!</h1>
      <nav>
        <ul>
          {user && (
            <>
              <li>
                <Link
                  to={{ pathname: "/dashboard", search: "?page=1&perPage=5" }}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/">Login</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/updatePassword">Update Password</Link>
              </li>
              <li>
                <button onClick={handleLogoutClick}>Logout</button>
              </li>
            </>
          )}
        </ul>
        <div>
          {user && (
            <>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;

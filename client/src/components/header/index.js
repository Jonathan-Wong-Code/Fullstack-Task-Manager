import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../async-helpers/auth";
import { useAuthDispatch, useAuthState } from "../../context/auth-context";
import { useTaskDispatch } from "../../context/task-context";
import { useUserState, useUserDispatch } from "../../context/user-context";

function Header() {
  const { user } = useUserState();
  const { user: authUser } = useAuthState();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const taskDispatch = useTaskDispatch();

  const handleLogoutClick = () => {
    logoutUser(authDispatch, taskDispatch, userDispatch);
  };

  return (
    <header>
      <h1>TASK MANAGER APP!</h1>
      <nav>
        <ul>
          {authUser && (
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

          {!authUser && (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/">Login</Link>
              </li>
            </>
          )}
          {authUser && (
            <>
              <li>
                <Link to="/myAccount">My Account</Link>
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
    </header>
  );
}

export default Header;

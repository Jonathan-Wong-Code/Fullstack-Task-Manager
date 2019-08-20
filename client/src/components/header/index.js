import React from "react";
import { logoutUser } from "../../async-helpers/auth";
import { useAuthDispatch, useAuthState } from "../../context/auth-context";
import { useTaskDispatch } from "../../context/task-context";
import { useUserState, useUserDispatch } from "../../context/user-context";

import {
  HeaderSection,
  Wrapper,
  H1,
  Nav,
  NavList,
  NavListItem,
  NavLink
} from "./css";

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
    <HeaderSection>
      <Wrapper>
        <H1>TASK MANAGER APP!</H1>
        <Nav>
          {/* <UserInfo>
            {user && (
              <>
                <h3 data-testid="header-name">{user.name}</h3>
                <p data-testid="header-email">{user.email}</p>
              </>
            )}
          </UserInfo> */}
          <NavList>
            {authUser && (
              <>
                <NavListItem>
                  <NavLink
                    to={{
                      pathname: "/dashboard",
                      search: "?page=1&perPage=5"
                    }}
                  >
                    Dashboard
                  </NavLink>
                </NavListItem>
                <NavListItem>
                  <NavLink to="/create">Create</NavLink>
                </NavListItem>
              </>
            )}

            {!authUser && (
              <>
                <NavListItem>
                  <NavLink to="/signup">Signup</NavLink>
                </NavListItem>
                <NavListItem>
                  <NavLink to="/">Login</NavLink>
                </NavListItem>
              </>
            )}
            {authUser && (
              <>
                <NavListItem>
                  <NavLink to="/myAccount">My Account</NavLink>
                </NavListItem>
                <NavListItem>
                  <NavLink onClick={handleLogoutClick}>Logout</NavLink>
                </NavListItem>
              </>
            )}
          </NavList>
        </Nav>
      </Wrapper>
    </HeaderSection>
  );
}

export default Header;

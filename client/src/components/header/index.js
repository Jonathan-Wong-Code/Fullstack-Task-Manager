import React, { useRef } from "react";
import { logoutUser } from "../../async-helpers/auth";
import { useAuthDispatch, useAuthState } from "../../context/auth-context";
import { useTaskDispatch } from "../../context/task-context";
import { useUserDispatch } from "../../context/user-context";

import {
  HeaderSection,
  Wrapper,
  H1,
  Nav,
  NavList,
  NavListItem,
  NavLink,
  Logout,
  Hamburger,
  HamburgerIcon,
  Checkbox
} from "./css";

function Header() {
  const checkbox = useRef();

  const { user: authUser } = useAuthState();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const taskDispatch = useTaskDispatch();

  const handleLogoutClick = () => {
    logoutUser(authDispatch, taskDispatch, userDispatch);
  };

  return (
    <HeaderSection>
      <Checkbox type="checkbox" id="mobile" name="mobile-menu" ref={checkbox} />
      <Hamburger htmlFor="mobile">
        <HamburgerIcon />
      </Hamburger>
      <Wrapper>
        <H1>TASK MANAGER</H1>
        <Nav>
          <NavList>
            {authUser && (
              <>
                <NavListItem onClick={() => (checkbox.current.checked = false)}>
                  <NavLink
                    to={{
                      pathname: "/dashboard",
                      search: "?page=1&perPage=5"
                    }}
                  >
                    Dashboard
                  </NavLink>
                </NavListItem>
                <NavListItem onClick={() => (checkbox.current.checked = false)}>
                  <NavLink to="/create">Create</NavLink>
                </NavListItem>
              </>
            )}

            {!authUser && (
              <>
                <NavListItem onClick={() => (checkbox.current.checked = false)}>
                  <NavLink to="/signup">Signup</NavLink>
                </NavListItem>
                <NavListItem onClick={() => (checkbox.current.checked = false)}>
                  <NavLink to="/">Login</NavLink>
                </NavListItem>
              </>
            )}
            {authUser && (
              <>
                <NavListItem>
                  <NavLink
                    to="/myAccount"
                    onClick={() => (checkbox.current.checked = false)}
                  >
                    My Account
                  </NavLink>
                </NavListItem>
                <NavListItem onClick={() => (checkbox.current.checked = false)}>
                  <Logout onClick={handleLogoutClick}>Logout</Logout>
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

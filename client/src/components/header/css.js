import styled from "styled-components";
import { colors } from "./../../themes/constants";
import { Link } from "react-router-dom";

export const HeaderSection = styled.header`
  padding: 1rem;
  width: 100%;
  background: ${colors.BLUE};
  color: ${colors.WHITE};
`;

export const Wrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const H1 = styled.h1`
  font-size: 4rem;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

export const NavListItem = styled.li`
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

export const NavLink = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.WHITE};
`;

export const Logout = styled.button`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.WHITE};
  background: none;
  border: none;
  cursor: pointer;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

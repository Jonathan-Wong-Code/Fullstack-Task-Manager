import styled from "styled-components";
import { colors, breakPoints } from "./../../themes/constants";
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
  font-size: 3rem;
`;

export const Nav = styled.nav`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
  @media (min-width: ${breakPoints.large}) {
    position: relative;
    height: auto;
    width: auto;
    background: none;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  margin: auto;
  display: flex;
  flex-direction: column;
  transform: translateY(-10%);
  font-size: 4rem;

  @media (min-width: ${breakPoints.large}) {
    align-items: center;
    flex-direction: row;
    margin: 0;
    transform: translateY(0);
    font-size: 2rem;
  }
`;

export const NavListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  @media (min-width: ${breakPoints.large}) {
    &:not(:last-child) {
      margin-right: 2rem;
      margin-bottom: 0;
    }
  }
`;

export const NavLink = styled(Link)`
  font-weight: 700;
  color: ${colors.WHITE};
`;

export const Logout = styled.button`
  font-size: 4rem;
  font-weight: 700;
  color: ${colors.WHITE};
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: ${breakPoints.large}) {
    font-size: 2rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

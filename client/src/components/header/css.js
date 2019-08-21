import styled from "styled-components";
import { colors, breakPoints } from "./../../themes/constants";
import { Link } from "react-router-dom";

export const HeaderSection = styled.header`
  padding: 1rem;
  width: 100%;
  background: ${colors.BLUE};
  color: ${colors.WHITE};
  position: relative;
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
  padding: 2rem;
  @media (min-width: ${breakPoints.large}) {
    font-size: 5rem;
  }
`;

export const Nav = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  transition: 0.3s all;
  background: none;
  transform: scale(0);

  @media (min-width: ${breakPoints.large}) {
    position: relative;
    height: auto;
    width: auto;
    background: none;
    transform: scale(1);
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
    font-size: 3rem;
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
    font-size: 3rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Hamburger = styled.label`
  height: 60px;
  width: 60px;
  display: block;
  border: 2px solid ${colors.WHITE};
  border-radius: 50%;
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 50;
  display: flex;
  background: ${colors.BLUE};
  cursor: pointer;

  @media (min-width: ${breakPoints.large}) {
    display: none;
  }
`;

export const HamburgerIcon = styled.span`
  display: block;
  width: 40px;
  height: 2px;
  background: ${colors.WHITE};
  margin: auto;
  z-index: 50;
  transition: 0.2s all;
  ::before,
  ::after {
    display: block;
    content: "";
    width: 40px;
    height: 2px;
    background: ${colors.WHITE};
  }

  ::before {
    transform: translateY(-10px);
  }

  ::after {
    transform: translateY(10px);
  }
`;

export const Checkbox = styled.input`
  position: absolute;
  display: none;

  &:checked ~ div nav {
    display: flex;
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1);
  }

  &:checked + label span::after {
    width: 2px;
    height: 40px;
    transform: translateY(0);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -18px;
  }

  &:checked + label span::before {
    display: none;
  }

  &:checked + label span {
    position: relative;
  }
`;

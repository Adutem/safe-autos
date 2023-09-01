import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../data/nav-data";

const Navbar = () => {
  return (
    <NavBar>
      <NavBarContentContainer>
        <LinkList>
          {routes.map((route) => {
            if (route.type === "normal") {
              return <NormalNavItem {...route} />;
            }
            return <ComposedNavItem {...route} />;
          })}
        </LinkList>
      </NavBarContentContainer>
    </NavBar>
  );
};

const NavBar = styled.nav`
  background: var(--gray);

  @media (max-width: 928px) {
    display: none;
  }
`;

const NavBarContentContainer = styled.div`
  width: 90%;
  margin: auto;
`;

const LinkList = styled.ul`
  text-transform: uppercase;
  display: flex;
`;

const MainListItem = styled.li`
  flex: 1;
  white-space: nowrap;
  flex-basis: min-content;
`;

const MainLinkItem = styled(Link)`
  padding: 1rem;
  display: inline-block;
  width: 100%;
  color: #fff;
  font-weight: 600;
  font-family: var(--teko);
  font-size: 1.2rem;
  transition: 0.4s ease;
  text-align: center;

  &:hover {
    background: var(--primary-color);
  }
`;

const ComposedListItem = styled(MainListItem)`
  // overflow: hidden;
  position: relative;

  &:hover {
    .sub-routes {
      display: flex;
    }
  }
`;

const ComposedList = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  width: auto;
  min-width: 100%;
  position: absolute;
  // bottom: 0;
  top: 100%;
  background: var(--gray);
  display: none;
  z-index: 100;
`;

const ComposedLinkItem = styled(MainLinkItem)`
  background: transparent;
  &:hover {
    background: transparent;
    color: var(--primary-color);
  }
`;

const NormalNavItem = ({ name, path }) => (
  <MainListItem>
    <MainLinkItem to={path}>{name}</MainLinkItem>
  </MainListItem>
);

const ComposedNavItem = ({ name, routePath, subRoutes }) => (
  <ComposedListItem>
    <MainLinkItem to={routePath}>{name}</MainLinkItem>
    <ComposedList className="sub-routes">
      {subRoutes.map((route) => (
        <ComposedLinkItem to={`${routePath}${route.path}`}>
          {route.name}
        </ComposedLinkItem>
      ))}
    </ComposedList>
  </ComposedListItem>
);
export default Navbar;

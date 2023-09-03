import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../data/nav-data";

const Navbar = () => {
  const navbarRef = useRef(null);

  const hideNavbar = () => {
    navbarRef?.current.classList.remove("show");
  };

  return (
    <NavBar id="nav-bar" ref={navbarRef}>
      <Underlay onClick={hideNavbar} className="underlay" />
      <NavBarContentContainer>
        <LinkList>
          {routes.map((route) => {
            if (route.type === "normal") {
              return <NormalNavItem {...route} hideNavbar={hideNavbar} />;
            }
            return <ComposedNavItem {...route} hideNavbar={hideNavbar} />;
          })}
        </LinkList>
      </NavBarContentContainer>
    </NavBar>
  );
};

const NavBar = styled.nav`
  background: var(--gray);

  @media (max-width: 928px) {
    background: transparent;
    position: fixed;
    left: -100%;
    bottom: 0;
    top: 0;
    width: 100%;
    z-index: 1000;
    transition: 0.3s ease;

    &.show {
      display: block;
      left: 0;
    }

    .underlay {
      display: block;
    }

    ul {
      flex-direction: column;

      .sub-routes {
        position: relative;
        background: gray;
      }
    }

    a {
      text-align: left;
      padding: 1rem 2rem;
      border-bottom: 1px solid var(--white);
    }
  }
`;

const NavBarContentContainer = styled.div`
  width: 90%;
  margin: auto;

  @media (max-width: 928px) {
    width: 90%;
    max-width: 400px;
    background: var(--gray);
    margin: initial;
    height: 100%;
  }
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

const Underlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: -1;
  cursor: pointer;
  display: none;
`;

const NormalNavItem = ({ name, path, hideNavbar }) => (
  <MainListItem>
    <MainLinkItem to={path} onClick={hideNavbar}>
      {name}
    </MainLinkItem>
  </MainListItem>
);

const ComposedNavItem = ({ name, routePath, subRoutes, hideNavbar }) => (
  <ComposedListItem>
    <MainLinkItem to={routePath}>{name}</MainLinkItem>
    <ComposedList className="sub-routes">
      {subRoutes.map((route) => (
        <ComposedLinkItem to={`${routePath}${route.path}`} onClick={hideNavbar}>
          {route.name}
        </ComposedLinkItem>
      ))}
    </ComposedList>
  </ComposedListItem>
);
export default Navbar;

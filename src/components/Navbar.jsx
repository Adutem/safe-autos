import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../data/nav-data";
import { handleWindowScroll } from "./SmallScreenNav";
import { useGlobalContext } from "../contexts/GlobalContext";

const Navbar = () => {
  const navbarRef = useRef(null);
  const { windowWidth } = useGlobalContext();

  const hideNavbar = () => {
    navbarRef?.current.classList.remove("show");
    document.body.style.overflow = "initial";
  };

  const toggleStoreComponent = () => {
    handleWindowScroll("#store-container", ["#nav-bar", "#location-comp"]);
    document.querySelector("#store-container")?.classList.toggle("show");
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
          {windowWidth > 928 && (
            <MyStoreButton onClick={toggleStoreComponent}>
              {" "}
              <i className="fi fi-ss-marker"></i>My Store
            </MyStoreButton>
          )}
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
      border-bottom: 1px solid rgba(var(--white-rgb), 0.2);

      @media (max-width: 400px) {
        padding: 1rem;
      }
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
  gap: 1rem;
  align-items: center;
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

  i {
    height: 25px;
    display: none;
  }

  @media (max-width: 928px) {
    display: flex;
    i {
      display: flex;
    }
  }

  @media (max-width: 792px) {
    font-family: var(--mont);
    font-size: 0.85rem;

    i {
      height: initial;
    }
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

  // @media (max-width: 928px) {
  //   background: rgba(var(--primary-rgb), 0.7);
  // }
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

export const MyStoreButton = styled.button`
  border: none;
  outline: none;
  background: none;
  color: #fff;
  font-weight: 600;
  font-family: var(--teko);
  font-size: 1.2rem;
  transition: 0.4s ease;
  text-transform: uppercase;
  cursor: pointer;
  padding: 1rem;

  i {
    color: yellow;
    display: inline-block;
    margin-right: 0.3rem;
    font-size: 1rem;
  }

  ${(props) =>
    props.noHoverEffect || "&:hover { background: var(--primary-color);}"}
`;

const NormalNavItem = ({ name, path, hideNavbar, icon, external }) => (
  <MainListItem>
    {external ? (
      <a href={path} target="_blank" rel="noopener noreferrer" onClick={hideNavbar}>
        {icon}
        {name}
      </a>
    ) : (
      <MainLinkItem to={path} onClick={hideNavbar}>
        {icon}
        {name}
      </MainLinkItem>
    )}
  </MainListItem>
);

const ComposedNavItem = ({ name, routePath, subRoutes, hideNavbar, icon }) => (
  <ComposedListItem>
    <MainLinkItem to={routePath}>
      {icon}
      {name}
    </MainLinkItem>
    <ComposedList className="sub-routes">
      {subRoutes.map((route) => (
        <ComposedLinkItem
          as={route.external ? "a" : Link}
          href={route.external ? route.path : undefined}
          to={route.external ? undefined : `${routePath}${route.path}`}
          target={route.external ? "_blank" : undefined}
          rel={route.external ? "noopener noreferrer" : undefined}
          onClick={hideNavbar}
        >
          {route.icon}
          {route.name}
        </ComposedLinkItem>
      ))}
    </ComposedList>
  </ComposedListItem>
);


export default Navbar;

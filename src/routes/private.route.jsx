import React, { useState, useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux";
import styled from "styled-components";

const routes = [
  {
    name: "Home",
    Icon: <i className="fi fi-sr-house-crack"></i>,
    path: "/admin",
  },
  {
    name: "Career",
    Icon: <i className="fi fi-sr-briefcase"></i>,
    path: "/admin/career",
  },
  {
    name: "About",
    Icon: <i className="fi fi-sr-info"></i>,
    path: "/admin/about",
  },
  {
    name: "Review",
    Icon: <i className="fi fi-sr-circle-star"></i>,
    path: "/admin/review",
  },
];

const PrivateRoute = () => {
  const { userData, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    dispatch(getUser(() => setLoader(false)));
  }, [location]);

  if (loader) return <h2>Loading...</h2>;

  return userData ? (
    <>
      <PrivateLayoutContainer>
        <SideNav>
          {routes.map((route) => (
            <LinkItem to={route.path}>
              {route.Icon} <span>{route.name}</span>
            </LinkItem>
          ))}
        </SideNav>
        <Outlet />
      </PrivateLayoutContainer>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

const SideNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0.6rem;
  background: #f2f2f2;
`;

const PrivateLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  min-height: calc(100vh - 59px);
  height: 100%;
  grid-template-rows: 1fr;

  @media (max-width: 928px) {
    min-height: calc(100vh - 91px);
  }
`;

const LinkItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.4rem;
  padding: 0.8rem;
  gap: 0.3rem;
  background-color: var(--white);
  transition: 0.4s ease;

  span {
    font-weight: 600;
    font-family: var(--mont);
    font-size: 0.7rem;
    color: var(--primary-color);
    transition: 0.4s ease;
  }

  i {
    font-size: 1.7rem;
    color: var(--primary-color);
    transition: 0.4s ease;
  }

  &:hover {
    background-color: var(--primary-color);

    span,
    i {
      color: var(--white);
    }
  }
`;

export default PrivateRoute;

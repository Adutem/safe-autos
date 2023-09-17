import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ROUTES = [
  {
    path: "/tires",
    name: "Shop for Tires",
    Icon: <i className="fi fi-rr-tire"></i>,
  },
  {
    path: "/services",
    name: "Auto Repairs",
    Icon: <i className="fi fi-rr-car-mechanic"></i>,
  },
  {
    path: "/financing",
    name: "Financing Options",
    Icon: <i className="fi fi-rr-credit-card"></i>,
  },
  {
    path: "/coupons",
    name: "Coupons + Rebates",
    Icon: <i className="fi fi-sr-sack-dollar"></i>,
  },
];

const BoxNav = () => {
  return (
    <BoxNavContainer>
      <NavContentContainer>
        <NavList>
          {ROUTES.map(({ name, path, Icon }) => (
            <ListItem>
              <LinkItem to={path}>
                {Icon}
                {name}
              </LinkItem>
            </ListItem>
          ))}
        </NavList>
      </NavContentContainer>
    </BoxNavContainer>
  );
};

const BoxNavContainer = styled.nav``;
const NavContentContainer = styled.div``;
const NavList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
  padding: 0.8rem;

  @media (max-width: 928px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ListItem = styled.li`
  min-width: min-content;
  background: var(--gray);
  //   flex: 1;
  font-family: var(--teko);
`;

const LinkItem = styled(Link)`
  display: inline-block;
  width: 100%;
  text-align: center;
  color: var(--white);
  transition: 0.4s ease;
  padding: 1.2rem 2rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  i {
    color: var(--white);
    height: 25px;
  }

  &:hover {
    background: var(--primary-color);
  }
`;

export default BoxNav;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../data/nav-data";
import { MyStoreButton } from "./Navbar";

export const handleWindowScroll = (id, others) => {
  if (document.querySelector(id).classList.contains("show")) {
    document.body.style.overflow = "initial";
  } else {
    document.body.style.overflow = "hidden";
    others.forEach((other) => {
      let el = document.querySelector(other);
      if (el.classList.contains("show")) el.classList.remove("show");
    });
  }
};

const SmallScreenNav = () => {
  const toggleNav = () => {
    handleWindowScroll("#nav-bar", ["#location-comp", "#store-container"]);
    document.querySelector("#nav-bar")?.classList.toggle("show");
  };

  const toggleLocationComponent = () => {
    handleWindowScroll("#location-comp", ["#nav-bar"]);
    document.querySelector("#location-comp")?.classList.toggle("show");
  };

  const toggleStoreComponent = () => {
    handleWindowScroll("#store-container", ["#nav-bar", "#location-comp"]);
    document.querySelector("#store-container")?.classList.toggle("show");
  };

  return (
    <NavContainer>
      <NavContentContainer>
        <ToggleNavButton onClick={toggleNav}>
          <i className="fi fi-br-menu-burger"></i>
        </ToggleNavButton>
        <MyStoreButton
          onClick={toggleStoreComponent}
          style={{ color: "#000" }}
          noHoverEffect
        >
          {" "}
          <i
            className="fi fi-ss-marker"
            style={{ color: "var(--primary-color)" }}
          ></i>
          My Store
        </MyStoreButton>
        <Aside>
          <ToggleLocationButton onClick={toggleLocationComponent}>
            <i className="fi fi-ss-marker"></i>
          </ToggleLocationButton>
          <TelLink href="tel:+248-693-7979">
            <i className="fi fi-sr-phone-flip"></i>
          </TelLink>
        </Aside>
      </NavContentContainer>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: none;
  @media (max-width: 928px) {
    display: block;
  }
`;

const NavContentContainer = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

const ToggleNavButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 2rem;
  background: transparent;
  color: var(--black);

  i {
    display: flex;
    align-items: center;
  }
`;

const ToggleLocationButton = styled(ToggleNavButton)``;

const TelLink = styled.a`
  color: var(--black);
  font-size: 2rem;

  i {
    display: flex;
    align-items: center;
  }
`;

const Aside = styled.aside`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
export default SmallScreenNav;

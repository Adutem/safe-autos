import React from "react";
import styled from "styled-components";
import heroImage from "../assets/acorn-logo.png";
import tireImage from "../assets/image-3.jpg";

const HomeHero = () => {
  return (
    <>
      <HeroContainer>
        <HeroImageContainer>
          <HeroImage src={heroImage} />
        </HeroImageContainer>
      </HeroContainer>
      {/* <HeroContainer style={{ background: "red" }} /> */}
    </>
  );
};

const HeroContainer = styled.div`
  min-height: 400px;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${tireImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  position: relative;

  & > * {
    position: relative;
    z-index: 10;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.3),
      rgba(0, 0, 0, 0.4)
    );
    z-index: 0;
  }
`;

const HeroImageContainer = styled.div`
  max-height: 400px;
  width: 90%;
  max-width: 450px;
`;
const HeroImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export default HomeHero;

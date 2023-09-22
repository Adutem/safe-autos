import React from "react";
import styled from "styled-components";
import heroImage from "../assets/Autos-lastest-logo.png";
// import heroImage from "../assets/acorn-logo.png";
import tireImage from "../assets/image-3.jpg";
import heroVideo from "../assets/acorn-video.mp4";

const HomeHero = () => {
  return (
    <>
      <HeroContainer>
        <HeroImageContainer>
          <HeroImage src={heroImage} />
        </HeroImageContainer>
        <HeroVideoContainer src={heroVideo} autoPlay={true} loop muted />
      </HeroContainer>
      {/* <HeroContainer style={{ background: "red" }} /> */}
    </>
  );
};

const HeroContainer = styled.div`
  // min-height: 400px;
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  // // background: url(${tireImage});
  // background-size: cover;
  // background-repeat: no-repeat;
  // background-position: center;
  // background-attachment: fixed;
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
    width: 100%;
    height: 100%;
    // background: linear-gradient(
    //   to right,
    //   rgba(255, 255, 255, 0.3),
    //   rgba(0, 0, 0, 0.4)
    // );
    background: linear-gradient(
      to right,
      rgb(51 51 51 / 32%),
      rgb(18 13 13 / 79%)
    );
    z-index: 20;
  }
`;

const HeroImageContainer = styled.div`
  max-height: 400px;
  width: 90%;
  max-width: 450px;
  position: absolute;
  left: 50%;
  z-index: 25;
  transform: translateX(-50%);
`;
const HeroImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const HeroVideoContainer = styled.video`
  // height: 100%;
  width: 100%;
  object-fit: cover;
  max-height: 700px;
`;

export default HomeHero;

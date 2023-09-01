import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import rightBackground from "../assets/tire-2.jpg";
import leftBackground from "../assets/tire-3.jpg";
import { ButtonLink, RelativeGradientContainer } from "./reusables/Styles";

const Advert = () => {
  return (
    <AdvertContainer>
      <AdvertContentContainer>
        <LeftContainer>
          <Heading>Browse Our Tires</Heading>
        </LeftContainer>
        <RightContainer>
          <Div>
            <Heading>Services You Can Trust</Heading>
            <ParaText>
              When you need convenient auto service or tire service from a shop
              you can trust, it’s time to visit your friends at Fred's Brake and
              Alignment . Our expert technicians work hard, so you can be in and
              out of our shop in a jiffy. See us for your automotive and tire
              needs today!
            </ParaText>
          </Div>
          <ButtonLink>View Repair</ButtonLink>
        </RightContainer>
      </AdvertContentContainer>
    </AdvertContainer>
  );
};

const AdvertContainer = styled.div``;

const AdvertContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: min(500px, 80vw);
  grid-auto-rows: min(500px, 80vw);
  gap: 0.8rem;
  padding: 0 0.8rem;
  font-family: var(--teko);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: 500px;
    grid-auto-rows: 500px;
  }
`;

const Container = styled(RelativeGradientContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: lightgray;
  padding: 1rem;
`;

const LeftContainer = styled(Container)``;
const RightContainer = styled(Container)`
  justify-content: space-around;
  background: url(${rightBackground});
  background-repeat: no-repeat;
`;

const Heading = styled.h2`
  text-transform: uppercase;
  color: var(--gray);
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: var(--white);
`;

const ParaText = styled.p`
  font-size: 1.1rem;
  text-align: center;
  max-width: 300px;
  margin-top: 2rem;
  color: var(--white);
`;

const Div = styled.div``;

export default Advert;

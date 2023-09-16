import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/image-5.jpg";
import { FormButton } from "../components/reusables/Styles";

export default function Tires() {
  return (
    <TiresPageContainer>
      <ContainerX
        style={{
          background: "rgba(var(--white-rgb), 0.4)",
          backdropFilter: "blur(4px)",
        }}
      >
        <OptimizedFormButton
          to={
            "https://www.midas.com/store/mi/rochester/746-south-rochester-48307/tires?shopnum=6112&v=lookup#tire-shop-modes"
          }
          target="_blank"
        >
          Browse your vehicle data here{" "}
          <i className="fi fi-sr-arrow-up-right-from-square"></i>
        </OptimizedFormButton>
      </ContainerX>
      {/* <Heading>No tire to display at the moment</Heading> */}
    </TiresPageContainer>
  );
}

const TiresPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  padding: 1rem;
  margin: 1rem 0;
`;

const Heading = styled.h2`
  font-family: var(--teko);
  text-align: center;
`;

const ContainerX = styled.div`
  flex: 1;
  width: 100%;
  // height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

const OptimizedFormButton = styled(FormButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  i {
    display: flex;

    @media (max-width: 270px) {
      display: none;
    }
  }
`;

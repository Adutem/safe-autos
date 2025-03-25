import React, { useState, useRef } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/image-5.jpg";
import { SearchComponent } from "../components/Advert";
import { useGlobalContext } from "../contexts/GlobalContext";

const Financing = () => {
  const { currentStoreLocation, displayLocationModal } = useGlobalContext();

  return (
    <FinancingPageContainer>
      <SearchComponent
        showShowModal={displayLocationModal}
        currentLocation={currentStoreLocation}
        linkType={"financingLink"}
        dropdownText={"select store location"}
        linkText={"Checkout available Financing"}
      />
      {/* <Heading>No tire to display at the moment</Heading> */}
    </FinancingPageContainer>
  );
};

const FinancingPageContainer = styled.div`
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

export default Financing;

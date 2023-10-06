import React, { useState, useRef } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/image-5.jpg";
import { SearchComponent } from "../components/Advert";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Tires() {
  const { currentStoreLocation, displayLocationModal } = useGlobalContext();

  const handleInputChange = (e) => {
    setCurrentLocation(e.target.value);
  };
  return (
    <TiresPageContainer>
      <SearchComponent
        showShowModal={displayLocationModal}
        currentLocation={currentStoreLocation}
        linkType={"link"}
      />
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

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/image-5.jpg";
import { FormButton } from "../components/reusables/Styles";
import { SearchComponent } from "../components/Advert";
import { LocationModal } from "./ScheduleService";
import serviceLocations from "../data/service-location-data";

export default function Tires() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    () => serviceLocations[0]
  );
  const portalRef = useRef(null);

  const hideShowModal = (e) => {
    e && e.preventDefault();
    setShowLocationModal(false);
    document.body.style.overflow = "initial";
  };
  const showShowModal = (e) => {
    e && e.preventDefault();
    setShowLocationModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleInputChange = (e) => {
    setCurrentLocation(e.target.value);
  };
  return (
    <TiresPageContainer>
      <SearchComponent
        showShowModal={showShowModal}
        currentLocation={currentLocation}
      />
      {showLocationModal && (
        <LocationModal
          portalRef={portalRef}
          hideShowModal={hideShowModal}
          handleInputChange={handleInputChange}
        />
      )}
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

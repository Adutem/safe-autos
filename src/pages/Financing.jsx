import React, { useState, useRef } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/image-5.jpg";
import { SearchComponent } from "../components/Advert";
import { LocationModal } from "./ScheduleService";
import serviceLocations from "../data/service-location-data";

const Financing = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
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
    <FinancingPageContainer>
      <SearchComponent
        showShowModal={showShowModal}
        currentLocation={currentLocation}
        linkType={"financingLink"}
        dropdownText={"click to change location"}
        linkText={"Checkout available Financing"}
      />
      {showLocationModal && (
        <LocationModal
          portalRef={portalRef}
          hideShowModal={hideShowModal}
          handleInputChange={handleInputChange}
        />
      )}
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

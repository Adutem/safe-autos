import React, { useState, useRef } from "react";
import styled from "styled-components";
import { NormalPara, SectionPara } from "./reusables/Styles";
import hoursOfOperation, {
  fullHoursOfOperation,
} from "../data/hours-of-operation";
import serviceLocations from "../data/service-location-data";
import { useGlobalContext } from "../contexts/GlobalContext";
import { SearchComponent } from "./Advert";
import { LocationModal } from "../pages/ScheduleService";

const MyStore = () => {
  const hideMyStore = () => {
    document.querySelector("#store-container")?.classList.remove("show");
    document.body.style.overflow = "initial";
  };
  const { currentStoreLocation, setCurrentStoreLocation } = useGlobalContext();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const portalRef = useRef(null);

  const showShowModal = (e) => {
    e && e.preventDefault();
    setShowLocationModal(true);
    document.body.style.overflow = "hidden";
  };

  const hideShowModal = (e) => {
    e && e.preventDefault();
    setShowLocationModal(false);
    document.body.style.overflow = "initial";
  };

  const handleServiceLocationChange = (e) => {
    setCurrentStoreLocation(e.target.value);
    hideMyStore();
  };

  return (
    <StoreCompContainer id="store-container">
      <Underlay onClick={hideMyStore} className="underlay" />
      <StoreCompContContainer>
        <SearchComponent
          showShowModal={showShowModal}
          currentLocation={currentStoreLocation}
          style={{ marginTop: "1.5rem" }}
          linkType={"link"}
          dropdownText={"Click to change store location"}
        />
        <Seperator />
        <SectionPara>Store Hours</SectionPara>
        <ContainerDiv>
          {fullHoursOfOperation.map((hop) => (
            <NormalPara
              style={{
                margin: "0.5rem 0",
                fontSize: "0.75rem",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                //   justifyContent: "space-between",
              }}
            >
              <strong>{hop.date}</strong>
              {hop.hours.join(" - ")}
            </NormalPara>
          ))}
        </ContainerDiv>
      </StoreCompContContainer>
      {showLocationModal && (
        <LocationModal
          portalRef={portalRef}
          hideShowModal={hideShowModal}
          handleInputChange={handleServiceLocationChange}
        />
      )}
    </StoreCompContainer>
  );
};

const StoreCompContContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background: var(--white);
  position: relative;
  z-index: 4;
  padding: 1rem;
  // margin-left: auto;
  // margin-top: 60px;
`;

const StoreCompContainer = styled.div`
  border-top: 1px solid var(--gray);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: none;

  &.show {
    display: flex;
  }
`;

const AddressComp = styled.address`
  font-family: var(--mont);
  font-size: 0.75rem;
`;

const TelLink = styled.a`
  color: var(--black);
  font-family: var(--mont);
  font-size: 0.75rem;
  text-decoration: underline;
  color: var(--primary-color);
  font-weight: bold;

  i {
    display: flex;
    align-items: center;
  }
`;

const Seperator = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(var(--gray-rgb), 0.2);
  margin: 1rem auto;
`;

const ContainerDiv = styled.div`
  //   margin: 1rem 0 1.5rem;
`;

const Underlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: -1;
  cursor: pointer;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
export default MyStore;

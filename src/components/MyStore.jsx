import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, NormalPara, SectionPara } from "./reusables/Styles";
import hoursOfOperation, {
  fullHoursOfOperation,
} from "../data/hours-of-operation";
import serviceLocations from "../data/service-location-data";
import { useGlobalContext } from "../contexts/GlobalContext";
import { SearchComponent } from "./Advert";
import { LocationModal } from "../pages/ScheduleService";

const MyStore = () => {
  const [isNearbyStoresVisible, setIsNearbyStoresVisible] = useState(false);
  const [nearestStore, setNearestStore] = useState(null);

  const hideMyStore = () => {
    document.querySelector("#store-container")?.classList.remove("show");
    document.body.style.overflow = "initial";
  };

  const { currentStoreLocation, displayLocationModal, allStores, nearbyStores } = useGlobalContext();

  useEffect(() => {
    hideMyStore();
    // Fetch nearest store details
    fetchNearestStore();
  }, [currentStoreLocation]);

  const fetchNearestStore = async () => {
    try {
      const response = await fetch('/api/nearest-store');
      const data = await response.json();
      setNearestStore(data.nearestStore);
    } catch (error) {
      console.error('Error fetching nearest store:', error);
    }
  };

  return (
    <>
      <StoreCompContainer id="store-container">
        <Underlay onClick={hideMyStore} className="underlay" />
        <StoreCompContContainer>
          {/* ✅ Dynamic Heading */}
          <SectionPara>{isNearbyStoresVisible ? "Stores Nearby" : "All Stores"}</SectionPara>

          <SearchComponent
            showShowModal={displayLocationModal}
            currentLocation={currentStoreLocation}
            style={{ marginTop: "1rem" }}
            linkType={"link"}
            dropdownText={"Select Store Location"}
            storeOptions={
              isNearbyStoresVisible
                ? nearbyStores.length > 0
                  ? nearbyStores // ✅ Show nearby stores if available
                  : [] // ❌ Pass empty list if no nearby stores
                : allStores // ✅ Show all stores when "All Stores" is selected
            }
            hideBrowseLink={!currentStoreLocation}
            disabled={isNearbyStoresVisible && nearbyStores.length === 0} // ✅ Disable dropdown if no nearby stores
          />

          <Seperator />

          {!isNearbyStoresVisible ? (
            // ✅ Main Store List View
            <>
              {currentStoreLocation && (
                <>
                  <SectionPara>Store Hours</SectionPara>
                  <ContainerDiv>
                    {fullHoursOfOperation.map((hop) => (
                      <NormalPara
                        key={hop.date}
                        style={{
                          margin: "0.5rem 0",
                          fontSize: "0.75rem",
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                        }}
                      >
                        <strong>{hop.date}</strong>
                        {hop.hours.join(" - ")}
                      </NormalPara>
                    ))}
                  </ContainerDiv>
                </>
              )}
              <Button onClick={() => setIsNearbyStoresVisible(true)}>Show Nearby Stores</Button>
            </>
          ) : (
            // ✅ Nearby Stores View
            <>
              <ContainerDiv>
                {nearestStore && (
                  <NormalPara
                    key={nearestStore.id}
                    onClick={() => {
                      setCurrentStoreLocation(nearestStore);
                      setIsNearbyStoresVisible(false);
                    }}
                    style={{
                      margin: "0.5rem 0",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                    }}
                  >
                    <strong>{nearestStore.shopLocation}</strong>
                    <span>{nearestStore.address}</span>
                    <span>{nearestStore.phoneNumber}</span>
                    <a href={nearestStore.link} target="_blank" rel="noopener noreferrer">Visit Store</a>
                    <a href={nearestStore.couponLink} target="_blank" rel="noopener noreferrer">Coupons</a>
                    <a href={nearestStore.financingLink} target="_blank" rel="noopener noreferrer">Financing</a>
                    <a href={nearestStore.facebookLink} target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href={nearestStore.mapLink} target="_blank" rel="noopener noreferrer">Map</a>
                  </NormalPara>
                  
                )}
                {nearbyStores.length > 0 ? (
                  nearbyStores.map((store) => (
                    <NormalPara
                      key={store.id}
                      onClick={() => {
                        setCurrentStoreLocation(store);
                        setIsNearbyStoresVisible(false);
                      }}
                      style={{
                        margin: "0.5rem 0",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                      }}
                    >
                      <strong>{store.shopLocation}</strong>
                      <span>{store.address}</span>
                      <span>{store.phone}</span>
                      <a href={store.link} target="_blank" rel="noopener noreferrer">Visit Store</a>
                      <a href={store.couponLink} target="_blank" rel="noopener noreferrer">Coupons</a>
                      <a href={store.financingLink} target="_blank" rel="noopener noreferrer">Financing</a>
                      <a href={store.facebookLink} target="_blank" rel="noopener noreferrer">Facebook</a>
                      <a href={store.mapLink} target="_blank" rel="noopener noreferrer">Map</a>
                    </NormalPara>
                  ))
                ) : (
                  <NormalPara>No nearby stores found.</NormalPara>
                )}
              </ContainerDiv>
              <Button onClick={() => setIsNearbyStoresVisible(false)}>Back to All Stores</Button>
            </>
          )}
        </StoreCompContContainer>
      </StoreCompContainer>
    </>
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
  padding-bottom: 3rem;
  overflow: auto;
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
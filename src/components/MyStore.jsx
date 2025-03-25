import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, NormalPara, SectionPara } from "./reusables/Styles";
import hoursOfOperation, {
  fullHoursOfOperation,
} from "../data/hours-of-operation";
import { useGlobalContext } from "../contexts/GlobalContext";
import { SearchComponent } from "./Advert";
import { LocationModal, LocationCard } from "../pages/ScheduleService";
import StoreDetails from "./StoreDetails";

const MyStore = () => {
  const [isNearbyStoresVisible, setIsNearbyStoresVisible] = useState(false);
  const [nearestStore, setNearestStore] = useState(null);
  const { currentStoreLocation, displayLocationModal, nearbyStores, setCurrentStoreLocation } = useGlobalContext();
  const [allStores, setAllStores] = useState([]);

  const hideMyStore = () => {
    document.querySelector("#store-container")?.classList.remove("show");
    document.body.style.overflow = "initial";
  };

  useEffect(() => {
    hideMyStore();
    // Fetch all stores
    const fetchStores = async () => {
      const stores = await fetchStores();
      setAllStores(stores);
    };
    fetchStores();
    setNearestStore(nearbyStores[0]); // Set the nearest store
  }, [currentStoreLocation]);


  return (
    <>
      <StoreCompContainer id="store-container">
        <Underlay onClick={hideMyStore} className="underlay" />
        <StoreCompContContainer>
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
                  ? nearbyStores
                  : []
                : allStores
            }
            hideBrowseLink={!currentStoreLocation}
            disabled={isNearbyStoresVisible && nearbyStores.length === 0}
          />

          <Seperator />

          {!isNearbyStoresVisible ? (
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
            <>
              <ContainerDiv>
                {/* {nearestStore && (
                  <LocationCard
                    shopLocation={nearestStore.shopLocation}
                    phoneNumber={nearestStore.phoneNumber}
                    email={nearestStore.email}
                    link={nearestStore?.link}
                    couponLink={nearestStore?.couponLink}
                    financingLink={nearestStore?.financingLink}
                    onClick={() => {
                      setCurrentStoreLocation(nearestStore);
                      setIsNearbyStoresVisible(false);
                    }}
                  />
                )} */}
                {nearbyStores.length > 0 ? (
                  nearbyStores.map((store) => (
                    <LocationCard
                      key={store.id}
                      shopLocation={store.shopLocation}
                      phoneNumber={store.phoneNumber}
                      email={store.email}
                      link={store.link}
                      couponLink={store.couponLink}
                      financingLink={store.financingLink}
                      onClick={() => {
                        setCurrentStoreLocation(store);
                        setIsNearbyStoresVisible(false);
                      }}
                    />
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

const Seperator = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(var(--gray-rgb), 0.2);
  margin: 1rem auto;
`;

const ContainerDiv = styled.div``;

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

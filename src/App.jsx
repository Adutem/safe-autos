import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Alert from "./components/Alert";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import SmallScreenNav from "./components/SmallScreenNav";
import RoutesComponent from "./routes/Routes.jsx";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "./contexts/GlobalContext";
import LocationComp from "./components/LocationComp";
import MyStore from "./components/MyStore";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHoliday, getReview, getNews } from "./redux";
import { LocationModal } from "./pages/ScheduleService";
import { getAboutPageContent } from "./redux/aboutPage/aboutPageActions";

const App = () => {
  const {
    windowWidth,
    showLocationModal,
    setCurrentStoreLocation,
    hideLocationModal,
    currentStoreLocation,
  } = useGlobalContext();
  const { holidayData } = useSelector((state) => state.holiday);
  const dispatch = useDispatch();
  const portalRef = useRef(null);

  const handleStoreLocationChange = (e) => {
    setCurrentStoreLocation(e.target.value);
  };

  useEffect(() => {
    if (currentStoreLocation) {
      dispatch(getHoliday(currentStoreLocation?.shopLocation));
      dispatch(getReview(currentStoreLocation?.shopLocation));
      dispatch(getNews(currentStoreLocation?.shopLocation));
    }
  }, [currentStoreLocation]);

  useEffect(() => {
    dispatch(getAboutPageContent());
  }, []);

  const location = useLocation();
  useEffect(() => {
    location.pathname.startsWith("/admin") ||
      toast.info(
        windowWidth < 770
          ? "NOTE: Choose the store neareast to you using the MY STORE Button Above"
          : "NOTE: Choose the store neareast to you using the MY STORE Button in the top right color",
        {
          toastId: "asdkflaf",
          autoClose: 3000,
          position: windowWidth < 770 ? "bottom-center" : "top-center",
        }
      );
  }, []);

  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function() {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/67e0923fa07298190e41f4b8/1in2jmimn';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  const handleLiveChatClick = () => {
    // Logic to open live chat
    Tawk_API.maximize();
  };

  return (
    <AppContainer>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={2}
      />
      <SmallScreenNav />
      <LocationComp />
      <MyStore />
      {Date.now() < new Date(holidayData?.holidayDate).getTime() && (
        <Alert holidayText={holidayData?.holidayText} />
      )}
      <Navbar />
      <HomeHero
        isHomepage={location.pathname === "/"}
        isAdmin={location.pathname.startsWith("/admin")}
      />
      <RoutesComponent />
      {location.pathname.startsWith("/admin") || <Footer />}
      {/* {showSearch && windowWidth >= 792 && <SearchTireIframe />} */}
      {showLocationModal && (
        <LocationModal
          handleInputChange={handleStoreLocationChange}
          portalRef={portalRef}
          hideShowModal={hideLocationModal}
        />
      )}
      <FloatingButton onClick={handleLiveChatClick}>💬</FloatingButton>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  height: 100%;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color:rgba(0, 123, 255, 0);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export default App;

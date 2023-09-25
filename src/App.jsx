import React, { useEffect, useState } from "react";
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
import { getHoliday } from "./redux";

const App = () => {
  const { windowWidth } = useGlobalContext();
  const { holidayData } = useSelector((state) => state.holiday);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!holidayData) dispatch(getHoliday());
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
    </AppContainer>
  );
};

const AppContainer = styled.div`
  height: 100%;
`;
export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import SmallScreenNav from "./components/SmallScreenNav";
import RoutesComponent from "./routes/Routes.jsx";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "./contexts/GlobalContext";
import SearchTireIframe from "./components/SearchTireIframe";

const App = () => {
  const { showSearch, windowWidth } = useGlobalContext();

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
        theme="light"
        limit={2}
      />
      <SmallScreenNav />
      <Alert />
      <Navbar />
      <HomeHero />
      <RoutesComponent />
      <Footer />
      {/* {showSearch && windowWidth >= 792 && <SearchTireIframe />} */}
    </AppContainer>
  );
};

const AppContainer = styled.div``;
export default App;

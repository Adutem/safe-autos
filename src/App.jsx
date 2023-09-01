import React from "react";
import "./App.css";
import Alert from "./components/Alert";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import SmallScreenNav from "./components/SmallScreenNav";
import RoutesComponent from "./routes/Routes.jsx";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";

const App = () => {
  return (
    <AppContainer>
      <SmallScreenNav />
      <Alert />
      <Navbar />
      <HomeHero />
      <RoutesComponent />
      <Footer />
    </AppContainer>
  );
};

const AppContainer = styled.div``;
export default App;

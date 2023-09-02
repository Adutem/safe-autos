import React from "react";
import styled from "styled-components";
import BoxNav from "../components/BoxNav";
import Advert from "../components/Advert";
import GetYourTire, {
  AdditionalOffer,
  GetAQuote,
} from "../components/GetYourTire";
import AboutSection from "../components/AboutSection";

const Home = () => {
  return (
    <HomeContainer>
      <BoxNav />
      <Advert />
      <GetYourTire />
      <GetAQuote />
      <AdditionalOffer />
      <AboutSection />
    </HomeContainer>
  );
};

const HomeContainer = styled.div``;

export default Home;

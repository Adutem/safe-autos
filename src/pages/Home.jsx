import React from "react";
import styled from "styled-components";
import HomeHero from "../components/HomeHero";
import BoxNav from "../components/BoxNav";
import Advert from "../components/Advert";
import { SectionHeading, SectionPara } from "../components/reusables/Styles";
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

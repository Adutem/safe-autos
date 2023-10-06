import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ButtonLink, SectionPara } from "./reusables/Styles";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import categories from "../data/service-cat";
import { OptimizedContainer } from "../pages/ServiceCat";

const ServiceCard = ({ name: serviceName, imgUrl }) => {
  const { parseName, handleInViewPort } = useGlobalContext();
  const filterId = parseName(serviceName);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const cardContainerRef = useRef(null);

  const navigateQuoting = (e) => {
    e.preventDefault();
    navigate("/tires/quoting", { state: { serviceName } });
  };

  const navigateSchedule = (e) => {
    e.preventDefault();
    navigate("/services/schedule-service", { state: { serviceName } });
  };

  useEffect(() => {
    const match = categories.find((cat) => cat.name === parseName(serviceName));
    // console.log(match);
    if (match) {
      const parser = new DOMParser();
      const htmlPage = parser.parseFromString(match.innerHTML, "text/html");
      let content = htmlPage.body.querySelector("body > p:first-of-type");
      //   console.log(htmlPage);
      if (!content || !content.innerHTML) {
        content = htmlPage.body.querySelector("body > div:nth-child(2)");
      }
      // console.log(content.innerHTML.split("."));
      // containerRef.current.innerHTML = `${content?.innerHTML.slice(0, 100)}...`;
      containerRef.current.innerHTML = `${content?.innerHTML.split(".")[0]}.`;
    }
  }, []);

  const bringCardToView = (e) => {
    let inViewPort = handleInViewPort(cardContainerRef.current);
    inViewPort && cardContainerRef.current.classList.add("bringToDisplay");
  };

  useEffect(() => {
    window.addEventListener("scroll", bringCardToView);
    return () => window.removeEventListener("scroll", bringCardToView);
  }, []);

  return (
    <ServiceCardContainer ref={cardContainerRef}>
      <SectionPara style={{ lineHeight: "1.1" }}>{serviceName}</SectionPara>
      <ServiceIconContainer>
        <ServiceIcon src={imgUrl} />
      </ServiceIconContainer>
      <OptimizedContainer
        ref={containerRef}
        style={{
          fontFamily: "var(--mont)",
          lineHeight: "1.6",
          fontSize: "0.9rem",
          margin: "0 auto",
          //   textAlign: "justify",
          textAlign: "center",
        }}
      ></OptimizedContainer>
      <OptimizedButtonLink onClick={navigateQuoting}>
        Request Quote
      </OptimizedButtonLink>
      <OptimizedButtonLink onClick={navigateSchedule}>
        Schedule Service
      </OptimizedButtonLink>
      <OptimizedButtonLink to={`/services/${filterId}`}>
        Learn More
      </OptimizedButtonLink>
    </ServiceCardContainer>
  );
};

const ServiceCardContainer = styled.div`
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 1rem;
  border-top: 2px solid var(--primary-color);
  opacity: 0;
  transform: scale(0.9) translate(30px, 30px);
  transition: transform 1s, opacity 1.5s ease;

  &.bringToDisplay {
    opacity: 1;
    transform: scale(1) translate(0, 0);
  }
`;

const OptimizedButtonLink = styled(ButtonLink)`
  max-width: initial;
`;

export const ServiceIconContainer = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: auto;
`;

export const ServiceIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export default ServiceCard;

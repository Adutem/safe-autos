import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ButtonLink, SectionPara } from "./reusables/Styles";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import categories from "../data/service-cat";
import { OptimizedContainer } from "../pages/ServiceCat";

const ServiceCard = ({ service: serviceName }) => {
  const { parseName } = useGlobalContext();
  const filterId = parseName(serviceName);
  const navigate = useNavigate();
  const containerRef = useRef(null);

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
      containerRef.current.innerHTML = `${content?.innerHTML.slice(0, 100)}...`;
    }
  }, []);

  return (
    <ServiceCardContainer>
      <SectionPara style={{ lineHeight: "1.1" }}>{serviceName}</SectionPara>
      <OptimizedContainer
        ref={containerRef}
        style={{
          fontFamily: "var(--mont)",
          lineHeight: "1.6",
          fontSize: "0.9rem",
          margin: 0,
          //   textAlign: "justify",
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
  padding: 1rem;
`;

const OptimizedButtonLink = styled(ButtonLink)`
  max-width: initial;
`;

export default ServiceCard;

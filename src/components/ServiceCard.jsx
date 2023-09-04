import React from "react";
import styled from "styled-components";
import { ButtonLink, SectionPara } from "./reusables/Styles";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service: serviceName }) => {
  const { parseName } = useGlobalContext();
  const filterId = parseName(serviceName);
  const navigate = useNavigate();

  const navigateSchedule = (e) => {
    e.preventDefault();
    navigate("/services/schedule-service", { state: { serviceName } });
  };

  return (
    <ServiceCardContainer>
      <SectionPara style={{ lineHeight: "1.1" }}>{serviceName}</SectionPara>
      <OptimizedButtonLink>Request Quote</OptimizedButtonLink>
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
  background: lightgray;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const OptimizedButtonLink = styled(ButtonLink)`
  max-width: initial;
`;

export default ServiceCard;

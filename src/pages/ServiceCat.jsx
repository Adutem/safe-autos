import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useMemo } from "react";
import categories from "../data/service-cat";
import styled from "styled-components";
import {
  Container,
  SectionPara,
  RowFlex,
  ButtonLink,
  ColumnFlexContainer,
} from "../components/reusables/Styles";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FormGroupComponent } from "../components/reusables/Components";
import serviceData from "../data/services-with-image";
import { ServiceIcon, ServiceIconContainer } from "../components/ServiceCard";

const ServiceCat = () => {
  const { parseName, services, reverseParse } = useGlobalContext();
  const { serviceName } = useParams();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const imgUrl = useMemo(
    () =>
      serviceData.find((data) => data.name === reverseParse(serviceName))
        .imgUrl,
    [serviceName]
  );

  const navigateSchedule = (e) => {
    e.preventDefault();
    navigate("/services/schedule-service", {
      state: { serviceName: reverseParse(serviceName) },
    });
  };

  const handleServiceSelect = (e) => {
    const filterId = parseName(e.target.value);
    navigate(`/services/${filterId}`);
  };

  useEffect(() => {
    const match = categories.find((cat) => cat.name === serviceName);
    const parser = new DOMParser();
    const content = parser.parseFromString(match.innerHTML, "text/html");
    containerRef.current.innerHTML = content.body.innerHTML;
  }, []);

  return (
    <ServiceCatContainer>
      <Container>
        <OptimizedRowFlex
          jus={"space-between"}
          align="center"
          style={{ gap: "2rem", padding: "1.5rem 0 0" }}
        >
          <OptimizedColumnContainer>
            <ServiceIconContainer style={{ margin: "initial" }}>
              <ServiceIcon src={imgUrl} />
            </ServiceIconContainer>
            <SectionPara> {serviceName.toUpperCase()}</SectionPara>{" "}
          </OptimizedColumnContainer>
          <FormGroupComponent
            type={"select"}
            name={"serviceName"}
            onChange={handleServiceSelect}
            value={serviceName}
            options={services}
            label={"Select a Service: "}
            style={{
              flexDirection: "row",
              marginBottom: "0",
              alignItems: "center",
            }}
            labelStyle={{ minWidth: "max-content" }}
          />
        </OptimizedRowFlex>
        <OptimizedRowFlex>
          <OptimizedButtonLink>Request Quote</OptimizedButtonLink>
          <OptimizedButtonLink onClick={navigateSchedule}>
            Schedule Service
          </OptimizedButtonLink>
        </OptimizedRowFlex>
      </Container>
      <OptimizedContainer ref={containerRef}></OptimizedContainer>
      <Container>
        {" "}
        <OptimizedRowFlex>
          <OptimizedButtonLink>Request Quote</OptimizedButtonLink>
          <OptimizedButtonLink onClick={navigateSchedule}>
            Schedule Service
          </OptimizedButtonLink>
        </OptimizedRowFlex>
      </Container>
    </ServiceCatContainer>
  );
};

const ServiceCatContainer = styled.div``;

export const OptimizedContainer = styled(Container)`
  margin: 2rem auto;

  & > * {
    font-family: var(--mont);
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.5rem 0;
    text-align: left !important;
  }

  p,
  li,
  div {
    line-height: 1.4;
    font-size: 0.9rem;
    text-align: justify;
  }

  li {
    margin: 0.4rem 0;
  }

  ul,
  li {
    list-style-type: initial;
    margin-left: 0.55rem;
  }
`;

const OptimizedRowFlex = styled(RowFlex)`
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem 0;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem !important;
  }

  & > div {
    @media (max-width: 700px) {
      flex-wrap: wrap;
      width: 100%;
    }
  }
`;

const OptimizedButtonLink = styled(ButtonLink)`
  max-width: initial;
`;

const OptimizedColumnContainer = styled(ColumnFlexContainer)`
  align-items: flex-start;

  p {
    text-align: left;
  }

  @media (max-width: 700px) {
    align-items: center;

    p {
      text-align: center;
    }
  }
`;
export default ServiceCat;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Tires() {
  return (
    <TiresPageContainer>
      <Heading>No tire to display at the moment</Heading>
    </TiresPageContainer>
  );
}

const TiresPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const Heading = styled.h2`
  font-family: var(--teko);
  text-align: center;
`;

import React from "react";
import styled from "styled-components";

const Coupons = () => {
  return (
    <CouponsContainer>
      <Heading>There are no Coupons to display at the moment</Heading>
    </CouponsContainer>
  );
};

const CouponsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const Heading = styled.h2`
  font-family: var(--teko);
  text-align: center;
`;

export default Coupons;

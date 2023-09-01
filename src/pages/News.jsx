import React from "react";
import styled from "styled-components";

const News = () => {
  return (
    <NewsContainer>
      <Heading>There is no news at the moment</Heading>
    </NewsContainer>
  );
};

const NewsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const Heading = styled.h2`
  font-family: var(--teko);
  text-align: center;
`;

export default News;

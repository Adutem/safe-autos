import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <NotFoundContainer>
      <Heading>Oops! This page doesn't seem to exist</Heading>
      <LinkItem to="/">Back to Hompage</LinkItem>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
`;

const Heading = styled.h2`
  font-family: var(--teko);
  text-align: center;
`;

const LinkItem = styled(Link)`
  display: block;
  max-width: max-content;
  color: var(--primary-color);
  font-family: var(--teko);
  margin-top: 0.4rem;
  font-size: 1.1rem;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

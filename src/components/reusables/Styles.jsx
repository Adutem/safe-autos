import styled from "styled-components";
import { Link } from "react-router-dom";

export const SectionHeading = styled.h2`
  font-size: min(3rem, 10vw);
  font-family: var(--teko);
  text-transform: uppercase;
  font-weight: 600;
  word-spacing: min(2.8vw, 1.3rem);
  text-align: center;

  & .colored {
    color: var(--primary-color);
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    word-spacing: initial;
    line-height: 1.1;
  }
`;

export const SectionPara = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  font-family: var(--teko);

  & .colored {
    color: var(--primary-color);
  }

  & .underlined {
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  &.hide-small {
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

export const ButtonLink = styled(Link)`
  text-transform: uppercase;
  color: var(--white);
  background: var(--gray);
  font-size: 1.5rem;
  padding: 1rem;
  min-width: 150px;
  width: 100%;
  max-width: 300px;
  display: inline-block;
  text-align: center;
  transition: 0.4s ease;
  font-family: var(--teko);

  &:hover {
    background: var(--primary-color);
  }
`;

export const Container = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: auto;
`;

export const RelativeGradientContainer = styled.div`
  position: relative;

  & > * {
    position: relative;
    z-index: 10;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.2),
      rgba(0, 0, 0, 0.4)
    );
    z-index: 0;
  }
`;

export const ColumnFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

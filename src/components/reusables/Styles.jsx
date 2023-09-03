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
  padding: 0.8rem;
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

  @media (max-width: 400px) {
    font-size: 1.2rem;
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

export const RedBackgroundHeading = styled.h2`
  font-family: var(--teko);
  color: var(--white);
  background-color: var(--primary-color);
  padding: 1rem 5%;
  text-transform: uppercase;

  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

export const FormButton = styled(ButtonLink)`
  border: none;
  outline: none;
  width: 100%;
  max-width: initial;
  padding: 0.8rem;
`;

export const Form = styled.form`
  margin: 3rem 0;
`;

export const GridLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftContainer = styled.div``;

export const RightContainer = styled.div``;

export const NormalPara = styled.p`
  font-family: var(--mont);
  line-height: 1.5;
  margin: 1rem 0;
  word-wrap: break-word;

  @media (max-width: 400px) {
    0.9rem;
  }
`;

export const ListItem = styled.li`
  list-style: initial;
`;

export const List = styled.ul`
  list-style: initial;
  padding-left: 1rem;
  margin: 1rem 0;
`;

export const OptimizedButtonLink = styled(ButtonLink)`
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  max-width: 400px;
  justify-content: center;

  i {
    margin-right: 1rem;
    display: flex;
    margin-top: -0.1rem;

    @media (max-width: 400px) {
      display: none;
    }
  }
`;

export const RowFlex = styled.div`
  display: flex;
  justify-content: ${(props) => props.jus || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
`;

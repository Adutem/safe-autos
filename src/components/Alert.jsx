import React from "react";
import styled from "styled-components";

const Alert = ({ holidayText }) => {
  return (
    <AlertText>
      {/* We will be closed on Monday September 4th for labor day */}
      {holidayText}
    </AlertText>
  );
};

const AlertText = styled.h1`
  background-color: red;
  color: #fff;
  text-align: center;
  padding: 1rem;
  font-family: var(--mont);
  font-size: min(1.7rem, 4vw);
`;

export default Alert;

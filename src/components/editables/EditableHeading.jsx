import React from "react";
import styled from "styled-components";

const EditableHeading = ({ contentData, handleInputChange, disabled }) => {
  const inputChangeHandler = (e) => {
    if (contentData.customId) {
      return handleInputChange(contentData.customId, e.target.value);
    }
    return handleInputChange(contentData._id, e.target.value);
  };
  return (
    <AboutPageInput
      value={contentData.content}
      type="text"
      name={contentData._id || contentData.customId}
      data-id={contentData._id || contentData.customId}
      multiple={true}
      onChange={inputChangeHandler}
      disabled={disabled}
    />
  );
};

const AboutPageInput = styled.input`
  font-family: var(--mont);
  font-weight: 700;
  font-size: 1.3rem;
  margin: 1rem 0 0.5rem;
  text-transform: uppercase;
  border: 2px solid black;
  padding: 1rem;
  display: block;
  width: 100%;
`;
export default EditableHeading;

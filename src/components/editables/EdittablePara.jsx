import React from "react";
import styled from "styled-components";

const EdittablePara = ({ contentData, handleInputChange, disabled }) => {
  const inputChangeHandler = (e) => {
    if (contentData.customId) {
      return handleInputChange(contentData.customId, e.target.value);
    }
    return handleInputChange(contentData._id, e.target.value);
  };
  return (
    <AboutPageTextArea
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

const AboutPageTextArea = styled.textarea`
  font-family: var(--mont);
  line-height: 1.5;
  margin-bottom: 1rem;
  border: 2px solid black;
  padding: 1rem;
  display: block;
  width: 100%;
  resize: vertical;
  min-height: 120px;
  font-size: 1rem;
`;

export default EdittablePara;

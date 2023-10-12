import React from "react";
import styled from "styled-components";
import { EditIcon } from "../../pages/admin/Dashboard";
import { DeleteButton, EditableContainer } from "./EdittablePara";

const EditableHeading = ({
  contentData,
  handleInputChange,
  disabled,
  removeContent,
}) => {
  const inputChangeHandler = (e) => {
    if (contentData.customId) {
      return handleInputChange(contentData.customId, e.target.value);
    }
    return handleInputChange(contentData._id, e.target.value);
  };
  return (
    <EditableContainer>
      <AboutPageInput
        value={contentData.content}
        type="text"
        name={contentData._id || contentData.customId}
        data-id={contentData._id || contentData.customId}
        multiple={true}
        onChange={inputChangeHandler}
        disabled={disabled}
      />
      <DeleteButton
        onClick={() => removeContent(contentData._id || contentData.customId)}
      >
        <i className="fi fi-sr-trash-xmark"></i>
      </DeleteButton>
    </EditableContainer>
  );
};

const AboutPageInput = styled.input`
  font-family: var(--mont);
  font-weight: 700;
  font-size: 1.3rem;
  // margin: 1rem 0 0.5rem;
  border: none;
  outline: none;
  text-transform: uppercase;
  // border: 2px solid black;
  padding: 1rem;
  display: block;
  width: 100%;
`;
export default EditableHeading;

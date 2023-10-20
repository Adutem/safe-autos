import React from "react";
import styled from "styled-components";
import { EditIcon } from "../../pages/admin/Dashboard";

const EdittablePara = ({
  contentData,
  handleInputChange,
  disabled,
  removeContent,
  inputStyle,
  ...rest
}) => {
  const inputChangeHandler = (e) => {
    if (contentData.customId) {
      return handleInputChange(contentData.customId, e.target.value);
    }
    return handleInputChange(contentData._id, e.target.value);
  };
  return (
    <EditableContainer {...rest}>
      <AboutPageTextArea
        value={contentData.content}
        type="text"
        name={contentData._id || contentData.customId}
        data-id={contentData._id || contentData.customId}
        multiple={true}
        onChange={inputChangeHandler}
        disabled={disabled}
        style={inputStyle}
      />
      <DeleteButton
        onClick={() => removeContent(contentData._id || contentData.customId)}
      >
        <i className="fi fi-sr-trash-xmark"></i>
      </DeleteButton>
    </EditableContainer>
  );
};

const AboutPageTextArea = styled.textarea`
  font-family: var(--mont);
  line-height: 1.5;
  margin-top: 1rem;
  // border: 2px solid black;
  border: none;
  outline: none;
  padding: 1rem;
  display: block;
  width: 100%;
  resize: vertical;
  min-height: 120px;
  font-size: 1rem;

  &::-webkit-scrollbar {
    appearance: none;
    width: 4px;
    background-color: rgba(var(--primary-rgb), 0.8);
    border-radius: 0.5rem;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    width: 2px;
    max-height: 4px;
    border-radius: 0.5rem;
    cursor: pointer;
    background-color: rgba(238, 238, 238, 0.9);
  }
`;

export const EditableContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  margin: 1rem 0;
  padding: 0 0 1rem 1rem;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.19);
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const DeleteButton = styled.button`
  border: none;
  outline: none;
  padding: 0.5rem;
  width: 50px;
  height: 50px;
  cursor: pointer;
  color: var(--primary-color);
  background: transparent;
  box-shadow: 0px 3px 6px rgba(var(--primary-rgb), 0.15);
  transition: 0.3s ease;

  i {
    font-size: 2rem;
    color: inherit;
  }

  &:hover {
    box-shadow: 0px 6px 8px rgba(var(--primary-rgb), 0.2);
  }
`;

export default EdittablePara;

import React, { useState } from "react";
import styled from "styled-components";

const PasswordFormGroup = ({
  label,
  placeholder,
  onChangeText,
  name,
  value,
  ...rest
}) => {
  const [type, setType] = useState("password");

  const toggle = (value) => {
    setType(value);
  };

  return (
    <Container {...rest}>
      <Label>{label}</Label>
      <div style={{ position: "relative" }}>
        <Input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChangeText(e)}
          placeholder={placeholder}
        />
        <Action>
          {type === "password" ? (
            <ToggleVisibility
              className="fi fi-sr-eye"
              onClick={() => toggle("text")}
            />
          ) : (
            <ToggleVisibility
              className="fi fi-sr-eye-crossed"
              onClick={() => toggle("password")}
            />
          )}
        </Action>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  font-family: var(--mont);
  display: block;
  font-weight: 600;
  cursor: pointer;
`;
const Input = styled.input`
  font-family: var(--mont);
  border: none;
  outline: none;
  background: #f1f1f1;
  padding: 1rem;
  width: 100%;
  display: block;
  cursor: pointer;
`;

const Action = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const ToggleVisibility = styled.i`
  color: var(--textColor);
  padding: 1rem;
  font-size: 1.2rem;
  display: inline-block;
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    color: var(--primary-color);
  }
`;

export default PasswordFormGroup;

import styled from "styled-components";

export const FormGroupComponent = ({
  type,
  name,
  placeholder,
  label,
  onChange,
  value,
  options,
}) => {
  if (type === "textarea") {
    return (
      <FormGroup>
        <Label>{label}</Label>
        <TextArea
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
      </FormGroup>
    );
  }
  if (type === "select") {
    return (
      <FormGroup>
        <Label>{label}</Label>
        <Select
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        >
          {options?.map((option) => (
            <Option value={option}>{option}</Option>
          ))}
        </Select>
      </FormGroup>
    );
  }
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </FormGroup>
  );
};

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-family: var(--mont);
  display: block;
  font-weight: 600;
`;

const Input = styled.input`
  font-family: var(--mont);
  border: none;
  outline: none;
  background: lightgray;
  padding: 1rem;
  width: 100%;
  display: block;
`;

const TextArea = styled.textarea`
  font-family: var(--mont);
  border: none;
  outline: none;
  background: lightgray;
  padding: 1rem;
  width: 100%;
  display: block;
  resize: none;
  min-height: 250px;
`;

const Select = styled.select`
  font-family: var(--mont);
  border: none;
  outline: none;
  background: lightgray;
  padding: 1rem;
  width: 100%;
  display: block;
`;

const Option = styled.option``;

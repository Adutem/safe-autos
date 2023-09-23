import React, { useState } from "react";
import styled from "styled-components";
import {
  Form,
  NormalPara,
  SectionPara,
} from "../../components/reusables/Styles";
import { FormGroupComponent } from "../../components/reusables/Components";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { updateFormEmail } from "../../redux";

const Dashboard = () => {
  const formEmail = useSelector((state) => state.formEmail);
  return (
    <DashboardContainer>
      <SectionPara style={{ textAlign: "left" }}>
        Form Submission Email
      </SectionPara>
      <NormalPara style={{ margin: "0.4rem 0 0 0" }}>
        This email is where all submitted form will be directed
      </NormalPara>
      <FormSubmissionComponent formEmail={formEmail} />
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  padding: 1rem;
  background: #f1f1f1;
  border-left: 4px solid var(--primary-color);
`;

const FormSubCompContainer = styled.div``;

const FormSubmissionComponent = ({ formEmail }) => {
  const [email, setEmail] = useState(formEmail?.emailData.email);
  const [disabled, setDisabled] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const { emailValidator, toastError } = useGlobalContext();
  const dispatch = useDispatch();

  const handleInputChange = (e) => setEmail(e.target.value);

  const makeInputEditable = (e) => {
    e.preventDefault();
    setDisabled(false);
    setShowSaveButton(true);
  };

  const successCallback = () => {
    setDisabled(true);
    setShowSaveButton(false);
  };

  const errorCallback = () => {
    // setDisabled(false);
    setEmail(formEmail?.emailData?.email);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    if (!emailValidator(email)) return toastError("Invalid email", "dakfasfd");
    setDisabled(true);
    dispatch(
      updateFormEmail(
        { email, emailId: formEmail?.emailData._id },
        successCallback,
        errorCallback
      )
    );
  };
  return (
    <FormSubCompContainer>
      <Form
        style={{
          background: "#fff",
          padding: "0.6rem 1rem",
          margin: "1rem 0",
          display: "flex",
          gap: "0.5rem",
          // alignItems: "center",
        }}
      >
        <FormGroupComponent
          type={"text"}
          value={email}
          onChange={handleInputChange}
          name={"email"}
          placeholder={"Enter email"}
          disabled={disabled}
          style={{ flex: 1, marginBottom: "0", gap: 0 }}
        />
        {disabled && (
          <EditIcon onClick={makeInputEditable}>
            <i className="fi fi-sr-pencil"></i>
          </EditIcon>
        )}
        {!disabled && showSaveButton && (
          <SaveChange onClick={saveChanges}>
            {formEmail?.loading ? "Saving..." : "Save Changes"}
          </SaveChange>
        )}
      </Form>
    </FormSubCompContainer>
  );
};

const EditIcon = styled.button`
  border: none;
  outline: none;
  padding: 0.5rem;
  width: 50px;
  height: 50px;
  border-radius: 0.4rem;
  cursor: pointer;
  background: var(--primary-color);

  i {
    font-size: 2rem;
    color: #fff;
  }
`;

const SaveChange = styled.button`
  outline: none;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  background: var(--primary-color);
  padding: 0.5rem 1rem;
  color: #fff;
  font-family: var(--mont);
  font-weight: 600;
`;
export default Dashboard;

import React, { useState } from "react";
import styled from "styled-components";
import {
  Form,
  NormalPara,
  SectionHeading,
  SectionPara,
} from "../../components/reusables/Styles";
import { FormGroupComponent } from "../../components/reusables/Components";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { updateFormEmail, updateHoliday } from "../../redux";
import dayjs from "dayjs";

const Dashboard = () => {
  const formEmail = useSelector((state) => state.formEmail);
  const holiday = useSelector((state) => state.holiday);
  return (
    <AdminContainer>
      <SectionHeading
        style={{ wordSpacing: "initial", margin: 0, fontWeight: "bold" }}
      >
        Dashboard
      </SectionHeading>
      <SectionPara style={{ textAlign: "left" }}>
        Form Submission Email
      </SectionPara>
      <NormalPara style={{ margin: "0.4rem 0 0 0" }}>
        This email is where all submitted form will be directed
      </NormalPara>
      <FormSubmissionComponent formEmail={formEmail} />
      <br />
      <SectionPara style={{ textAlign: "left" }}>Declare Holiday</SectionPara>
      <NormalPara style={{ margin: "0.4rem 0 0 0" }}>
        This holiday will disappear from the homepage after the holiday has
        passed.
      </NormalPara>
      <HolidayFormComponent holiday={holiday} />
    </AdminContainer>
  );
};

export const AdminContainer = styled.div`
  padding: 2rem 1rem;
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

  const cancelEdit = (e) => {
    e.preventDefault();
    setDisabled(true);
    setShowSaveButton(false);
    setEmail(formEmail?.emailData?.email);
  };

  const successCallback = () => {
    setDisabled(true);
    setShowSaveButton(false);
  };

  const errorCallback = () => {
    // setDisabled(false);
    setEmail(formEmail?.emailData?.email);
    setShowSaveButton(false);
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
        {disabled && !showSaveButton && (
          <EditIcon onClick={makeInputEditable}>
            <i className="fi fi-sr-pencil"></i>
          </EditIcon>
        )}
        {showSaveButton && (
          <SaveChange onClick={saveChanges} disabled={disabled}>
            {formEmail?.loading ? "Saving..." : "Save Changes"}
          </SaveChange>
        )}
        {showSaveButton && !formEmail?.loading && (
          <CancelEdit onClick={cancelEdit} disabled={disabled}>
            Cancel
          </CancelEdit>
        )}
      </Form>
    </FormSubCompContainer>
  );
};

export const EditIcon = styled.button`
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

export const SaveChange = styled.button`
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

export const CancelEdit = styled(SaveChange)``;

const HolidayFormComponent = ({ holiday }) => {
  const [holidayData, setHolidayData] = useState(holiday.holidayData);
  const [disabled, setDisabled] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const { toastError } = useGlobalContext();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    return setHolidayData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const makeInputEditable = (e) => {
    e.preventDefault();
    setDisabled(false);
    setShowSaveButton(true);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setDisabled(true);
    setShowSaveButton(false);
    setHolidayData(holiday?.holidayData);
  };

  const successCallback = () => {
    setShowSaveButton(false);
  };

  const errorCallback = () => {
    setHolidayData(holiday.holidayData);
    setShowSaveButton(false);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const { holidayText, holidayDate } = holidayData;
    if (!holidayText || !holidayDate) {
      return toastError("Please fill all fields");
    }
    setDisabled(true);
    const data = { holidayText, holidayDate, holidayId: holidayData._id };
    dispatch(updateHoliday(data, successCallback, errorCallback));
  };

  return (
    <HolidayFormContainer>
      <OptimizedForm>
        <FormGroupComponent
          type={"text"}
          value={holidayData?.holidayText}
          onChange={handleInputChange}
          name={"holidayText"}
          placeholder={"Enter holiday text"}
          disabled={disabled}
          style={{ flex: 1, marginBottom: "0", gap: 0 }}
        />
        <FormGroupComponent
          type={"date-time"}
          value={dayjs(holidayData?.holidayDate)}
          onChange={handleInputChange}
          name={"holidayDate"}
          style={{ flex: 1, marginBottom: "0", gap: 0 }}
          disabled={disabled}
        />
        {disabled && !showSaveButton && (
          <EditIcon onClick={makeInputEditable}>
            <i className="fi fi-sr-pencil"></i>
          </EditIcon>
        )}
        {showSaveButton && (
          <SaveChange onClick={saveChanges} disabled={disabled}>
            {holiday?.loading ? "Saving..." : "Save Changes"}
          </SaveChange>
        )}
        {showSaveButton && !holiday?.loading && (
          <CancelEdit onClick={cancelEdit} disabled={disabled}>
            Cancel
          </CancelEdit>
        )}
      </OptimizedForm>
    </HolidayFormContainer>
  );
};

const HolidayFormContainer = styled.div``;

const OptimizedForm = styled(Form)`
  background: #fff;
  padding: 0.6rem 1rem;
  margin: 1rem 0;
  display: flex;
  gap: 0.5rem;
`;
export default Dashboard;

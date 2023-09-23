import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  Form,
  GridLayoutContainer,
  SectionHeading,
} from "../../components/reusables/Styles";
import { FormGroupComponent } from "../../components/reusables/Components";
import { useDispatch } from "react-redux";
import {
  useGlobalContext,
  removeFromLocalStorage,
} from "../../contexts/GlobalContext";
import { loginUser } from "../../redux/user/userActions";
import PasswordFormGroup from "../../components/PasswordFormGroup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const customToastId = "adfkajfd";
const Authenticate = () => {
  const [loginFormData, setLoginFormData] = useState({});
  const { emailValidator, toastError, toastInfo } = useGlobalContext();
  const dispatch = useDispatch();
  const { userData, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const toastInfoWithCustomId = useCallback(
    (message) => toastInfo(message, customToastId),
    [customToastId]
  );

  const toastErrorWithCustomId = useCallback(
    (message) => toastError(message, customToastId),
    [customToastId]
  );

  const handleInputChange = (e) =>
    setLoginFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateLogin = (e) => {
    e.preventDefault();
    if (!loginFormData.email || !loginFormData.password)
      return toastErrorWithCustomId("Please fill all fields");
    if (!emailValidator(loginFormData.email))
      return toastErrorWithCustomId("Invalid email");
    if (loginFormData.password.length < 8)
      return toastErrorWithCustomId("Password must be min of 8 characters");
    dispatch(loginUser(loginFormData, () => navigate("/admin")));
  };

  useEffect(() => {
    if (error && error === "jwt expired") {
      toastInfoWithCustomId("Session Expired! Please login again.");
      removeFromLocalStorage("accessToken");
    }
  }, []);
  return (
    <AuthenticationPageContainer>
      <SectionHeading style={{ fontSize: "1.5rem", wordSpacing: "0" }}>
        Login to Admin Dashboard
      </SectionHeading>
      <Form>
        <GridLayoutContainer>
          <FormGroupComponent
            type={"text"}
            name={"email"}
            label={"Email"}
            placeholder={"Enter your email"}
            value={loginFormData?.email}
            onChange={handleInputChange}
          />
          <div>
            <PasswordFormGroup
              onChangeText={handleInputChange}
              name={"password"}
              value={loginFormData?.password}
              placeholder={"Enter a password"}
              label={"Password"}
              style={{ marginBottom: "0.2rem" }}
            />
            <p
              style={{
                color: "var(--primary-color)",
                fontFamily: "var(--teko)",
              }}
            >
              Minimum of 8 characters
            </p>
          </div>
          <Button onClick={validateLogin} style={{ fullColumn }}>
            Login
          </Button>
        </GridLayoutContainer>
      </Form>
    </AuthenticationPageContainer>
  );
};

const AuthenticationPageContainer = styled.div`
  width: 90%;
  max-width: 500px;
  padding: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin: 2rem auto;
`;

const fullColumn = { gridColumn: "1 / -1" };

export default Authenticate;

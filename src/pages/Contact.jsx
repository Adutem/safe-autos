import React, { useState } from "react";
import styled from "styled-components";
import {
  RedBackgroundHeading,
  Container,
  FormButton,
} from "../components/reusables/Styles";
import { Link } from "react-router-dom";
import { FormGroupComponent } from "../components/reusables/Components";

const Contact = () => {
  const [contactData, setContactData] = useState({});

  const handleInputChange = (e) => {
    setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <ContactPageContainer>
      <RedBackgroundHeading>Contact Us</RedBackgroundHeading>
      <Container>
        <AddressSection>
          <FindUsLinkItem>Acorn Tires & Auto</FindUsLinkItem>
          <AddressPara>591 S Lapeer Road</AddressPara>
          <AddressPara>Lake Orion, MI 48362</AddressPara>
          <AddressPara>
            Phone: <a href="tel:(248) 693-7979">248-693-7979</a>
          </AddressPara>
        </AddressSection>
      </Container>{" "}
      <RedBackgroundHeading>Contact Form</RedBackgroundHeading>
      <Container>
        <ContactForm>
          <GridLayoutContainer>
            <LeftContainer>
              <FormGroupComponent
                label={"First Name"}
                placeholder={"Enter First Name"}
                name={"firstName"}
                value={contactData?.firstName}
                onChange={handleInputChange}
                type={"text"}
              />
              <FormGroupComponent
                label={"Last Name"}
                placeholder={"Enter Last Name"}
                name={"lastName"}
                value={contactData?.lastName}
                onChange={handleInputChange}
                type={"text"}
              />
              <FormGroupComponent
                label={"Email Address"}
                placeholder={"Enter Email Address"}
                name={"email"}
                value={contactData?.email}
                onChange={handleInputChange}
                type={"email"}
              />
            </LeftContainer>
            <RightContainer>
              <FormGroupComponent
                label={"Telephone"}
                placeholder={"Enter tel"}
                name={"tel"}
                value={contactData?.tel}
                onChange={handleInputChange}
                type={"text"}
              />
              <FormGroupComponent
                label={"Questions/Comments (Required):"}
                placeholder={"Enter message here"}
                name={"message"}
                value={contactData?.message}
                onChange={handleInputChange}
                type={"textarea"}
              />
            </RightContainer>
          </GridLayoutContainer>
          <FormButton>Submit</FormButton>
        </ContactForm>
      </Container>
    </ContactPageContainer>
  );
};

const ContactPageContainer = styled.div``;

const AddressSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const FindUsLinkItem = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  color: var(--primary-color);
  font-family: var(--mont);
  margin-bottom: 1rem;
  font-size: 1.1rem;

  &:hover {
    text-decoration: none;
  }
`;

const AddressPara = styled.p`
  font-weight: 400;
  font-family: var(--mont);
  font-size: 0.9rem;
  color: black;

  a {
    text-decoration: underline;
    color: var(--primary-color);

    &:hover {
      text-decoration: none;
    }
  }
`;

const ContactForm = styled.form`
  margin: 3rem 0;
`;

const GridLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div``;
export default Contact;

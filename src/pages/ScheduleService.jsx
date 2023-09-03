import React, { useState } from "react";
import styled from "styled-components";
import {
  Container,
  FormButton,
  GridLayoutContainer,
  LeftContainer,
  NormalPara,
  RedBackgroundHeading,
  RightContainer,
  RowFlex,
  SectionPara,
} from "../components/reusables/Styles";
import { FormGroupComponent } from "../components/reusables/Components";
import { useGlobalContext } from "../contexts/GlobalContext";
import hoursOfOperation from "../data/hours-of-operation";
import GoogleMapComp from "../components/reusables/GoogleMapComp";

const waitOptions = [
  {
    label: "I will wait for my vehicle",
    value: "true",
  },
  {
    label: "I will leave my vehicle",
    value: "false",
  },
];

const contactOptions = [
  {
    label: "Telephone",
    value: "telephone",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Text (SMS)",
    value: "SMS",
  },
];

const ScheduleService = () => {
  const [serviceData, setServiceData] = useState({});
  const { models, makes, modelYears, states } = useGlobalContext();

  const handleInputChange = (e) => {
    setServiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <SchedulePageContainer>
      <RedBackgroundHeading>Schedule My Service</RedBackgroundHeading>
      <Container style={{ marginBottom: "2rem" }}>
        <NormalPara>
          Please use the form below to submit a scheduled service request to us.
          Submitting this form does not quarantee that the time you're choosing
          is available, but we will be in touch with you within 24 hours, to
          schedule a time that will work for you.
        </NormalPara>
        <NormalPara>Required fields are marked with *</NormalPara>
        <OptimizedSectionPara>Service Explanation</OptimizedSectionPara>
        <OptimizedGridLayout>
          <FormGroupComponent
            type={"select"}
            options={["I'm not sure", "A/C Repair", "Air Filters", "Batteries"]}
            label={"Select a service:"}
            name={"serviceType"}
            placeholder={"I'm not sure"}
            style={fullColumn}
            onChange={handleInputChange}
            value={serviceData?.serviceType}
          />
          <FormGroupComponent
            type={"textarea"}
            label={"Include a message to our technicians:"}
            name={"message"}
            placeholder={"Enter your message"}
            style={fullColumn}
            onChange={handleInputChange}
            value={serviceData?.message}
            shouldResize="vertical"
          />
          <OptimizedSectionPara style={fullColumn}>
            Please enter your vehicle information:
          </OptimizedSectionPara>
          <LeftContainer>
            <FormGroupComponent
              type={"select"}
              options={["Select Year", ...modelYears.reverse()]}
              name={"year"}
              value={serviceData?.year}
              placeholder={"Select Year"}
              onChange={handleInputChange}
            />
            <FormGroupComponent
              type={"select"}
              options={["Select Model", ...models]}
              name={"model"}
              value={serviceData?.model}
              placeholder={"Select Model"}
              onChange={handleInputChange}
            />
          </LeftContainer>
          <RightContainer>
            <FormGroupComponent
              type={"select"}
              options={["Select Make", ...makes]}
              name={"make"}
              value={serviceData?.make}
              placeholder={"Select Make"}
              onChange={handleInputChange}
            />
            <FormGroupComponent
              type={"select"}
              options={[]}
              name={"option"}
              value={serviceData?.option}
              placeholder={"Select Option"}
              onChange={handleInputChange}
            />
          </RightContainer>
        </OptimizedGridLayout>

        <OptimizedGridLayout
          style={{ margin: "1rem auto" }}
          waitTillMobile={true}
        >
          <LeftContainer>
            <OptimizedSectionPara>Appointment Details</OptimizedSectionPara>
            <Address>
              <NormalPara style={{ margin: "0", marginBottom: "1rem" }}>
                Acorn Tire & Auto <br />
                591 S Lapeer Road <br />
                Lake Orion, MI 48362
              </NormalPara>
            </Address>
          </LeftContainer>
          <RightContainer>
            {" "}
            <OptimizedSectionPara style={{ fontSize: "1.3rem" }}>
              Hours
            </OptimizedSectionPara>
            <div style={{ margin: "1rem 0 1.5rem" }}>
              {hoursOfOperation.map((hop) => (
                <NormalPara style={{ margin: "0.5rem 0" }}>
                  {hop.date}: {hop.hours.join(" - ")}
                </NormalPara>
              ))}
            </div>
          </RightContainer>
        </OptimizedGridLayout>
        <OptimizedGridLayout>
          <LeftContainer>
            <FormGroupComponent
              type={"date-time"}
              label={"Select first choice appointment:"}
              value={serviceData?.firstAppointmentDate}
              onChange={handleInputChange}
              name={"firstAppointmentDate"}
            />
            <FormGroupComponent
              type={"date-time"}
              label={"Select second choice appointment:"}
              value={serviceData?.secondAppointmentDate}
              onChange={handleInputChange}
              name={"secondAppointmentDate"}
            />
            <FormGroupComponent
              generalName={"Will you wait while we work?:"}
              name={"staying"}
              options={waitOptions}
              type={"radio"}
              value={serviceData?.staying}
              onChange={handleInputChange}
            />
          </LeftContainer>
          <RightContainer>
            <GoogleMapComp style={{ marginTop: "0" }} />
          </RightContainer>
        </OptimizedGridLayout>
        <OptimizedSectionPara>Personal Information</OptimizedSectionPara>
        <OptimizedGridLayout>
          <FormGroupComponent
            type={"text"}
            name={"fullName"}
            value={serviceData?.fullName}
            label={"Name: *"}
            style={fullColumn}
            onChange={handleInputChange}
            placeholder={"Enter your fullname"}
          />
          <FormGroupComponent
            type={"email"}
            name={"email"}
            value={serviceData?.email}
            onChange={handleInputChange}
            label={"Email: *"}
            placeholder={"Enter your email"}
          />
          <FormGroupComponent
            type={"text"}
            name={"phoneNumber"}
            value={serviceData?.phoneNumber}
            onChange={handleInputChange}
            label={"Phone(xxx)xxx-xxxx: *"}
            placeholder={"Enter your phone number"}
          />
          <FormGroupComponent
            type={"text"}
            name={"streetAddress"}
            value={serviceData?.streetAddress}
            onChange={handleInputChange}
            label={"Street Address: "}
            placeholder={"Enter your address"}
            style={fullColumn}
          />
          <FormGroupComponent
            type={"text"}
            name={"city"}
            value={serviceData?.city}
            onChange={handleInputChange}
            label={"City: "}
            placeholder={"Enter your city"}
          />
          <FormGroupComponent
            type={"select"}
            keyValueSelect={true}
            name={"state"}
            value={serviceData?.state}
            onChange={handleInputChange}
            label={"State: "}
            placeholder={"Choose State"}
            options={states}
          />
          <FormGroupComponent
            type={"text"}
            name={"zip"}
            value={serviceData?.zip}
            onChange={handleInputChange}
            label={"Zip: "}
            placeholder={"Enter zip code"}
          />
          <FormGroupComponent
            generalName={"How would you prefer to be contacted?:"}
            name={"contactThrough"}
            options={contactOptions}
            type={"radio"}
            value={serviceData?.contactThrough}
            onChange={handleInputChange}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0 1.5rem",
              alignSelf: "start",
            }}
          />
        </OptimizedGridLayout>
        <FormButton>Submit Request</FormButton>
        <NormalPara>
          The use of the tire and other automotive data and information
          accessible through this webpage is limited to and intended for persons
          located in the United States of America and Canada.
        </NormalPara>
        <OptimizedSectionPara>
          ALTHOUGH THE DATA AND INFORMATION ARE BELIEVED TO BE ACCURATE, NO
          WARRANTY OR GUARANTEE IS MADE REGARDING THE QUALITY OR ACCURACY OF THE
          DATA. YOU ASSUME ALL RISK RELATED TO THE DATA AND ITS USE.
        </OptimizedSectionPara>
      </Container>
    </SchedulePageContainer>
  );
};

const SchedulePageContainer = styled.div``;

const OptimizedSectionPara = styled(SectionPara)`
  text-align: left;
`;

const OptimizedGridLayout = styled(GridLayoutContainer)`
  grid-template-columns: repeat(2, 1fr);
  margin: 2rem auto;
  max-width: 928px;

  @media (max-width: 720px) {
    grid-template-columns: ${(props) =>
      props.waitTillMobile ? "repeat(2, 1fr)" : "1fr"};
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const fullColumn = { gridColumn: "1 / -1" };

const Address = styled.address``;
export default ScheduleService;

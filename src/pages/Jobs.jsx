import React, { useState } from "react";
import styled from "styled-components";
import {
  RedBackgroundHeading,
  Container,
  FormButton,
  Form,
  GridLayoutContainer,
  LeftContainer,
  RightContainer,
} from "../components/reusables/Styles";
import { FormGroupComponent } from "../components/reusables/Components";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
];

// const leftGroup = [{label: "First Name", placeholder: "Enter First Name", name: "firstName", v}];

const Jobs = () => {
  const [jobData, setJobData] = useState(() => new FormData());

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.type === "file" ? e.target.files : e.target.value;
    // setJobData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setJobData((prev) => {
      let copyData = new FormData();
      for (const [key, value] of prev) {
        copyData.append(key, value);
      }
      copyData.append(name, value);
      return copyData;
    });
  };
  return (
    <JobPageContainer>
      <RedBackgroundHeading>Jobs</RedBackgroundHeading>
      <Container style={{ margin: "2rem auto" }}>
        <Para>
          Acorn Tire & Auto is always looking for top talent to join our team.
          If you are a quality conscious worker committed to producing the kind
          of results our customers have come to expect over the years, we want
          to talk to you! We offer a great work environment committed to quality
          and reward our team members accordingly. Continuing education
          opportunities and ongoing training are just a few of the advantages we
          offer. Contact us today to learn more about job opportunities at Acorn
          Tire & Auto!
        </Para>
        <Heading>Fields marked with an asterisk * are required.</Heading>
        <RedBackgroundHeading>
          Please fill out the information below
        </RedBackgroundHeading>
        <Form>
          <GridLayoutContainer>
            <LeftContainer>
              <FormGroupComponent
                label={"First Name*"}
                placeholder={"Enter First Name"}
                name={"firstName"}
                value={jobData?.firstName}
                onChange={handleInputChange}
                type={"text"}
              />
              <FormGroupComponent
                label={"Last Name*"}
                placeholder={"Enter Last Name"}
                name={"lastName"}
                value={jobData?.lastName}
                onChange={handleInputChange}
                type={"text"}
              />
              <FormGroupComponent
                label={"Email Address*"}
                placeholder={"Enter Email Address"}
                name={"email"}
                value={jobData?.email}
                onChange={handleInputChange}
                type={"email"}
              />
              <FormGroupComponent
                label={"Address"}
                placeholder={"Enter Address"}
                name={"address"}
                value={jobData?.address}
                onChange={handleInputChange}
                type={"text"}
              />
              <FormGroupComponent
                label={"City"}
                placeholder={"Enter City"}
                name={"city"}
                value={jobData?.city}
                onChange={handleInputChange}
                type={"text"}
              />
            </LeftContainer>
            <RightContainer>
              <FormGroupComponent
                label={"State"}
                value={jobData?.state}
                onChange={handleInputChange}
                placeholder={"Choose a state"}
                name={"state"}
                type={"select"}
                options={states}
              />
              <FormGroupComponent
                label={"Zip Code"}
                value={jobData?.state}
                onChange={handleInputChange}
                placeholder={"Enter Zip Code"}
                name={"zipCode"}
                type={"text"}
              />
              <FormGroupComponent
                label={"Telephone"}
                placeholder={"Enter tel"}
                name={"tel"}
                value={jobData?.tel}
                onChange={handleInputChange}
                type={"text"}
              />
              <FormGroupComponent
                label={"Position Applying for"}
                placeholder={"Enter position"}
                name={"positionApplyingFor"}
                value={jobData?.positionApplyingFor}
                onChange={handleInputChange}
                type={"text"}
              />
              <FormGroupComponent
                label={"Attach Your Resume"}
                placeholder={"Attach Resume"}
                name={"resume"}
                value={jobData?.resume}
                onChange={handleInputChange}
                type={"file"}
              />
            </RightContainer>
          </GridLayoutContainer>
          <FormButton>Submit</FormButton>
        </Form>
      </Container>
    </JobPageContainer>
  );
};

const JobPageContainer = styled.div``;

const Para = styled.p`
  font-family: var(--mont);
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const Heading = styled.h3`
  font-family: var(--mont);
  font-weight: 700;
  font-size: 1.3rem;
  margin: 1.5rem 0 1rem;
`;
export default Jobs;

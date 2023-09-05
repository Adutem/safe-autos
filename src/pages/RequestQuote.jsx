import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import {
  FormGroup,
  FormGroupComponent,
  Input,
  Label,
} from "../components/reusables/Components";
import { useGlobalContext } from "../contexts/GlobalContext";
import { contactOptions } from "./ScheduleService";

const RequestQuote = () => {
  const [quotingData, setQuotingData] = useState({ sendEmailsAndPromo: "No" });
  const { models, makes, modelYears, states, services } = useGlobalContext();
  const { state } = useLocation();

  const handleInputChange = (e) => {
    if (e.target.name === "sendEmailsAndPromo") {
      if (e.target.checked) {
        return setQuotingData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      }
      return setQuotingData((prev) => ({ ...prev, [e.target.name]: "No" }));
    }
    if (e.target.name === "serviceType") {
      let name = e.target.name;
      let value = e.target.value;
      return setQuotingData((prev) => {
        if (!prev.serviceType || prev.serviceType.length === 0) {
          return { ...prev, [name]: [value] };
        }
        let alreadyExist = prev.serviceType.find((type) => type === value);
        if (!alreadyExist) return { ...prev, [name]: [...prev[name], value] };
        let newServiceTypes = prev.serviceType.filter((type) => type !== value);
        return { ...prev, [name]: newServiceTypes };
      });
    }
    setQuotingData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (state && state?.serviceName) {
      handleInputChange({
        target: { name: "serviceType", value: state.serviceName },
      });
    }
  }, []);

  return (
    <QuotingPageContainer>
      <RedBackgroundHeading>Your Quote Cart</RedBackgroundHeading>
      <Container style={{ margin: "2rem auto" }}>
        <OptimizedSectionPara>
          We will send you a quote of the following:
        </OptimizedSectionPara>
        <SelectedQuotingContainer>
          {console.log(quotingData)}
          {quotingData?.serviceType?.map((type) => (
            <QuotingPara>{type}</QuotingPara>
          ))}
        </SelectedQuotingContainer>
        <OptimizedSectionPara>
          Select an additional service you need:
        </OptimizedSectionPara>
        <OptimizedGridLayout style={{ margin: "1rem" }}>
          <FormGroupComponent
            type={"checkbox"}
            name={"serviceType"}
            options={services.slice(1)}
            onChange={handleInputChange}
            radioSelections={quotingData?.serviceType || []}
          />
        </OptimizedGridLayout>
        <OptimizedSectionPara>
          Please provide your vehicle information:
        </OptimizedSectionPara>
        <OptimizedGridLayout style={{ margin: "0 1rem 1rem" }}>
          <LeftContainer>
            <FormGroupComponent
              type={"select"}
              options={["Select Year", ...modelYears.reverse()]}
              name={"year"}
              value={quotingData?.year}
              placeholder={"Select Year"}
              onChange={handleInputChange}
            />
            <FormGroupComponent
              type={"select"}
              options={["Select Model", ...models]}
              name={"model"}
              value={quotingData?.model}
              placeholder={"Select Model"}
              onChange={handleInputChange}
            />
          </LeftContainer>
          <RightContainer>
            <FormGroupComponent
              type={"select"}
              options={["Select Make", ...makes]}
              name={"make"}
              value={quotingData?.make}
              placeholder={"Select Make"}
              onChange={handleInputChange}
            />
            <FormGroupComponent
              type={"select"}
              options={[]}
              name={"option"}
              value={quotingData?.option}
              placeholder={"Select Option"}
              onChange={handleInputChange}
            />
          </RightContainer>
        </OptimizedGridLayout>
        <OptimizedSectionPara>
          Tell us a little about yourself:
        </OptimizedSectionPara>
        <OptimizedGridLayout>
          <FormGroupComponent
            type={"text"}
            name={"firstName"}
            value={quotingData?.firstName}
            label={"First Name: *"}
            onChange={handleInputChange}
            placeholder={"Enter your last name"}
          />
          <FormGroupComponent
            type={"text"}
            name={"lastName"}
            value={quotingData?.lastName}
            label={"Last Name: *"}
            onChange={handleInputChange}
            placeholder={"Enter your last name"}
          />
          <FormGroupComponent
            type={"email"}
            name={"email"}
            value={quotingData?.email}
            onChange={handleInputChange}
            label={"Email: *"}
            placeholder={"Enter your email"}
          />
          <FormGroupComponent
            type={"text"}
            name={"phoneNumber"}
            value={quotingData?.phoneNumber}
            onChange={handleInputChange}
            label={"Phone(xxx)xxx-xxxx:"}
            placeholder={"Enter your phone number"}
          />
          <FormGroupComponent
            type={"text"}
            name={"address"}
            value={quotingData?.address}
            onChange={handleInputChange}
            label={"Address: "}
            placeholder={"Enter your address"}
            style={fullColumn}
          />
          <FormGroupComponent
            type={"text"}
            name={"city"}
            value={quotingData?.city}
            onChange={handleInputChange}
            label={"City: "}
            placeholder={"Enter your city"}
          />
          <FormGroupComponent
            type={"select"}
            keyValueSelect={true}
            name={"state"}
            value={quotingData?.state}
            onChange={handleInputChange}
            label={"State: "}
            placeholder={"Choose State"}
            options={states}
          />
          <FormGroupComponent
            type={"text"}
            name={"zip"}
            value={quotingData?.zip}
            onChange={handleInputChange}
            label={"Zip: "}
            placeholder={"Enter zip code"}
          />
          <FormGroupComponent
            type={"textarea"}
            shouldResize={"vertical"}
            name={"comment"}
            value={quotingData?.comment}
            onChange={handleInputChange}
            label={"Comments: "}
            placeholder={"Enter your comment"}
            inputStyle={{ minHeight: "150px" }}
          />
          <FormGroup
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: "0.5rem",
              ...fullColumn,
            }}
          >
            <Input
              type="checkbox"
              name="sendEmailsAndPromo"
              value={"Yes"}
              onChange={handleInputChange}
              style={{ minWidth: "initial", width: "initial" }}
              id={"sendEmailsAndPromo"}
            />
            <Label htmlFor={"sendEmailsAndPromo"}>
              I would like to receive periodic emails regarding special offers
              and/or promotions.
            </Label>
          </FormGroup>
        </OptimizedGridLayout>
        <FormButton>Submit Request</FormButton>
      </Container>
    </QuotingPageContainer>
  );
};

const QuotingPageContainer = styled.div``;

const OptimizedSectionPara = styled(SectionPara)`
  text-align: left;
  margin-top: 2rem;
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

const SelectedQuotingContainer = styled.div`
  padding: 1rem;
  background: #f1f1f1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  margin: 1rem 0;
`;

const QuotingPara = styled.p`
  font-size: 1.1rem;
  font-family: var(--teko);
`;

export default RequestQuote;

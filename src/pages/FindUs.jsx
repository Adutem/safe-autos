import React from "react";
import styled from "styled-components";
import {
  ButtonLink,
  Container,
  NormalPara,
  RedBackgroundHeading,
  SectionHeading,
  SectionPara,
} from "../components/reusables/Styles";
import { DaysOfOperationComponent } from "../components/reusables/Components";
import GoogleMapComp from "../components/reusables/GoogleMapComp";
import creditCard from "../assets/payment-card.jpg";
import checkImage from "../assets/check.svg";
import cashImage from "../assets/cash.svg";
import discoverImage from "../assets/discover.svg";
import mastercardImage from "../assets/mastercard.svg";
import visaImage from "../assets/visa.svg";
import serviceLocations from "../data/service-location-data";

const methods = [
  {
    type: "Check",
    imgUrl: checkImage,
  },
  {
    type: "Cash",
    imgUrl: cashImage,
  },
  {
    type: "Discover",
    imgUrl: discoverImage,
  },
  {
    type: "MasterCard",
    imgUrl: mastercardImage,
  },
  {
    type: "Visa",
    imgUrl: visaImage,
  },
];

const FindUs = () => {
  return (
    <FindUsPageContainer>
      <RedBackgroundHeading>Find Us</RedBackgroundHeading>
      <Container>
        <DaysOfOperationComponent />
        <GoogleMapComp />
        <RedBackgroundHeading>
          Acorn Tire & Auto LLC. 591 S Lapeer Rd. Lake Orion, MI 48362
        </RedBackgroundHeading>
        <Actions>
          <ButtonLink
            to={
              "https://www.google.com/maps/place/591+S+Lapeer+Rd,+Lake+Orion,+MI+48362/@42.775254,-83.238598,14z/data=!4m6!3m5!1s0x8824ecda1562952f:0x3f2fb58be35f7fe4!8m2!3d42.7752542!4d-83.2385977!16s%2Fg%2F11b8vch87h?hl=en&entry=ttu"
            }
            target="_blank"
            style={{ maxWidth: "initial" }}
          >
            Get Directions
          </ButtonLink>
          <ButtonLink to="tel:(248) 693-7979" style={{ maxWidth: "initial" }}>
            (248-693-7979) Call Us
          </ButtonLink>
        </Actions>
        {/* <ReviewContainer>
          <SectionPara>Average Rating: ⭐⭐⭐⭐⭐</SectionPara>
          <Actions style={{ flex: 1, margin: 0 }}>
            <ButtonLink to={"/about/reviews"} style={{ maxWidth: "initial" }}>
              Read Reviews
            </ButtonLink>
            <ButtonLink
              to="/about/write-review"
              style={{ maxWidth: "initial" }}
            >
              Leave Review
            </ButtonLink>
          </Actions>
        </ReviewContainer> */}
        <SectionHeading>Conenct with us</SectionHeading>
        <br />
        <SocialCompCardCont>
          {serviceLocations.map((location) => (
            <SocialComponent {...location} />
          ))}
        </SocialCompCardCont>
        <PaymentSection>
          <PaymentSectionHeader>
            <CreditCardImageContaier>
              <CreditCardImage src={creditCard} />
            </CreditCardImageContaier>
            <SectionPara>Payment Methods</SectionPara>
          </PaymentSectionHeader>
          <PaymentMethods>
            {methods.map((method) => (
              <PaymentMethodContainer>
                <PaymentImageContainer>
                  <PaymentImage src={method.imgUrl} />
                </PaymentImageContainer>
                <NormalPara>{method.type}</NormalPara>
              </PaymentMethodContainer>
            ))}
          </PaymentMethods>
        </PaymentSection>
      </Container>
    </FindUsPageContainer>
  );
};

const FindUsPageContainer = styled.div``;

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f1f1f1;
  padding: 1rem;
  margin: 2rem 0;
  gap: 4rem;

  @media (max-width: 928px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
`;

const CreditCardImageContaier = styled.div``;
const CreditCardImage = styled.img``;

const PaymentSection = styled.div`
  margin: 2rem 0;
`;

const PaymentSectionHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const PaymentImageContainer = styled.div`
  width: 40px;
`;
const PaymentImage = styled.img``;
const PaymentMethodContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const SocialCompCardCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialComponent = ({
  shopLocation,
  phoneNumber,
  email,
  facebookLink,
}) => {
  return (
    <SocialComponentCont>
      <ShopLocationText>{shopLocation}</ShopLocationText>
      <OptimizedNormalPara>
        <strong>Email: </strong> <a href={`mailto:${email}`}>{email}</a>
      </OptimizedNormalPara>
      <OptimizedNormalPara>
        <strong>Tel: </strong> <a href={`tel:+${phoneNumber}`}>{phoneNumber}</a>
      </OptimizedNormalPara>
      <OptimizedNormalPara>
        <strong>Facebook: </strong>
        <a href={`${facebookLink}`} target="_blank">
          {facebookLink}
        </a>
      </OptimizedNormalPara>
    </SocialComponentCont>
  );
};

const SocialComponentCont = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #f1f1f1;
  gap: 0.3rem;
`;

const ShopLocationText = styled.h3`
  font-family: var(--teko);
`;

const OptimizedNormalPara = styled(NormalPara)`
  font-size: 0.85rem;
  margin: 0;
`;
export default FindUs;

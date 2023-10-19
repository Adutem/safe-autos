import React from "react";
import styled from "styled-components";
import {
  ButtonLink,
  Container,
  NormalPara,
  RedBackgroundHeading,
} from "../components/reusables/Styles";
import { SearchComponent } from "../components/Advert";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useSelector } from "react-redux";
import ReviewCard from "../components/ReviewCard";

const Reviews = () => {
  const { displayLocationModal, currentStoreLocation } = useGlobalContext();
  const { reviews } = useSelector((state) => state.review);

  return (
    <ReviewPageContainer>
      <RedBackgroundHeading>Reviews</RedBackgroundHeading>
      <Container>
        <ContentContainer>
          <LeftContainer>
            <Card>
              <Heading>Review By Location</Heading>
              <SearchComponent
                showShowModal={displayLocationModal}
                currentLocation={currentStoreLocation}
                style={{ marginTop: "1.5rem" }}
                linkType={"link"}
                hideBrowseLink={true}
              />
              {/* <Address>
                <SmallPara>591 S Lapeer Road</SmallPara>
                <SmallPara>Lake Orion, MI 48362</SmallPara>
                <SmallPara>Phone: 248-693-7979</SmallPara>
              </Address> */}
              <ButtonLink
                to="/submit-a-review"
                style={{
                  fontSize: "0.9rem",
                  padding: "0.7rem",
                  maxWidth: "initial",
                }}
              >
                Submit A review
              </ButtonLink>
            </Card>
            <Card>
              <Heading>Review By Service</Heading>
              <ButtonLink
                to="/services"
                style={{
                  fontSize: "0.9rem",
                  padding: "0.7rem",
                  maxWidth: "initial",
                }}
              >
                Schedule Service Online
              </ButtonLink>
            </Card>
            <Card>
              <Heading>Average Rating 5.0</Heading>
              <div>
                <StarRating background={"#33CCFF"}>5 Stars</StarRating>
                <StarRating background={"#D6FFD6"} bdc={"#33FF33"}>
                  4 Stars
                </StarRating>
                <StarRating background={"#FFFFD6"} bdc={"#FFFF33"}>
                  3 Stars
                </StarRating>
                <StarRating background={"#FFEBD6"} bdc={"#FF9933"}>
                  2 Stars
                </StarRating>
                <StarRating background={"#FFD6D6"} bdc={"#FF3333"}>
                  1 Stars
                </StarRating>
              </div>
            </Card>
          </LeftContainer>
          <RightContainer>
            <SmallPara>
              Customer satisfaction is our top priority. We have earned a
              longstanding reputation for delivering quality repairs, whether
              you require routine auto maintenance services or essential car
              repairs.
            </SmallPara>
            <SmallPara>
              Don’t forget to rate your service and tell us how we did. By
              sharing your thoughts, you will help us grow.
            </SmallPara>
            <Card
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <SmallPara>Showing 1-1 of 1 reviews</SmallPara>
              <SmallPara>
                Sort Reviews By{" "}
                <select name="sort-by">
                  <option value={"rating"}>Star Rating</option>
                  <option value={"recent"}>Mo st Recent</option>
                </select>
              </SmallPara>
            </Card>
            {currentStoreLocation ? (
              reviews.length === 0 ? (
                <NormalPara>No reviews</NormalPara>
              ) : (
                reviews.map((review) => <ReviewCard {...review} />)
              )
            ) : (
              <NormalPara>Pick a store location to see reviews</NormalPara>
            )}
          </RightContainer>
        </ContentContainer>
      </Container>
    </ReviewPageContainer>
  );
};

const ReviewPageContainer = styled.div``;
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: 792px) {
    grid-template-columns: 1fr;
  }
`;

const LeftContainer = styled.div``;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Card = styled.div`
  background: #f1f1f1;
  padding: 1.5rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SmallPara = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
  font-family: var(--mont);
`;

const Heading = styled.h2`
  font-family: var(--mont);
`;

const StarRating = styled.p`
  text-align: right;
  background: ${(props) => props.background};
  border-left: 8px solid ${(props) => props.bdc || props.background};
  color: #000;
  font-family: var(--mont);
  font-weight: 600;
  padding: 0.5rem;
`;
export default Reviews;

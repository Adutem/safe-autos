import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  Container,
  RedBackgroundHeading,
  Button,
} from "../components/reusables/Styles";
import { FormGroupComponent } from "../components/reusables/Components";

const ratings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const SubmitReview = () => {
  const [reviewData, setReviewData] = useState({});
  const formRef = useRef(null);
  const [reviewing, setReviewing] = useState(false);

  const handleInputChange = (e) => {
    setReviewData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitReview = (e) => {
    e.preventDefault();
    console.log(reviewData);
  };

  return (
    <SubmitReviewPageContainer>
      <RedBackgroundHeading>Submit a review</RedBackgroundHeading>
      <Container style={{ margin: "2rem auto", maxWidth: "928px" }}>
        <SubmitReviewForm ref={formRef}>
          <FormGroupComponent
            type={"text"}
            name={"fullName"}
            value={reviewData?.fullName}
            label={"Enter your name"}
            placeholder={"Enter your name"}
            onChange={handleInputChange}
          />
          <FormGroupComponent
            type={"select"}
            name={"rating"}
            value={reviewData?.rating}
            onChange={handleInputChange}
            label={"Rating"}
            options={ratings}
          />
          <FormGroupComponent
            type={"textarea"}
            label={"Your review"}
            name={"message"}
            placeholder={"Enter your review"}
            onChange={handleInputChange}
            value={reviewData?.message}
          />
          <Button disabled={reviewing} onClick={submitReview}>
            Submit Review
          </Button>
        </SubmitReviewForm>
      </Container>
    </SubmitReviewPageContainer>
  );
};

const SubmitReviewPageContainer = styled.div``;

const SubmitReviewForm = styled.form``;

export default SubmitReview;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Container,
  RedBackgroundHeading,
  Button,
} from "../components/reusables/Styles";
import { FormGroupComponent } from "../components/reusables/Components";
import {
  BASE_URL,
  toastError,
  toastSuccess,
  useGlobalContext,
} from "../contexts/GlobalContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getReview } from "../redux";

// const ratings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
const ratings = [0, 1, 2, 3, 4, 5];
const customId = "ajwie";
const requiredFields = ["fullName", "rating", "message"];

const SubmitReview = () => {
  const [reviewData, setReviewData] = useState({ rating: 5 });
  const formRef = useRef(null);
  const [reviewing, setReviewing] = useState(false);
  const { allFieldsPresent, currentStoreLocation } = useGlobalContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setReviewData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!allFieldsPresent(requiredFields, reviewData))
      return toastError("Please fill all fields", customId);
    if (!currentStoreLocation) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
      return toastError("Please choose a store location to rate", customId);
    }
    const toastId = toast.loading("Submitting review");
    try {
      setReviewing(true);
      let response = await axios.post(`${BASE_URL}/review`, reviewData);
      toastSuccess(response.data.message, toastId, true);
      dispatch(getReview(currentStoreLocation.shopLocation));
      navigate("/about/reviews");
      setReviewing(false);
    } catch (error) {
      toastError(error?.response?.data?.message, toastId, true);
      setReviewing(false);
    }
  };

  useEffect(() => {
    if (currentStoreLocation) {
      setReviewData((prev) => ({
        ...prev,
        shopLocation: currentStoreLocation.shopLocation.replace(/\n/g, ""),
      }));
      const anchorEl = document.createElement("a");
      anchorEl.href = "#review-form-id";
      anchorEl.click();
    }
  }, [currentStoreLocation]);

  return (
    <SubmitReviewPageContainer>
      <RedBackgroundHeading>Submit a review</RedBackgroundHeading>
      <Container style={{ margin: "2rem auto", maxWidth: "928px" }}>
        <SubmitReviewForm ref={formRef} id="review-form-id">
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

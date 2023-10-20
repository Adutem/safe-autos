import React, { useState, useRef } from "react";
import { AdminContainer, CancelEdit, EditIcon, SaveChange } from "./Dashboard";
import {
  NormalPara,
  PortalModalContainer,
  SectionHeading,
  SectionPara,
} from "../../components/reusables/Styles";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Author } from "../../components/ReviewCard";
import { FormGroupComponent } from "../../components/reusables/Components";
import {
  BASE_URL,
  getFromLocalStorage,
  toastError,
  toastSuccess,
  useGlobalContext,
} from "../../contexts/GlobalContext";
import { toast } from "react-toastify";
import { getReview } from "../../redux";
import axios from "axios";

const ReviewAdmin = () => {
  const review = useSelector((state) => state.review);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentDeleteId, setCurrentDeleteId] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { currentStoreLocation } = useGlobalContext();

  const updateCurrentItem = (data) => {
    setCurrentItem(data);
  };

  const updateDeleteReviewId = (reviewId) => {
    setCurrentDeleteId(reviewId);
  };

  const handleEdit = (data) => {
    updateCurrentItem(data);
    setShowDeleteModal(false);
    setShowEditModal(true);
  };

  const handleDelete = (reviewId) => {
    updateDeleteReviewId(reviewId);
    setShowEditModal(false);
    setShowDeleteModal(true);
  };

  const handleCancelAction = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
    setCurrentDeleteId("");
    setCurrentItem(null);
  };

  const confirmEdit = async (data) => {
    console.log("Edited data", data);
    const reviewId = data._id;
    const accessToken = getFromLocalStorage("accessToken");
    if (!reviewId || !accessToken) return handleCancelAction();
    const toastId = toast.loading("Updating review");
    try {
      setIsSaving(true);
      let response = await axios.patch(
        `${BASE_URL}/review/${reviewId}`,
        { rating: data.rating, message: data.message },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toastSuccess(response.data.message, toastId, true);
      dispatch(getReview(currentStoreLocation.shopLocation));
      handleCancelAction();
      setIsSaving(false);
    } catch (error) {
      toastError(error?.response?.data.message, toastId, true);
      handleCancelAction();
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    console.log("Deleted data id", currentDeleteId);
    const accessToken = getFromLocalStorage("accessToken");
    if (!currentDeleteId || !accessToken) return handleCancelAction();
    const toastId = toast.loading("Deleting review");
    try {
      setIsDeleting(true);
      let response = await axios.delete(
        `${BASE_URL}/review/${currentDeleteId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toastSuccess(response.data.message, toastId, true);
      dispatch(getReview(currentStoreLocation.shopLocation));
      handleCancelAction();
      setIsDeleting(false);
    } catch (error) {
      toastError(error?.response?.data.message, toastId, true);
      handleCancelAction();
      setIsDeleting(false);
    }
  };
  return (
    <AdminContainer>
      <SectionHeading
        style={{ wordSpacing: "initial", margin: 0, fontWeight: "bold" }}
      >
        Review Page
      </SectionHeading>
      <SectionPara style={{ textAlign: "left", fontSize: "1.5rem" }}>
        Reviews
      </SectionPara>
      {review.loading && <NormalPara>Loading reviews...</NormalPara>}
      {currentStoreLocation && !review.loading && !review.reviews.length && (
        <NormalPara>No reviews for this location</NormalPara>
      )}
      {currentStoreLocation ? (
        !review.loading &&
        review.reviews.length > 0 && (
          <Reviews>
            <ReviewCardContainer>
              {review.reviews.map((rev) => (
                <ReviewCard
                  {...rev}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </ReviewCardContainer>
          </Reviews>
        )
      ) : (
        <NormalPara>Pick a store location to see available reviews</NormalPara>
      )}
      {showEditModal && (
        <EditModal
          currentItem={currentItem}
          handleCancelAction={handleCancelAction}
          confirmEdit={confirmEdit}
          isSaving={isSaving}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          currentDeleteId={currentDeleteId}
          handleCancelAction={handleCancelAction}
          confirmDelete={confirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </AdminContainer>
  );
};

const Reviews = styled.div`
  margin: 1rem auto;
`;

export const ReviewCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReviewCard = ({
  _id,
  fullName,
  rating,
  message,
  handleDelete,
  handleEdit,
  hideActions,
}) => {
  return (
    <ReviewCardCont data-id={_id}>
      <ReviewDetails>
        <Author style={{ color: "#000", margin: 0 }}>By: {fullName}</Author>
        <NormalPara style={{ margin: 0, fontSize: "0.85rem", fontWeight: 500 }}>
          <b>
            <i>Rating:</i>
          </b>{" "}
          {rating}
        </NormalPara>
        <NormalPara style={{ margin: 0, fontSize: "0.85rem", fontWeight: 500 }}>
          {message}
        </NormalPara>
      </ReviewDetails>
      {hideActions || (
        <ReviewActions>
          <EditIcon
            onClick={() => handleEdit({ _id, fullName, rating, message })}
          >
            <i className="fi fi-sr-pencil"></i>
          </EditIcon>
          <EditIcon onClick={() => handleDelete(_id)}>
            <i className="fi fi-sr-trash-xmark"></i>
          </EditIcon>
        </ReviewActions>
      )}
    </ReviewCardCont>
  );
};

const ReviewCardCont = styled.div`
  padding: 0 0 1rem 1rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.19);
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ReviewDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditModal = ({
  handleCancelAction,
  currentItem,
  confirmEdit,
  isSaving,
}) => {
  const portalRef = useRef(null);
  const [reviewData, setReviewData] = useState(() => currentItem);

  const handleInputChange = (e) => {
    return setReviewData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = () => {
    if (!reviewData?.rating || !reviewData.message)
      return toastError("Please fill all fields", "afdasf");
    confirmEdit(reviewData);
  };

  return (
    <PortalModalContainer
      onClick={(e) => {
        if (e.target !== portalRef.current) return;
        return handleCancelAction();
      }}
      ref={portalRef}
    >
      <EditModalContContainer>
        <SectionPara>Edit review</SectionPara>
        <FormGroupComponent
          type={"select"}
          name={"rating"}
          value={reviewData?.rating}
          onChange={handleInputChange}
          label={"Rating"}
          options={[0, 1, 2, 3, 4, 5]}
        />
        <FormGroupComponent
          type={"textarea"}
          label={"Your review"}
          name={"message"}
          placeholder={"Enter your review"}
          onChange={handleInputChange}
          value={reviewData?.message}
        />
        <ReviewActions style={{ justifyContent: "flex-end" }}>
          <SaveChange style={{ padding: "1rem" }} onClick={handleSaveChanges}>
            {isSaving ? "Saving..." : "Save Changes"}
          </SaveChange>
          {isSaving || (
            <CancelEdit onClick={handleCancelAction}>Cancel</CancelEdit>
          )}
        </ReviewActions>
      </EditModalContContainer>
    </PortalModalContainer>
  );
};

const EditModalContContainer = styled.div`
  width: 90%;
  max-width: 350px;
  background: #fff;
  padding: 1rem;
`;

const DeleteModal = ({ handleCancelAction, confirmDelete, isDeleting }) => {
  const portalRef = useRef(null);

  return (
    <PortalModalContainer
      onClick={(e) => {
        if (e.target !== portalRef.current) return;
        return handleCancelAction();
      }}
      ref={portalRef}
      style={{ height: "100%" }}
    >
      <DeleteModalContContainer>
        <SectionPara>Delete this review</SectionPara>
        <NormalPara> Are you sure you want to proceed?</NormalPara>
        <ReviewActions
          style={{ marginTop: "1rem", justifyContent: "flex-end" }}
        >
          <SaveChange onClick={confirmDelete}>
            {isDeleting ? "Deleting..." : "Yes"}
          </SaveChange>
          {isDeleting || (
            <SaveChange onClick={handleCancelAction}>No</SaveChange>
          )}
        </ReviewActions>
      </DeleteModalContContainer>
    </PortalModalContainer>
  );
};

const DeleteModalContContainer = styled.div`
  width: 90%;
  max-width: 300px;
  min-height: 150px;
  background: #fff;
  padding: 1rem;

  p:nth-child(2) {
    margin: 0;
    font-size: 0.9rem;
  }
`;

const CreateModal = ({
  handleCancelAction,
  confirmCreate,
  isCreating,
  // currentStoreLocation,
}) => {
  const portalRef = useRef(null);
  const [reviewData, setReviewData] = useState({});

  const handleInputChange = (e) => {
    return setReviewData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = () => {
    if (!reviewData?.role || !reviewData.reviewLink)
      return toastError("Please fill all fields", "afdasf");
    confirmCreate({
      ...reviewData,
      // shopLocation: currentStoreLocation.shopLocation,
    });
  };

  return (
    <PortalModalContainer
      onClick={(e) => {
        if (e.target !== portalRef.current) return;
        return handleCancelAction();
      }}
      ref={portalRef}
    >
      <EditModalContContainer>
        <SectionPara>Create review</SectionPara>
        <FormGroupComponent
          label={"Role: "}
          name={"role"}
          value={reviewData?.role}
          placeholder={"Enter role"}
          onChange={handleInputChange}
        />
        <FormGroupComponent
          label={"Review Link: "}
          name={"reviewLink"}
          value={reviewData?.reviewLink}
          placeholder={"Enter review link"}
          onChange={handleInputChange}
        />
        <ReviewActions style={{ justifyContent: "flex-end" }}>
          <SaveChange style={{ padding: "1rem" }} onClick={handleSaveChanges}>
            {isCreating ? "Creating..." : "Create"}
          </SaveChange>
          {isCreating || (
            <CancelEdit onClick={handleCancelAction}>Cancel</CancelEdit>
          )}
        </ReviewActions>
      </EditModalContContainer>
    </PortalModalContainer>
  );
};

export default ReviewAdmin;

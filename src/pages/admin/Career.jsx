import React, { useRef, useState } from "react";
import { AdminContainer, CancelEdit, EditIcon, SaveChange } from "./Dashboard";
import {
  NormalPara,
  PortalModalContainer,
  SectionHeading,
  SectionPara,
} from "../../components/reusables/Styles";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormGroupComponent } from "../../components/reusables/Components";
import axios from "axios";
import {
  BASE_URL,
  getFromLocalStorage,
  toastError,
  toastSuccess,
} from "../../contexts/GlobalContext";
import { toast } from "react-toastify";
import { getCareer } from "../../redux";

const Career = () => {
  const career = useSelector((state) => state.career);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentDeleteId, setCurrentDeleteId] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const updateCurrentItem = (data) => {
    setCurrentItem(data);
  };

  const updateDeleteCareerId = (careerId) => {
    setCurrentDeleteId(careerId);
  };

  const handleEdit = (data) => {
    updateCurrentItem(data);
    setShowDeleteModal(false);
    setShowEditModal(true);
  };

  const handleDelete = (careerId) => {
    updateDeleteCareerId(careerId);
    setShowEditModal(false);
    setShowDeleteModal(true);
  };

  const handleCancelAction = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowCreateModal(false);
    setCurrentDeleteId("");
    setCurrentItem(null);
  };

  const confirmEdit = async (data) => {
    console.log("Edited data", data);
    const careerId = data._id;
    const accessToken = getFromLocalStorage("accessToken");
    if (!careerId || !accessToken) return handleCancelAction();
    const toastId = toast.loading("Updating career");
    try {
      setIsSaving(true);
      let response = await axios.patch(
        `${BASE_URL}/career/${careerId}`,
        { role: data.role, careerLink: data.careerLink },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toastSuccess(response.data.message, toastId, true);
      dispatch(getCareer());
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
    const toastId = toast.loading("Deleting career");
    try {
      setIsDeleting(true);
      let response = await axios.delete(
        `${BASE_URL}/career/${currentDeleteId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toastSuccess(response.data.message, toastId, true);
      dispatch(getCareer());
      handleCancelAction();
      setIsDeleting(false);
    } catch (error) {
      toastError(error?.response?.data.message, toastId, true);
      handleCancelAction();
      setIsDeleting(false);
    }
  };

  const confirmCreate = async (data) => {
    console.log("Create data", data);
    const accessToken = getFromLocalStorage("accessToken");
    if (!accessToken) return handleCancelAction();
    const toastId = toast.loading("Creating career");
    try {
      setIsCreating(true);
      let response = await axios.post(
        `${BASE_URL}/career`,
        { role: data.role, careerLink: data.careerLink },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toastSuccess(response.data.message, toastId, true);
      dispatch(getCareer());
      handleCancelAction();
      setIsCreating(false);
    } catch (error) {
      toastError(error?.response?.data.message, toastId, true);
      handleCancelAction();
      setIsCreating(false);
    }
  };

  return (
    <AdminContainer>
      <SectionHeading
        style={{ wordSpacing: "initial", margin: 0, fontWeight: "bold" }}
      >
        Career Page
      </SectionHeading>
      <SaveChange
        style={{ padding: "1rem" }}
        onClick={() => setShowCreateModal(true)}
      >
        Create new career
      </SaveChange>
      <br />
      <br />
      <SectionPara style={{ textAlign: "left" }}>Careers</SectionPara>
      <Careers>
        <CareerCardContainer>
          {career.careers.map((car) => (
            <CareerCard
              {...car}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </CareerCardContainer>
      </Careers>
      {showEditModal && (
        <EditModal
          currentItem={currentItem}
          handleCancelAction={handleCancelAction}
          confirmEdit={confirmEdit}
          isSaving={isSaving}
        />
      )}
      {showCreateModal && (
        <CreateModal
          handleCancelAction={handleCancelAction}
          confirmCreate={confirmCreate}
          isCreating={isCreating}
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

export default Career;

const Careers = styled.div``;

export const CareerCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CareerCard = ({
  _id,
  role,
  careerLink,
  handleDelete,
  handleEdit,
  hideActions,
}) => {
  return (
    <CareerCardCont data-id={_id}>
      <CareerDetails>
        <Role>Role: {role}</Role>
        <NormalPara style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600 }}>
          Career Link: <CareerLink> {careerLink}</CareerLink>{" "}
        </NormalPara>
      </CareerDetails>
      {hideActions || (
        <CareerActions>
          <EditIcon onClick={() => handleEdit({ _id, role, careerLink })}>
            <i className="fi fi-sr-pencil"></i>
          </EditIcon>
          <EditIcon onClick={() => handleDelete(_id)}>
            <i className="fi fi-sr-trash"></i>
          </EditIcon>
        </CareerActions>
      )}
    </CareerCardCont>
  );
};

const CareerCardCont = styled.div`
  padding: 1rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CareerDetails = styled.div``;

const CareerActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Role = styled(NormalPara)`
  margin: 0;
  font-weight: bold;
  font-size: 1.1rem;
`;

const CareerLink = styled(Link)`
  font-weight: 500;
`;

const EditModal = ({
  handleCancelAction,
  currentItem,
  confirmEdit,
  isSaving,
}) => {
  const portalRef = useRef(null);
  const [careerData, setCareerData] = useState(() => currentItem);

  const handleInputChange = (e) => {
    return setCareerData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = () => {
    if (!careerData?.role || !careerData.careerLink)
      return toastError("Please fill all fields", "afdasf");
    confirmEdit(careerData);
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
        <SectionPara>Edit career</SectionPara>
        <FormGroupComponent
          label={"Role: "}
          name={"role"}
          value={careerData?.role}
          placeholder={"Enter role"}
          onChange={handleInputChange}
        />
        <FormGroupComponent
          label={"Career Link: "}
          name={"careerLink"}
          value={careerData?.careerLink}
          placeholder={"Enter career link"}
          onChange={handleInputChange}
        />
        <CareerActions style={{ justifyContent: "flex-end" }}>
          <SaveChange style={{ padding: "1rem" }} onClick={handleSaveChanges}>
            {isSaving ? "Saving..." : "Save Changes"}
          </SaveChange>
          {isSaving || (
            <CancelEdit onClick={handleCancelAction}>Cancel</CancelEdit>
          )}
        </CareerActions>
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
        <SectionPara>Delete this career</SectionPara>
        <NormalPara> Are you sure you want to proceed?</NormalPara>
        <CareerActions
          style={{ marginTop: "1rem", justifyContent: "flex-end" }}
        >
          <SaveChange onClick={confirmDelete}>
            {isDeleting ? "Deleting..." : "Yes"}
          </SaveChange>
          {isDeleting || (
            <SaveChange onClick={handleCancelAction}>No</SaveChange>
          )}
        </CareerActions>
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

const CreateModal = ({ handleCancelAction, confirmCreate, isCreating }) => {
  const portalRef = useRef(null);
  const [careerData, setCareerData] = useState({});

  const handleInputChange = (e) => {
    return setCareerData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = () => {
    if (!careerData?.role || !careerData.careerLink)
      return toastError("Please fill all fields", "afdasf");
    confirmCreate(careerData);
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
        <SectionPara>Create career</SectionPara>
        <FormGroupComponent
          label={"Role: "}
          name={"role"}
          value={careerData?.role}
          placeholder={"Enter role"}
          onChange={handleInputChange}
        />
        <FormGroupComponent
          label={"Career Link: "}
          name={"careerLink"}
          value={careerData?.careerLink}
          placeholder={"Enter career link"}
          onChange={handleInputChange}
        />
        <CareerActions style={{ justifyContent: "flex-end" }}>
          <SaveChange style={{ padding: "1rem" }} onClick={handleSaveChanges}>
            {isCreating ? "Creating..." : "Create"}
          </SaveChange>
          {isCreating || (
            <CancelEdit onClick={handleCancelAction}>Cancel</CancelEdit>
          )}
        </CareerActions>
      </EditModalContContainer>
    </PortalModalContainer>
  );
};

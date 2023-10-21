import React, { useEffect, useRef, useState } from "react";
import { AdminContainer, CancelEdit, EditIcon, SaveChange } from "./Dashboard";
import {
  Form,
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
  FILE_FORMATS,
  getFromLocalStorage,
  toastError,
  toastInfo,
  toastSuccess,
  useGlobalContext,
} from "../../contexts/GlobalContext";
import { toast } from "react-toastify";
import { createNews, getNews } from "../../redux";
import { v4 as uuidv4 } from "uuid";
import EdittablePara from "../../components/editables/EdittablePara";
import EditableHeading from "../../components/editables/EditableHeading";

const customToastId = "iweiojd";

const NewsAdmin = () => {
  const news = useSelector((state) => state.news);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentDeleteId, setCurrentDeleteId] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { currentStoreLocation } = useGlobalContext();

  const updateCurrentItem = (data) => {
    setCurrentItem(data);
  };

  const updateDeleteNewsId = (newsId) => {
    setCurrentDeleteId(newsId);
  };

  const handleEdit = (data) => {
    updateCurrentItem(data);
    setShowDeleteModal(false);
    setShowEditModal(true);
  };

  const handleDelete = (newsId) => {
    updateDeleteNewsId(newsId);
    setShowEditModal(false);
    setShowDeleteModal(true);
  };

  const handleCancelAction = () => {
    if (news.creating || isDeleting) return;
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowCreateModal(false);
    setCurrentDeleteId("");
    setCurrentItem(null);
  };

  const confirmDelete = async () => {
    console.log("Deleted data id", currentDeleteId);
    const accessToken = getFromLocalStorage("accessToken");
    if (!currentDeleteId || !accessToken) return handleCancelAction();
    const toastId = toast.loading("Deleting news...");
    try {
      setIsDeleting(true);
      let response = await axios.delete(`${BASE_URL}/news/${currentDeleteId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toastSuccess(response.data.message, toastId, true);
      dispatch(getNews(currentStoreLocation.shopLocation));
      handleCancelAction();
      setIsDeleting(false);
    } catch (error) {
      toastError(error?.response?.data.message, toastId, true);
      handleCancelAction();
      setIsDeleting(false);
    }
  };
  return (
    <NewsPageContainer>
      <SectionHeading>News</SectionHeading>
      {currentStoreLocation && (
        <>
          <SaveChange
            style={{ padding: "1rem" }}
            onClick={() => setShowCreateModal(true)}
          >
            Create news
          </SaveChange>
          <br />
          <br />
        </>
      )}
      <SectionPara style={{ textAlign: "left", fontSize: "1.5rem" }}>
        News
      </SectionPara>
      {news.loading && <NormalPara>Loading news</NormalPara>}
      {currentStoreLocation && !news.loading && !news.news.length && (
        <NormalPara>No news yet. Create a new one 👆</NormalPara>
      )}
      {currentStoreLocation ? (
        !news.loading &&
        news.news.length > 0 && (
          <News>
            <NewsCardContainer>
              {news.news.map((car) => (
                <NewsCard
                  {...car}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </NewsCardContainer>
          </News>
        )
      ) : (
        <NormalPara>Pick a store location to available openings</NormalPara>
      )}
      {showCreateModal && (
        <CreateModal
          handleCancelAction={handleCancelAction}
          isCreating={news.creating}
          currentStoreLocation={currentStoreLocation}
          createError={news.createError}
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
    </NewsPageContainer>
  );
};

const NewsPageContainer = styled.div`
  padding: 2rem 1rem;
  background: #f1f1f1;
  border-left: 4px solid var(--primary-color);
`;

const News = styled.div`
  margin: 1rem auto;
`;

export const NewsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NewsCard = ({
  _id,
  title,
  createdAt,
  handleDelete,
  handleEdit,
  hideActions,
}) => {
  return (
    <NewsCardCont data-id={_id}>
      <NewsDetails>
        <Role>Title: {title}</Role>
        <NormalPara style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600 }}>
          Created At: {new Date(createdAt).toDateString()}
        </NormalPara>
      </NewsDetails>
      {hideActions || (
        <NewsActions>
          {/* <EditIcon onClick={() => handleEdit({ _id, role, newsLink })}>
            <i className="fi fi-sr-pencil"></i>
          </EditIcon> */}
          <EditIcon onClick={() => handleDelete(_id)}>
            <i className="fi fi-sr-trash-xmark"></i>
          </EditIcon>
        </NewsActions>
      )}
    </NewsCardCont>
  );
};

const NewsCardCont = styled.div`
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

const NewsDetails = styled.div``;

const NewsActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Role = styled(NormalPara)`
  margin: 0;
  font-weight: bold;
  font-size: 1.1rem;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
`;

const NewsLink = styled(Link)`
  font-weight: 500;
`;

const CreateModal = ({
  handleCancelAction,
  isCreating,
  createError,
  currentStoreLocation,
}) => {
  const portalRef = useRef(null);
  const [newsData, setNewsData] = useState({});
  const [newsContent, setNewsContent] = useState([]);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "imgUrl") {
      let files = e.target.files;
      if (files.length === 0) {
        toastInfo("No file selected", customToastId);
        value = null;
      } else {
        value = files[0];
      }
    }
    return setNewsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (
      !newsData.title ||
      !newsData.imgUrl ||
      !newsContent.length ||
      !newsContent.author
    )
      return toastError("Please fill all fields", customToastId);
    if (!currentStoreLocation) {
      return toastError("Please pick a store");
    }
    dispatch(
      createNews(
        {
          ...newsData,
          contents: newsContent,
          shopLocation: currentStoreLocation.shopLocation.replace(/\n/g, ""),
        },
        handleCancelAction
      )
    );
  };

  const addNew = (contentType) => {
    setNewsContent((prev) => [
      ...prev,
      { contentType, content: "", index: prev.length, customId: uuidv4() },
    ]);
  };

  const removeContent = (dataId) => {
    const newsContentCopy = [...newsContent];
    const indexToRemove = newsContent.findIndex(
      (cnt) => cnt?.customId === dataId || cnt?._id === dataId
    );
    newsContentCopy.splice(indexToRemove, 1);

    const updatedContent = newsContentCopy.map((cnt, idx) => ({
      ...cnt,
      index: idx,
    }));
    setNewsContent(updatedContent);
  };

  const handleNewsContentChange = (dataId, content) => {
    const updatedNewsContent = newsContent.map((cnt) => {
      if (cnt.customId) {
        if (cnt.customId === dataId) return { ...cnt, content };
      }
      if (cnt._id === dataId) return { ...cnt, content };
      return cnt;
    });
    setNewsContent(updatedNewsContent);
  };

  useEffect(() => {
    if (createError) {
      toastError(createError, customToastId);
    }
  }, [createError]);

  return (
    <PortalModalContainer
      onClick={(e) => {
        if (e.target !== portalRef.current) return;
        return handleCancelAction();
      }}
      ref={portalRef}
    >
      <EditModalContContainer>
        <SectionPara>Create news</SectionPara>
        <ActionButtons>
          <AddNew onClick={() => addNew("para")}>Add New Paragraph</AddNew>
          <AddNew onClick={() => addNew("heading")}>Add New Heading</AddNew>
        </ActionButtons>
        <CreateForm onSubmit={(e) => e.preventDefault()}>
          <FormGroupComponent
            label={"Title "}
            name={"title"}
            type={"text"}
            value={newsData?.title}
            placeholder={"Enter news title"}
            onChange={handleInputChange}
          />
          <FormGroupComponent
            label={"Author "}
            name={"author"}
            type={"text"}
            value={newsData?.author}
            placeholder={"Enter news author"}
            onChange={handleInputChange}
          />
          <FormGroupComponent
            type={"file"}
            name={"imgUrl"}
            label={"Image"}
            placeholder={"Choose an image file"}
            accept={".jpeg, .jpg, .png"}
            onChange={handleInputChange}
          />
          <SectionPara style={{ textAlign: "left", fontSize: "1.5rem" }}>
            News Content
          </SectionPara>
          {newsContent.map((content) => {
            if (content.contentType === "para")
              return (
                <EdittablePara
                  contentData={content}
                  // key={Object.values(content).join("")}
                  handleInputChange={handleNewsContentChange}
                  removeContent={removeContent}
                />
              );
            if (content.contentType === "heading")
              return (
                <EditableHeading
                  contentData={content}
                  // key={Object.values(content).join("")}
                  handleInputChange={handleNewsContentChange}
                  removeContent={removeContent}
                  inputStyle={{ textTransform: "initial" }}
                />
              );
          })}
        </CreateForm>
        <NewsActions style={{ justifyContent: "flex-end" }}>
          <SaveChange
            style={{ padding: "1rem" }}
            onClick={handleSaveChanges}
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create"}
          </SaveChange>
          {isCreating || (
            <CancelEdit onClick={handleCancelAction}>Cancel</CancelEdit>
          )}
        </NewsActions>
      </EditModalContContainer>
    </PortalModalContainer>
  );
};

const EditModalContContainer = styled.div`
  width: 90%;
  max-width: 700px;
  background: #fff;
  padding: 1rem;
  height: 80%;
  max-height: 700px;
  display: flex;
  flex-direction: column;
`;

const CreateForm = styled(Form)`
  flex: 1;
  overflow: auto;

  &::-webkit-scrollbar {
    appearance: none;
    width: 4px;
    background-color: rgba(var(--primary-rgb), 0.8);
    border-radius: 0.5rem;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    width: 2px;
    max-height: 4px;
    border-radius: 0.5rem;
    cursor: pointer;
    background-color: rgba(238, 238, 238, 0.9);
  }
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 0.5rem;
  border-bottom: none;
  padding: 0.2rem;
`;

const AddNew = styled.button`
  padding: 1rem;
  white-space: no-wrap;
  background: var(--primary-color);
  border: none;
  outline: none;
  cursor: pointer;
  color: var(--white);
  transition: 0.4s ease;
  font-family: var(--mont);
  font-weight: 600;
  font-size: 0.8rem;

  &:hover {
    background: #fff;
    color: var(--primary-color);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
  }
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
        <NewsActions style={{ marginTop: "1rem", justifyContent: "flex-end" }}>
          <SaveChange onClick={confirmDelete}>
            {isDeleting ? "Deleting..." : "Yes"}
          </SaveChange>
          {isDeleting || (
            <SaveChange onClick={handleCancelAction}>No</SaveChange>
          )}
        </NewsActions>
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
export default NewsAdmin;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  NormalPara,
  SectionHeading,
  SectionPara,
} from "../../components/reusables/Styles";
import Editor from "../../components/Editor";
import { useDispatch, useSelector } from "react-redux";
import EdittablePara from "../../components/editables/EdittablePara";
import EditableHeading from "../../components/editables/EditableHeading";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { savePageContent } from "../../redux/aboutPage/aboutPageActions";
import { toastError, toastSuccess } from "../../contexts/GlobalContext";

const customToastId = "kdsfjkalsfj";

const AboutPage = () => {
  const { pageContent, loading, error, updating, updateError, updateSuccess } =
    useSelector((state) => state.aboutPage);
  const [aboutPageContent, setAboutPageContent] = useState(
    pageContent?.contents || []
  );
  const pageId = useRef(pageContent?._id).current;
  const dispatch = useDispatch();

  const handleInputChange = (dataId, content) => {
    const updatedPageContent = aboutPageContent.map((cnt) => {
      if (cnt.customId) {
        if (cnt.customId === dataId) return { ...cnt, content };
      }
      if (cnt._id === dataId) return { ...cnt, content };
      return cnt;
    });
    setAboutPageContent(updatedPageContent);
  };

  const addNew = (contentType) => {
    setAboutPageContent((prev) => [
      ...prev,
      { contentType, content: "", index: prev.length, customId: uuidv4() },
    ]);
  };

  const removeContent = (dataId) => {
    const aboutPageContentCopy = [...aboutPageContent];
    const indexToRemove = aboutPageContent.findIndex(
      (cnt) => cnt?.customId === dataId || cnt?._id === dataId
    );
    aboutPageContentCopy.splice(indexToRemove, 1);
    // const updatedPageContent = aboutPageContent.filter((cnt) => {
    //   if (cnt.customId) {
    //     return cnt.customId !== dataId
    //   }
    //   return (cnt._id === dataId)
    // });
    const updatedPageContent = aboutPageContentCopy.map((cnt, idx) => ({
      ...cnt,
      index: idx,
    }));
    setAboutPageContent(updatedPageContent);
  };

  const savePage = () => {
    if (pageId) {
      toast.loading("Updating Page", { toastId: customToastId });
      dispatch(savePageContent(pageId, aboutPageContent));
    }
  };

  useEffect(() => {
    if (!updating && updateSuccess) {
      toastSuccess(updateSuccess, customToastId, true);
    }
  }, [updating]);

  useEffect(() => {
    if (updateError) {
      toastError(updateError, customToastId, true);
    }
  }, [updateError]);

  return (
    <AboutPageContainer>
      <SectionHeading
        style={{ wordSpacing: "initial", margin: 0, fontWeight: "bold" }}
      >
        About Page
      </SectionHeading>
      <ActionButtons>
        <AddNew onClick={() => addNew("para")}>Add New Paragraph</AddNew>
        <AddNew onClick={() => addNew("heading")}>Add New Heading</AddNew>
      </ActionButtons>
      {aboutPageContent ? (
        aboutPageContent.map((content) => {
          if (content.contentType === "para")
            return (
              <EdittablePara
                contentData={content}
                // key={Object.values(content).join("")}
                handleInputChange={handleInputChange}
                disabled={updating}
                removeContent={removeContent}
              />
            );
          if (content.contentType === "heading")
            return (
              <EditableHeading
                contentData={content}
                // key={Object.values(content).join("")}
                handleInputChange={handleInputChange}
                disabled={updating}
                removeContent={removeContent}
              />
            );
        })
      ) : (
        <NormalPara>NO PAGE CONTENT AVAILABLE</NormalPara>
      )}
      {/* <Editor
        changeToHeading={changeToHeading}
        changeToPara={changeToPara}
        content={content}
        setContent={setContent}
        editorRef={editableDivRef}
        onChange={handleInputChange}
      /> */}
      <SaveChanges onClick={savePage} disabled={updating}>
        Save Page
      </SaveChanges>
    </AboutPageContainer>
  );
};

const AboutPageContainer = styled.div`
  padding: 2rem 1rem;
  background: #f1f1f1;
  border-left: 4px solid var(--primary-color);
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

const SaveChanges = styled(AddNew)`
  width: 100%;
  diplay: block;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 0.5rem;
  border-bottom: none;
  padding: 0.2rem;
`;

export default AboutPage;

/**
 *  // const [content, setContent] = useState("");
  // const editableDivRef = useRef();

  // const changeToPara = (e) => {
  //   e.preventDefault();
  //   addCustomTag(`<p class="about-page-para-text">`, `</p>`);
  //   e.stopPropagation();
  // };

  // const changeToHeading = (e) => {
  //   e.preventDefault();
  //   addCustomTag(`<h3 class="about-page-heading-text">`, `</h3>`);
  //   e.stopPropagation();
  // };

  // const addCustomTag = (openingTag, closingTag) => {
  //   const selection = window.getSelection();
  //   if (selection.rangeCount > 0) {
  //     const range = selection.getRangeAt(0);
  //     console.log(range);
  //     const selectedText = range.toString();
  //     console.log(selectedText);
  //     return;
  //     const customTag = `${openingTag}${selectedText}${closingTag}`;

  //     // Create a new content string with the custom tag
  //     const newContent = content.replace(selectedText, customTag);

  //     // Update the state with the new content
  //     setContent(newContent);
  //   }
  // };

  // const handleInputChange = (e) => {
  //   setContent(e.currentTarget.innerHTML);
  // };
 */

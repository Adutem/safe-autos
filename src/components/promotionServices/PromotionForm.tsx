import * as yup from "yup";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRedux } from "../hooks/useRedux";
import { fileDetails } from "../helpers";
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
} from "../utils";
import { v4 as uuidv4 } from "uuid";
import PromotionInput from "./PromotionInput";
import { nanoid } from "nanoid";
import { createPromotion, resetCreatePromotion, updatePromotion } from "../redux/promotion/promotionSlice";
import {
  PromotionContentInputType,
  PromotionContentType as PromotionContent,
  
} from "./type";
import styled from "styled-components";
import {
  TextField,
  // Button as MuiButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Modal,
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Input,
  Menu,
} from "@mui/material";
import { Plus, ArrowUp, ArrowDown, Trash } from "lucide-react";
import { Button } from "../reusables/Styles";

export type PromotionContentType = {
  id: string;
  type: PromotionContent;
  listContent?: Array<string>;
  content?: string;
  fileContent?: any;
  inputType: PromotionContentInputType;
  nanoId: string;
  textContent?: string;
};

// Ensure PromotionPost type includes PromotionContents
export interface PromotionPost {
  _id: string;
  title: string;
  shortIntroduction: string;
  thumbNail: any;
  publicationDate: Date;
  tag: string;
  PromotionContents: PromotionContentType[];
}

interface PromotionFormProps {
  onClose: () => void;
  isOpen: boolean;
  editData?: PromotionPost | null;
}

const PromotionContentToInputMap: Record<PromotionContent, PromotionContentInputType> = {
  heading: "text",
  paragraph: "textarea",
  image: "file",
  list: "multiple-input",
};

const getDateDetails = (value: string | Date) => {
  const newDate = new Date(value);
  return {
    day: newDate.getDate(),
    month: newDate.getMonth(),
    year: newDate.getFullYear(),
  };
};

export const doDatesMatch = (
  dateOne: string | Date,
  dateTwo: string | Date
) => {
  const newDateOne = getDateDetails(dateOne);
  const newDateTwo = getDateDetails(dateTwo);
  return (
    newDateOne.day === newDateTwo.day &&
    newDateOne.month === newDateTwo.month &&
    newDateOne.year === newDateTwo.year
  );
};

const PromotionForm = ({ onClose, isOpen, editData }: PromotionFormProps) => {
  // Redux utilities
  const { dispatch, useStateSelector } = useRedux();

  // Promotion state
  const { isCreatingPromotion, promotionCreated, createError } = useStateSelector(
    (state) => state.Promotion || {}
  );
  

  // File Input State
  const [PromotionThumbNail, setPromotionThumbNail] = useState<any>(editData?.thumbNail || null);
  const thumbNailInputRef = useRef<HTMLInputElement | null>(null);
  const [PromotionContent, setPromotionContent] = useState<PromotionContentType[]>(editData?.PromotionContents?.map(content => ({
    ...content,
    id: uuidv4(),
    inputType: PromotionContentToInputMap[content.type],
    content: content.textContent || content.content || "",
  })) ?? []);
  const [PromotionContentFiles, setPromotionContentFiles] = useState<Record<string, any>>({});

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (type: PromotionContent) => {
    addPromotionContent(type);
    handleClose();
  };

  const removePromotionContent = (id: string) => {
    setPromotionContent((prev) => prev.filter((content) => content.id !== id));
  };

  const movePromotionContent = (index: number, direction: "up" | "down") => {
    if (direction === "up") {
      setPromotionContent((prev) => {
        const [removed] = prev.splice(index, 1);
        prev.splice(index - 1, 0, removed);
        return [...prev];
      });
    } else {
      setPromotionContent((prev) => {
        const [removed] = prev.splice(index, 1);
        prev.splice(index + 1, 0, removed);
        return [...prev];
      });
    }
  };

  const defaultValues = useMemo(
    () => ({
      title: editData?.title || "",
      shortIntroduction: editData?.shortIntroduction || "",
      thumbNail: editData?.thumbNail || "",
      publicationDate: editData?.publicationDate || new Date(),
      tag: editData?.tag || "Uncategorized",
    }),
    [editData]
  );

  const PromotionSchema = yup.object({
    title: yup.string().required("Please provide Promotion title"),
    shortIntroduction: yup.string().required("Please provide some content"),
    thumbNail: yup.string().required("Please provide Promotion thumbnail"),
    publicationDate: yup.date().required("Please provide publication date"),
    tag: yup.string().required("Please provide Promotion tag"),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: defaultValues,
    validationSchema: PromotionSchema,
    onSubmit: async (values) => {
      try {
        await PromotionContentValidation.validateForm();
        PromotionContentValidation.submitForm();
      } catch (error) {
        console.error("Promotion content validation failed", error);
      }
    },
  });

  // File Change Handler
  const handleFileChange = async (e: any) => {
    let file = e.target.files[0];
    let value = "";
    if (file) {
      const details: any = await fileDetails(file, "mb");
      if (details.size > 4) {
        e.target.value = "";
        return showInfoNotification("Max thumbnail size is 4mb", 1300);
      }
      const { width, height } = details?.dimension;
      if (width < 1280 || height < 720) {
        e.target.value = "";
        return showInfoNotification(`Min banner dimension 1280 x 720`);
      }
      setPromotionThumbNail(file);
      validation.setFieldValue("thumbNail", details.name);
    }
  };

  // Add Promotion content
  const addPromotionContent = (type: PromotionContent) => {
    const newPromotionContent: Record<keyof PromotionContentType, any> = {
      id: uuidv4(),
      type,
      listContent: [],
      content: "",
      inputType: PromotionContentToInputMap[type],
      nanoId: nanoid(9),
      fileContent: null,
      textContent: '',
    };
    setPromotionContent((prev: PromotionContentType[]) => [...prev, newPromotionContent]);
  };

  /**
   * Promotion content schema
   */
  const PromotionContentSchema = useMemo(() => {
    const schema: { [key: string]: yup.Schema<any> } = {};
    PromotionContent.forEach((content) => {
      if (content.type === "list") {
        schema[content.nanoId] = yup
          .array()
          .of(yup.string().required("Please provide list"))
          .min(1, "Please provide at least 1 list item")
          .required(`Please provide ${content.type}`);
        return;
      }
      schema[content.nanoId] = yup
        .string()
        .required(`Please provide ${content.type}`);
    });
    return yup.object().shape(schema);
  }, [PromotionContent.length]);

  const defaultPromotionContentValue = useMemo(() => {
    const value: { [key: string]: any } = {};
    PromotionContent.forEach((content) => {
      if (content.type === "list") {
        value[content.nanoId] = content.listContent || [];
        return;
      }
      value[content.nanoId] = content.content || "";
    });
    return value;
  }, [PromotionContent.length]);

  const PromotionContentValidation = useFormik({
    initialValues: defaultPromotionContentValue,
    validationSchema: PromotionContentSchema,
    onSubmit: (values) => {
      const updatedContent = PromotionContent.map((content) => {
        if (content.type === "list") {
          content.listContent = values[content.nanoId];
        } else if (content.type === "image") {
          content.fileContent = PromotionContentFiles[content.nanoId] || content.fileContent;
          content.content = values[content.nanoId];
        } else {
          content.content = values[content.nanoId];
        }
        return content;
      });
      setPromotionContent(updatedContent);

      if (updatedContent.length === 0)
        return showInfoNotification("Please add some content", 1300);

      const formData = new FormData();
      const PromotionData: Record<string, string | Date | File | Blob> =
        validation.values;
      for (let key in PromotionData) {
        if (key === "thumbNail") {
          formData.append(key, PromotionThumbNail);
        } else {
          formData.append(key, PromotionData[key].toString());
        }
      }

      // Append all Promotion content
      updatedContent.forEach((content, index) => {
        formData.append(`content[${index}].type`, content.type);
        formData.append(`content[${index}].nanoId`, content.nanoId);
        formData.append(`content[${index}].inputType`, content.inputType);
        if (content.type === "image") {
          formData.append(`content[${index}].fileContent`, content.fileContent);
        } else if (content.type === "list") {
          content.listContent?.forEach((item, itemIndex) => {
            formData.append(`content[${index}].listContent[${itemIndex}]`, item);
          });
        } else if (content.content) {
          formData.append(`content[${index}].textContent`, content.content);
        }
      });

      if (editData && editData._id) {
        dispatch(updatePromotion({ PromotionId: editData._id, data: formData })); // Use updatePromotion if editing
      } else {
        dispatch(createPromotion(formData)); // Use createPromotion if creating new
      }
    },
  });

  // File Change Handler
  const handlePromotionContentFileChange = async (e: any) => {
    let file = e.target.files[0];
    let value = "";
    if (file) {
      const details: any = await fileDetails(file, "mb");
      if (details.size > 4) {
        e.target.value = "";
        return showInfoNotification("Max thumbnail size is 4mb", 1300);
      }
      setPromotionContentFiles((prev) => {
        return { ...prev, [e.target.name]: file };
      });
      PromotionContentValidation.setFieldValue(e.target.name, details.name);
    }
  };

  // Successful Promotion posting
  useEffect(() => {
    if (promotionCreated) {
      showSuccessNotification("Promotion created", 1300);
      dispatch(resetCreatePromotion());
      onClose(); // Close the modal
    }
  }, [promotionCreated, dispatch, onClose]);

  // Posting Promotion error
  useEffect(() => {
    if (createError) {
      showErrorNotification("An error occured. Please try again", 1300);
      dispatch(resetCreatePromotion());
    }
  }, [createError]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Header>
          <Title>Promotion Form</Title>
          <IconButton onClick={handleClick}>
            <Plus />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleMenuItemClick("heading")}>Heading</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("paragraph")}>Paragraph</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("image")}>Image</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("list")}>List</MenuItem>
          </Menu>
        </Header>
        {isCreatingPromotion && <CircularProgress />}
        <Box
          sx={{
            maxHeight: "70vh",
            overflowY: "auto",
            paddingBottom: "2rem",
          }}
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <TextField
              type="text"
              name="title"
              label="Title"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter Promotion title"
              value={validation.values.title || ""}
              error={Boolean(validation.errors.title)}
              helperText={validation.errors.title}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              type="textarea"
              name="shortIntroduction"
              label="Short Introduction"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              placeholder="Enter short introduction"
              value={validation.values.shortIntroduction || ""}
              error={Boolean(validation.errors.shortIntroduction)}
              helperText={validation.errors.shortIntroduction}
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="thumbNail">Thumbnail</InputLabel>
              <Input
                type="file"
                name="thumbNail"
                id="thumbNail"
                onBlur={validation.handleBlur}
                onChange={handleFileChange}
                inputRef={thumbNailInputRef}
                inputProps={{ accept: ".jpeg, .jpg, .png" }}
              />
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Promotion tag</InputLabel>
              <Select
                label="Promotion tag"
                name="tag"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.tag || ""}
                error={Boolean(validation.errors.tag)}
              >
                <MenuItem value="Uncategorized">Uncategorized</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="SEO">SEO</MenuItem>
                <MenuItem value="E-Commerce">E-Commerce</MenuItem>
              </Select>
            </FormControl>
            <SectionTitle>Promotion Content</SectionTitle>
            {PromotionContent.length === 0 && (
              <EmptyContent>
                <Typography>You have not added a Promotion content yet</Typography>
                <Typography>
                  Click the plus icon at the top right to add new content
                </Typography>
              </EmptyContent>
            )}
            {PromotionContent.length > 0 && (
              <ContentContainer>
                {PromotionContent.map((content, index) => (
                  <Box key={content.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <PromotionInput
                      type={content.inputType}
                      id={content.id}
                      name={content.nanoId}
                      value={PromotionContentValidation.values[content.nanoId]}
                      onBlur={PromotionContentValidation.handleBlur}
                      onChange={PromotionContentValidation.handleChange}
                      validation={PromotionContentValidation}
                      handleFileChange={handlePromotionContentFileChange}
                      accept=".jpeg, .jpg, .png"
                      onRemoveInput={removePromotionContent}
                      onMoveInput={movePromotionContent}
                      index={index}
                      PromotionContentLength={PromotionContent.length}
                    />
                    <IconButton onClick={() => movePromotionContent(index, "up")}>
                      <ArrowUp />
                    </IconButton>
                    <IconButton onClick={() => movePromotionContent(index, "down")}>
                      <ArrowDown />
                    </IconButton>
                    <IconButton onClick={() => removePromotionContent(content.id)}>
                      <Trash />
                    </IconButton>
                  </Box>
                ))}
              </ContentContainer>
            )}
            <Button
              type="submit"
              // variant="contained"
              color="primary"
              disabled={isCreatingPromotion}
            // fullWidth
            >
              {isCreatingPromotion && <CircularProgress size={24} />}
              {isCreatingPromotion ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Box>
      </Box>
    </Modal>
  );
};

export default PromotionForm;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
  color: black;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: black;
  font-weight: bold;
`;

const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: #9ca3af;
  font-size: 0.75rem;
  text-align: center;
`;

const ContentContainer = styled.div`
  margin-left: 0.75rem;
`;



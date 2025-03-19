import * as yup from "yup";
import { useFormik } from "formik";
import FormInput from "../forms/FormInput";
import { DivWithoutScrollBar } from "../DivWithoutScrollBar";
import { Portal } from "../Portal";
import Button from "../forms/Button";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRedux } from "../hooks/useRedux";
// import { BlogPost } from "@/data/blog";
import { fileDetails } from "../helpers";
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
} from "../utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { v4 as uuidv4 } from "uuid";
import BlogInput from "../blog/BlogInput";
import { nanoid } from "nanoid";
import { createBlog, resetCreateBlog } from "../redux/blog/blogSlice";
import { Loader, Spinner } from "../progress";
import {
  BlogContentInputType,
  BlogContentType as BlogContent,
  BlogPost,
} from "./type";

export type BlogContentType = {
  id: string;
  type: BlogContent;
  listContent?: Array<string>;
  textContent?: string;
  fileContent?: any;
  inputType: BlogContentInputType;
  nanoId: string;
};

interface BlogFormProps {
  onClose: () => void;
  isOpen: boolean;
  editData?: BlogPost | null;
}

const blogContentToInputMap: Record<BlogContent, BlogContentInputType> = {
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

const BlogForm = ({ onClose, isOpen, editData }: BlogFormProps) => {
  // Redux utilities
  const { dispatch, useStateSelector } = useRedux();

  // Blog state
  const { isCreatingBlog, blogCreated, createError } = useStateSelector(
    (state) => state.Blog
  );

  // File Input State
  const [blogThumbNail, setBlogThumbNail] = useState<any>(null);
  const thumbNailInputRef = useRef<HTMLInputElement | null>(null);
  const [blogContent, setBlogContent] = useState<BlogContentType[]>([]);
  const [blogContentFiles, setBlogContentFiles] = useState<Record<string, any>>(
    {}
  );

  const removeBlogContent = (id: string) => {
    setBlogContent((prev) => prev.filter((content) => content.id !== id));
  };

  const moveBlogContent = (index: number, direction: "up" | "down") => {
    if (direction === "up") {
      setBlogContent((prev) => {
        const [removed] = prev.splice(index, 1);
        prev.splice(index - 1, 0, removed);
        return [...prev];
      });
    } else {
      setBlogContent((prev) => {
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

  const blogSchema = yup.object({
    title: yup.string().required("Please provide blog title"),
    shortIntroduction: yup.string().required("Please provide some content"),
    thumbNail: yup.string().required("Please provide blog thumbnail"),
    publicationDate: yup.date().required("Please provide publication date"),
    tag: yup.string().required("Please provide blog tag"),
  });

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: defaultValues,
    validationSchema: blogSchema,
    onSubmit: async (values) => {
      try {
        await blogContentValidation.validateForm();
        blogContentValidation.submitForm();
      } catch (error) {
        console.error("Blog content validation failed", error);
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
      setBlogThumbNail(file);
      validation.setFieldValue("thumbNail", details.name);
    }
  };

  // Add blog content
  const addBlogContent = (type: BlogContent) => {
    const newBlogContent: Record<keyof BlogContentType, any> = {
      id: uuidv4(),
      type,
      listContent: [],
      textContent: "",
      inputType: blogContentToInputMap[type],
      nanoId: nanoid(9),
      fileContent: null,
    };
    setBlogContent((prev: BlogContentType[]) => [...prev, newBlogContent]);
  };

  /**
   * Blog content schema
   */
  const blogContentSchema = useMemo(() => {
    const schema: { [key: string]: yup.Schema<any> } = {};
    blogContent.forEach((content) => {
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
  }, [blogContent.length]);

  const defaultBlogContentValue = useMemo(() => {
    const value: { [key: string]: any } = {};
    blogContent.forEach((content) => {
      if (content.type === "list") {
        value[content.nanoId] = [];
        return;
      }
      value[content.nanoId] = "";
    });
    return value;
  }, [blogContent.length]);

  const blogContentValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    // enableReinitialize: true,
    initialValues: defaultBlogContentValue,
    validationSchema: blogContentSchema,
    onSubmit: (values) => {
      const updatedContent = blogContent.map((content) => {
        if (content.type === "list") {
          content.listContent = values[content.nanoId];
        } else if (content.type === "image") {
          console.log(blogContentFiles);
          content.fileContent = blogContentFiles[content.nanoId];
          content.textContent = values[content.nanoId];
        } else {
          content.textContent = values[content.nanoId];
        }
        return content;
      });
      setBlogContent(updatedContent);

      if (updatedContent.length === 0)
        return showInfoNotification("Please add some content", 1300);

      const formData = new FormData();
      const blogData: Record<string, string | Date | File | Blob> =
        validation.values;
      for (let key in blogData) {
        if (key === "thumbNail") {
          formData.append(key, blogThumbNail);
        } else {
          formData.append(key, blogData[key].toString());
        }
      }

      // Append all blog content
      updatedContent.forEach((content, index) => {
        if (content.type === "image") {
          formData.append(`content[${index}].fileContent`, content.fileContent);
        } else if (content.type === "list") {
          formData.append(
            `content[${index}].listContent`,
            JSON.stringify(content.listContent)
          );
        } else if (content.textContent) {
          formData.append(`content[${index}].textContent`, content.textContent);
        }
        formData.append(`content[${index}].type`, content.type);
        formData.append(`content[${index}].nanoId`, content.nanoId);
        formData.append(`content[${index}].inputType`, content.inputType);
      });

      dispatch(createBlog(formData));

      // console.log(formData.get("content"));
      // Call the final submit of the main form
      // console.log("Main Form Values:", validation.values);
      // console.log("Blog Content Values:", updatedContent);
      // Submit the main form or perform any desired actions here
    },
  });

  // File Change Handler
  const handleBlogContentFileChange = async (e: any) => {
    let file = e.target.files[0];
    let value = "";
    if (file) {
      const details: any = await fileDetails(file, "mb");
      if (details.size > 4) {
        e.target.value = "";
        return showInfoNotification("Max thumbnail size is 4mb", 1300);
      }
      // const { width, height } = details?.dimension;
      // if (width < 1280 || height < 720) {
      //   e.target.value = "";
      //   return showInfoNotification(`Min banner dimension 1280 x 720`);
      // }
      // setBlogThumbNail(file);
      setBlogContentFiles((prev) => {
        // prev[e.target.name] = file
        return { ...prev, [e.target.name]: file };
      });
      blogContentValidation.setFieldValue(e.target.name, details.name);
    }
  };

  // Successful blog posting
  useEffect(() => {
    if (blogCreated) {
      showSuccessNotification("Blog created", 1300);
      dispatch(resetCreateBlog());
      onClose();
    }
  }, [blogCreated]);

  // Posting blog error
  useEffect(() => {
    if (createError) {
      showErrorNotification("An error occured. Please try again", 1300);
      dispatch(resetCreateBlog());
    }
  }, [createError]);

  return (
    <Portal
      onClose={() => onClose()}
      shouldModalCloseOnClick={false}
      modalContentContainerStyle="rounded-md"
      isOpen={isOpen}
      showBackdropElement={true}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl text-white neue-regular font-bold">
          Blog Form
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <span
              className={`w-8 h-8 rounded-md transparent-white grid place-items-center cursor-pointer hover:bg-gray-700 transition-all`}
            >
              <i className={`text-white flex fi fi-rr-multiple text-base`}></i>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            style={{ zIndex: 100000005 }}
            className="bg-black"
          >
            <DropdownMenuItem
              className="cursor-pointer text-gray-300 hover:text-black focus:text-black"
              onClick={() => addBlogContent("heading")}
            >
              <span className="w-36 flex justify-between">
                <span>Heading</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-300 hover:text-black"
              onClick={() => addBlogContent("paragraph")}
            >
              <span className="w-36 flex justify-between">
                <span>Paragraph</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-300 hover:text-black"
              onClick={() => addBlogContent("list")}
            >
              <span className="w-36 flex justify-between">
                <span>List</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-300 hover:text-black"
              onClick={() => addBlogContent("image")}
            >
              <span className="w-36 flex justify-between">
                <span>Image</span>
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isCreatingBlog && <Loader />}
      <DivWithoutScrollBar className="pb-60 sm:pb-32 h-5/6 overflow-auto relative">
        <form
          className="relative w-full flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Called here!");
            validation.handleSubmit();
            return false;
          }}
        >
          <FormInput
            type="text"
            name="title"
            label="Title"
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            placeholder="Enter blog title"
            value={validation.values.title || ""}
            validation={validation}
            className="neue-regular text-gray-300"
          />
          <FormInput
            type="textarea"
            name="shortIntroduction"
            label="Short Introduction"
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            placeholder="Enter short introduction"
            value={validation.values.shortIntroduction || ""}
            validation={validation}
            className="neue-regular text-gray-300"
          />
          <FormInput
            type="file"
            name="thumbNail"
            label="Thumbnail"
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            placeholder="Choose thumbnail"
            value={validation.values.thumbNail}
            validation={validation}
            hidden={true}
            inputRef={thumbNailInputRef}
            accept={".jpeg, .jpg, .png"}
            handleFileChange={handleFileChange}
            className="neue-regular text-gray-300"
          />

          <FormInput
            type="chad-select"
            label="Blog tag"
            name="tag"
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            placeholder="Select blog tag"
            value={validation.values.tag || ""}
            validation={validation}
            options={["Uncategorized", "Marketing", "SEO", "E-Commerce"]}
            defaultValue={editData?.tag || "Uncategorized"}
            className="neue-regular text-gray-300"
          />

          <h3 className="block text-xl font-bold text-white neue-regular">
            Blog Content
          </h3>
          {blogContent.length === 0 && (
            <div className="flex flex-col items-center gap-1">
              <p className="text-center text-gray-400 neue-regular text-xs">
                You have not added a blog content yet <br />
              </p>
              <p className="text-center text-gray-400 neue-regular text-xs">
                Click the plus icon at the top right to add new content
              </p>
            </div>
          )}
          {blogContent.length > 0 && (
            <div className="ml-3">
              <div>
                {blogContent.map((content, index) =>
                  content.type !== "list" ? (
                    <BlogInput
                      type={content.inputType}
                      key={content.id}
                      id={content.id}
                      name={content.nanoId}
                      value={blogContentValidation.values[content.nanoId]}
                      onBlur={blogContentValidation.handleBlur}
                      onChange={blogContentValidation.handleChange}
                      validation={blogContentValidation}
                      handleFileChange={handleBlogContentFileChange}
                      accept=".jpeg, .jpg, .png"
                      onRemoveInput={removeBlogContent}
                      onMoveInput={moveBlogContent}
                      index={index}
                      blogContentLength={blogContent.length}
                    />
                  ) : (
                    <BlogInput
                      type={content.inputType}
                      key={content.id}
                      id={content.id}
                      name={content.nanoId}
                      value={blogContentValidation.values[content.nanoId]}
                      onBlur={blogContentValidation.handleBlur}
                      onChange={blogContentValidation.handleChange}
                      validation={blogContentValidation}
                      onRemoveInput={removeBlogContent}
                      onMoveInput={moveBlogContent}
                      blogContentLength={blogContent.length}
                      index={index}
                    />
                  )
                )}
              </div>
            </div>
          )}

          <div className="mt-8 col-span-full">
            <Button
              type="submit"
              className="bg-[var(--base-primary)]"
              disabled={isCreatingBlog}
            >
              {isCreatingBlog && <Spinner type="plain" />}
              {isCreatingBlog ? "Creating Blog..." : "Create Blog"}
            </Button>
          </div>
        </form>
      </DivWithoutScrollBar>
    </Portal>
  );
};

export default BlogForm;

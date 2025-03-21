import { useEffect, useState } from "react";
import FormFeedback from "../forms/FormFeedback";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import BlogInputMenu from "./BlogInputMenu";
import React from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Plus, ArrowUp, ArrowDown, Trash } from "lucide-react";



interface BlogInputProps {
  name: string;
  type: string;
  placeholder?: string;
  onChange: any;
  onBlur: any;
  value: any;
  validation: any;
  options?: string[];
  disabled?: boolean;
  className?: string;
  min?: any;
  max?: any;
  defaultValue?: any;
  accept?: string;
  inputRef?: any;
  hidden?: boolean;
  handleFileChange?: any;
  id: string;
  index: number;
  onRemoveInput: (id: string) => void;
  onMoveInput: (index: number, direction: "up" | "down") => void;
  blogContentLength: number;
}

interface DetachableInputProps {
  id: string;
  onRemove: (id: string) => void;
  onChangeValue: (id: string, value: string) => void;
  value: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const BlogInput = ({
  type,
  onChange,
  onBlur,
  value,
  placeholder,
  name,
  validation,
  options,
  disabled,
  className,
  min,
  max,
  defaultValue,
  accept,
  hidden,
  inputRef,
  handleFileChange,
  index,
  onRemoveInput,
  onMoveInput,
  blogContentLength,
  id,
}: BlogInputProps) => {
  if (type === "file" && !handleFileChange)
    throw Error("File Change Handler Required For File Input");

  if (type === "text") {
    return (
      <Box mb={4} width="100%">
        <Box display="flex" gap={2} alignItems="start" width="100%">
          <BlogInputMenu
            id={id}
            onRemoveInput={onRemoveInput}
            blogContentLength={blogContentLength}
            index={index}
            onMoveInput={onMoveInput}
          />
          <Box flex={1}>
            <TextField
              label="Heading"
              type={type}
              name={name}
              placeholder="Your text here..."
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              disabled={disabled}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{
                className: classNames(
                  "text-xl mt-2 w-full outline-none text-gray-300 font-bold bg-[var(--input-bg)] cursor-pointer",
                  className
                ),
              }}
            />
            {validation.touched[name] && validation.errors[name] ? (
              <FormFeedback type="invalid">
                {validation.errors[name]}
              </FormFeedback>
            ) : null}
          </Box>
        </Box>
      </Box>
    );
  }

  if (type === "textarea") {
    return (
      <Box mb={4} width="100%">
        <Box display="flex" gap={2} alignItems="start" width="100%">
          <BlogInputMenu
            id={id}
            onRemoveInput={onRemoveInput}
            blogContentLength={blogContentLength}
            index={index}
            onMoveInput={onMoveInput}
          />
          <Box flex={1}>
            <TextField
              label="Paragraph"
              name={name}
              placeholder="Your text here..."
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              disabled={disabled}
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              InputProps={{
                className: classNames(
                  className,
                  "text-xs mt-2 w-full outline-none text-gray-300 font-medium bg-[var(--input-bg)] resize-y min-h-32 cursor-pointer"
                ),
              }}
            />
            {validation.touched[name] && validation.errors[name] ? (
              <FormFeedback type="invalid">
                {validation.errors[name]}
              </FormFeedback>
            ) : null}
          </Box>
        </Box>
      </Box>
    );
  }

  if (type === "multiple-input") {
    return (
      <MultipleInput
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        name={name}
        validation={validation}
        disabled={disabled}
        className={className}
        min={min}
        max={max}
        defaultValue={defaultValue}
        index={index}
        onRemoveInput={onRemoveInput}
        onMoveInput={onMoveInput}
        blogContentLength={blogContentLength}
        id={id}
      />
    );
  }

  if (type === "file") {
    return (
      <Box mb={4} width="100%">
        <Box display="flex" gap={2} alignItems="start" width="100%">
          <BlogInputMenu
            id={id}
            onRemoveInput={onRemoveInput}
            blogContentLength={blogContentLength}
            index={index}
            onMoveInput={onMoveInput}
          />
          <Box flex={1}>
            <TextField
              label="Image"
              type={type}
              name={name}
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={handleFileChange}
              disabled={disabled}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{
                className: classNames(
                  "text-xs mt-2 w-full outline-none text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer",
                  className
                ),
              }}
              inputProps={{
                min: min,
                max: max,
                hidden: true,
                ref: inputRef,
                accept: accept,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={(e: any) => {
                inputRef && inputRef.current
                  ? inputRef.current.click()
                  : e.target.previousElementSibling.click();
              }}
              className={classNames(
                "mt-2 w-full outline-none text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer flex items-center gap-2",
                className
              )}
            >
              <i className="fi fi-rr-images flex text-white pointer-events-none"></i>
              <span className="neue-regular pointer-events-none">
                Choose File
              </span>
            </Button>
            <Typography variant="body2" color="textSecondary" mt={2}>
              {value ? `Chosen file: ${value}` : "No file chosen"}
            </Typography>
            {validation.touched[name] && validation.errors[name] ? (
              <FormFeedback type="invalid">
                {validation.errors[name]}
              </FormFeedback>
            ) : null}
          </Box>
        </Box>
      </Box>
    );
  }

  throw Error("Invalid Blog Input Type");
};

type DetachableInputType = {
  id: string;
  value: string;
};

const MultipleInput = ({
  type,
  onChange,
  onBlur,
  value,
  placeholder,
  name,
  validation,
  disabled,
  className,
  min,
  max,
  defaultValue,
  onRemoveInput,
  index,
  onMoveInput,
  blogContentLength,
  id,
}: BlogInputProps) => {
  const [inputs, setInputs] = useState<DetachableInputType[]>([]);

  const onChangeValue = (id: string, value: string) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, value };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  const onRemove = (id: string) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);
  };

  const addNewDetachableInput = () => {
    const newId = uuidv4();
    const newInput = { id: newId, value: "" };
    setInputs([...inputs, newInput]);
  };

  useEffect(() => {
    const values = inputs
      .map((inputData) => inputData.value)
      .filter((value) => value !== "");
    validation.setFieldValue(name, values);
  }, [inputs]);

  useEffect(() => {
    addNewDetachableInput();
  }, []);

  useEffect(() => {
    if (defaultValue && Array.isArray(defaultValue)) {
      const requirementsData = defaultValue.map((requirement: string) => ({
        id: uuidv4(),
        value: requirement,
      }));
      setInputs(requirementsData);
    }
  }, []);

  return (
    <Box mb={4} width="100%">
      <Box display="flex" gap={2} alignItems="start" width="100%">
        <BlogInputMenu
          id={id}
          onRemoveInput={onRemoveInput}
          blogContentLength={blogContentLength}
          index={index}
          onMoveInput={onMoveInput}
        />
        <Box flex={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              List
            </Typography>
            <IconButton onClick={addNewDetachableInput}>
              <Plus />
            </IconButton>
          </Box>
          {inputs && inputs.length > 0 && (
            <Box mt={2}>
              <Box display="flex" flexDirection="column" gap={2}>
                {inputs.map((inputData, index) => (
                  <DetachableInput
                    key={inputData.id}
                    id={inputData.id}
                    onChangeValue={onChangeValue}
                    onRemove={onRemove}
                    disabled={disabled}
                    value={inputData.value}
                    placeholder={placeholder}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </Box>
  );
};

const DetachableInput = ({
  value,
  disabled,
  className,
  onChangeValue,
  onRemove,
  id,
  placeholder,
}: DetachableInputProps) => {
  return (
    <Box display="flex" gap={2} alignItems="center" mt={2}>
      <IconButton onClick={() => onRemove(id)}>
        <Trash />
      </IconButton>
      <TextField
        type="text"
        value={value}
        onChange={(e) => onChangeValue(id, e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        fullWidth
        variant="outlined"
        margin="normal"
        InputProps={{
          className: classNames(
            "text-xs w-full outline-none text-gray-300 font-medium bg-[var(--input-bg)] cursor-pointer neue-regular",
            className
          ),
        }}
      />
    </Box>
  );
};

export default BlogInput;

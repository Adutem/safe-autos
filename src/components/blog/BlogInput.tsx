import { useEffect, useState } from "react";
import FormFeedback from "../forms/FormFeedback";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import BlogInputMenu from "./BlogInputMenu";

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
      <div className="mb-4 w-full">
        <div className="flex gap-2 md:gap-3 items-start w-full">
          <BlogInputMenu
            id={id}
            onRemoveInput={onRemoveInput}
            blogContentLength={blogContentLength}
            index={index}
            onMoveInput={onMoveInput}
          />
          <div className="flex-1">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-white"
            >
              Heading
            </label>
            <input
              type={type}
              name={name}
              placeholder={"Your text here..."}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              disabled={disabled}
              className={classNames(
                "block border-[1px] rounded-md px-4 py-3 text-xl mt-2 w-full outline-none border-[lightgray] text-gray-300 font-bold bg-[var(--input-bg)] cursor-pointer",
                className
              )}
            />
            {validation.touched[name] && validation.errors[name] ? (
              <FormFeedback type="invalid">
                {validation.errors[name]}
              </FormFeedback>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="mb-4 w-full">
        <div className="flex gap-2 md:gap-3 items-start w-full">
          <BlogInputMenu
            id={id}
            onRemoveInput={onRemoveInput}
            blogContentLength={blogContentLength}
            index={index}
            onMoveInput={onMoveInput}
          />
          <div className="flex-1">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-white"
            >
              Paragraph
            </label>
            <textarea
              name={name}
              placeholder={"Your text here..."}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              disabled={disabled}
              className={classNames(
                className,
                "block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-300 font-medium bg-[var(--input-bg)] resize-y min-h-32 cursor-pointer"
              )}
            />
            {validation.touched[name] && validation.errors[name] ? (
              <FormFeedback type="invalid">
                {validation.errors[name]}
              </FormFeedback>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  if (type === "multiple-input") {
    return (
      <MultipleInput
        {...{
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
          index,
          onRemoveInput,
          onMoveInput,
          blogContentLength,
          id,
        }}
      />
    );
  }

  if (type === "file") {
    return (
      <div className="mb-4 w-full">
        <div className="flex gap-2 md:gap-3 items-start w-full">
          <BlogInputMenu
            id={id}
            onRemoveInput={onRemoveInput}
            blogContentLength={blogContentLength}
            index={index}
            onMoveInput={onMoveInput}
          />
          <div className="flex-1">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-white"
            >
              Image
            </label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={handleFileChange}
              disabled={disabled}
              className={classNames(
                "border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer",
                className
              )}
              min={min}
              max={max}
              hidden={true}
              ref={inputRef}
              accept={accept}
            />
            <button
              type="button"
              className={classNames(
                "border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer flex items-center gap-2",
                className
              )}
              onClick={(e: any) => {
                inputRef && inputRef.current
                  ? inputRef.current.click()
                  : e.target.previousElementSibling.click();
              }}
            >
              <i className="fi fi-rr-images flex text-white pointer-events-none"></i>
              <span className="neue-regular pointer-events-none">
                Choose File
              </span>
            </button>
            <p className="text-gray-400 neue-regular text-xs mt-2">
              {value ? `Chosen file: ${value}` : "No file chosen"}
            </p>
            {validation.touched[name] && validation.errors[name] ? (
              <FormFeedback type="invalid">
                {validation.errors[name]}
              </FormFeedback>
            ) : null}
          </div>
        </div>
      </div>
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
    <div className="mb-4 w-full">
      <div className="flex gap-2 md:gap-3 items-start w-full">
        <BlogInputMenu
          id={id}
          onRemoveInput={onRemoveInput}
          blogContentLength={blogContentLength}
          index={index}
          onMoveInput={onMoveInput}
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-white"
            >
              List
            </label>
            <button
              className={`w-8 h-8 rounded-md transparent-white grid place-items-center cursor-pointer hover:bg-gray-700 transition-all`}
              type="button"
              onClick={addNewDetachableInput}
            >
              {/* <i className={`text-white flex fi fi-rr-layer-plus text-xl`}></i> */}
              <i
                className={`text-white flex fi fi-rr-plus-small text-base`}
              ></i>
            </button>
          </div>
          {inputs && inputs.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-col gap-2">
                {inputs.map((inputData, index) => (
                  <DetachableInput
                    id={inputData.id}
                    onChangeValue={onChangeValue}
                    onRemove={onRemove}
                    disabled={disabled}
                    value={inputData.value}
                    placeholder={placeholder}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
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
    <div className="flex gap-2 md:gap-3 items-center mt-2">
      <button
        className={`w-8 h-8 rounded-md transparent-white grid place-items-center cursor-pointer hover:bg-gray-700 transition-all`}
        type={"button"}
        onClick={() => onRemove(id)}
      >
        {/* <i className={`text-white flex fi fi-rr-layer-minus text-sm`}></i> */}
        <i className={`text-white flex fi fi-rr-minus-small text-sm`}></i>
      </button>
      <input
        type={"text"}
        value={value}
        onChange={(e) => onChangeValue(id, e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={classNames(
          "block border-[1px] rounded-md px-4 py-3 text-xs w-full outline-none border-[lightgray] text-gray-300 font-medium bg-[var(--input-bg)] cursor-pointer neue-regular",
          className
        )}
      />
    </div>
  );
};

export default BlogInput;

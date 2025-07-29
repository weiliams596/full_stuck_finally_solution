import React, { useState, useContext, use } from "react";
import SetContext from "../Contexts/SetContexts/SetContext";

/*
  Form component to handle form submission and form data.
  props:
  - action: API endpoint to submit form data
  - methon: HTTP method to submit form data (default: POST)
  - className: CSS class to apply to form element
  - fields: array of objects containing form fields details
    - name: name of the field
    - label: label of the field
    - type: type of the field (default: text)
    - placeholder: placeholder text for the field
    - required: boolean to indicate if the field is required (default: false)
    - options: array of options to display in a dropdown field(use for select, radio and checkbox type fields)
    - divCalassName: CSS class to apply to the field element
    - labelClassName: CSS class to apply to the label element
    - inputClassName: CSS class to apply to the input element
  - onSuccess(response): callback async function to handle successful form submission
    - response: response object returned by API
  - onError: callback async function to handle form submission error
    - err: error object returned by API
  - title: is dom element to display form title
  - submitText: text to display on submit button
  - otherButtons: array of objects containing other buttons details
    - text: text to display on button
    - className: CSS class to apply to button element
    - onClick(e,response): callback async function to handle button click event
      - e: event object
      - response: response object returned by API
*/
const AutoForm = ({
  action,
  methon = "POST",
  className = "",
  fields = [],
  onSuccess,
  onError,
  title = "",
  titleClassName = "text-center text-3xl mb-5 mt-5 text-white",
  submitText = "Жыберу",
  submitClassName = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4",
  submitAndResetAll = false,
  otherButtons,
  id=null,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState("");
  const { axiosInstance } = useContext(SetContext);

  const handleChnage = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleReset = () => {
    document.forms[0].reset();
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { method: methon, url: action, data: formData };
      if (methon.toUpperCase() === "GET" || methon.toUpperCase() === "DELETE") {
        config.params = {...id,...formData};
      } else {
        config.data = formData;
      }

      const response = await axiosInstance(config);

      await onSuccess?.(response);
      if (submitAndResetAll) {
        handleReset();
      }
    } catch (err) {
      await onError?.(err);
      setErrors(err.response.data.error + " : " + err.response.data.message);
    }
  };

  const buttonsOnClick = async (e, button) => {
    // e.preventDefault();
    try {
      const config = {
        method: button.methon,
        url: button.action,
        data: formData,
      };
      if (methon.toUpperCase() === "GET" || methon.toUpperCase() === "DELETE") {
        config.params = formData;
      } else {
        config.data = formData;
      }

      const response = await axiosInstance(config);

      await button.onSuccess?.(e, response);
      if (submitAndResetAll) {
        handleReset();
      }
    } catch (err) {
      await onError?.(e, err);
      setErrors(err.response.data.error + " : " + err.response.data.message);
    }
  };
  return (
    <form className={className} onSubmit={handleSubmit}>
      {title && <h1 className={titleClassName}>{title}</h1>}
      {fields.map(
        ({
          name,
          label,
          type='text',
          placeholder = label,
          required = false,
          options,
          inputClasses = defaultInputClasses(),
        }) => (
          <div key={name} className={inputClasses.divClassName}>
            {type !== "radio" && type !== "checkbox" && (
              <label htmlFor={name} className={inputClasses.labelClassName}>
                {label}
              </label>
            )}
            {type === "select" ? (
              <select
                name={name}
                value={formData[name]}
                className={inputClasses.inputClassName}
                onChange={(e) => handleChnage(name, e.target.value)}
                required={required}>
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                className={inputClasses.inputClassName}
                onChange={(e) => handleChnage(name, e.target.value)}
                required={required}
                placeholder={placeholder}
              />
            ) : type === "radio" ? (
              <div>
                {options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={name}
                      value={option.value}
                      className={inputClasses.inputClassName}
                      onChange={(e) => handleChnage(name, e.target.value)}
                      required={required}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ) : type === "checkbox" ? (
              <div>
                {options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      name={name}
                      value={option.value}
                      className={inputClasses.inputClassName}
                      onChange={(e) => handleChnage(name, e.target.value)}
                      required={required}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ) :type==='other'?
            (
              {options}
            ): (
              <input
                type={type}
                name={name}
                value={formData[name]}
                className={inputClasses.inputClassName}
                onChange={(e) => handleChnage(name, e.target.value)}
                required={required}
                placeholder={placeholder}
              />
            )}
          </div>
        )
      )}
      <div className="flex justify-center items-center w-full">
        {submitText && (
          <button type="submit" className={submitClassName}>
            {submitText}
          </button>
        )}
        {otherButtons &&
          otherButtons.map((button, index) => (
            <button
              key={"btn" + index}
              type="button"
              className={button.className}
              onClick={(e) => buttonsOnClick(e, button)}>
              {button.text}
            </button>
          ))}
      </div>
      {errors && <div className="text-red-500 text-center">{errors}</div>}
    </form>
  );
};

export default AutoForm;

export const defaultInputClasses = () => {
  return {
    divClassName: "mb-4 text-white flex flex-col w-full justify-center",
    labelClassName: "p-2",
    inputClassName: "p-2 bg-[#16348C] rounded-3xl focus:outline-none w-full",
  };
};

export const makeInputClasses = (
  divClassName,
  labelClassName,
  inputClassName
) => {
  return { divClassName, labelClassName, inputClassName };
};

export const defaultButtonClasses = () => {
  return {
    className:
      "flex flex-col items-center justify-center w-full max-w-md bg-[#4453A6] rounded-4xl p-8 shadow-md",
  };
};

export const makeButtonClasses = (className) => {
  return { className };
};

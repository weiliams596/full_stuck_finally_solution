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
    - defaultValue: used for select, radio and checkbox type fields to set default value
    - placeholder: placeholder text for the field
    - required: boolean to indicate if the field is required (default: false)
    - options: array of options to display in a dropdown field(use for select, radio and checkbox type fields)
    - divCalassName: CSS class to apply to the field element
    - labelClassName: CSS class to apply to the label element
    - inputClassName: CSS class to apply to the input element
    - onChange(value): callback function to handle field value change
  - onSuccess(response): callback async function to handle successful form submission
    - response: response object returned by API
  - onError: callback async function to handle form submission error
    - err: error object returned by API
  - title: is dom element to display form title
  - titleClassName: CSS class to apply to title element
  - submitClassName: CSS class to apply to submit button element
  - onSubmit(config): callback async function to handle form submission before sending to API
    - config: config object to be sent to API
  - submitAndResetAll: boolean to indicate if all fields should be reset after successful submission
  - submitText: text to display on submit button
  - otherButtons: array of objects containing other buttons details
    - text: text to display on button
    - className: CSS class to apply to button element
    - onClick(e,response): callback async function to handle button click event
      - e: event object
      - response: response object returned by API
  - paramId: parameter to be sent to API (default: null,server will generate id name of parId)
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
  submitClassName = "bg-quaternary-blue hover:bg-secondary-blue text-white font-bold py-2 px-4 rounded-full mt-4",
  submitAndResetAll = false,
  otherButtons = null,
  paramId = null,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState("");
  const { axiosInstance } = useContext(SetContext);

  const handleChange = async (name, value, onChange) => {
    try {
      const newValue = await onChange?.(value);
      setFormData((prev) => ({
        ...prev,
        [name]: newValue ?? value,
      }));
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error + " : " + err?.response?.data?.message ||
        err?.message ||
        String(err);
      setErrors(errorMessage);
    }
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
        config.params = { ...{ parId: paramId }, ...formData };
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
        method: button?.methon,
        url: button?.action,
        data: formData,
      };
      if (methon.toUpperCase() === "GET" || methon.toUpperCase() === "DELETE") {
        config.params = formData;
      } else {
        config.data = formData;
      }

      const response = await axiosInstance(config);

      await button?.onSuccess?.(e, response);
      if (submitAndResetAll) {
        handleReset();
      }
    } catch (err) {
      await onError?.(e, err);
      setErrors(err.response?.data?.error + " : " + err.response?.data?.message);
    }
  };
  return (
    <form className={className} onSubmit={handleSubmit}>
      {title && <h1 className={titleClassName}>{title}</h1>}
      {fields.map(
        ({
          name,
          label,
          type = "text",
          defaultValue,
          placeholder = label,
          required = false,
          options,
          inputClasses = defaultInputClasses(),
          onChange,
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
                value={formData[name] ?? defaultValue}
                className={inputClasses.inputClassName}
                onChange={async (e) =>
                  handleChange(name, e.target.value, onChange && onChange)
                }
                required={required}>
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
                onChange={async (e) =>
                  handleChange(name, e.target.value, onChange && onChange)
                }
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
                      onChange={async (e) =>
                        handleChange(name, e.target.value, onChange && onChange)
                      }
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
                      onChange={async (e) =>
                        handleChange(name, e.target.value, onChange && onChange)
                      }
                      required={required}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ) : type === "other" ? (
              <div>{options}</div>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]?? ''}
                className={inputClasses.inputClassName}
                onChange={async (e) =>
                  handleChange(name, e.target.value, onChange && onChange)
                }
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
    divClassName: "text-white flex flex-col w-full justify-center md:mb-2",
    labelClassName: "pt-2 md:p-4",
    inputClassName:
      "pl-3 pr-3 pt-1 pb-1 bg-primary-blue rounded-3xl focus:outline-none w-full",
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
      "flex flex-col items-center justify-center w-full max-w-md bg-quaternary-blue rounded-4xl p-8 shadow-md",
  };
};

export const makeButtonClasses = (className) => {
  return { className };
};

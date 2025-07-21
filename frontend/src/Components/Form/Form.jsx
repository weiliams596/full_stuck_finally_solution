import React, { useState } from "react";
import axios from "axios";

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
    - className: CSS class to apply to the field element
  - onSuccess: callback function to handle successful form submission
  - onError: callback function to handle form submission error
  - title: is dom element to display form title
  - submitText: text to display on submit button
*/

const Form = ({
  action,
  methon = "POST",
  className = "",
  fields = [],
  onSuccess,
  onError,
  title,
  submitText,
}) => {
  const [formData, setFormData] = useState({});

  const handleChnage = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { method: methon, url: action, data: formData };
      if (methon.toUpperCase() === "GET" || methon.toUpperCase() === "DELETE") {
        config.params = formData;
      } else {
        config.data = formData;
      }

      const response = await axios(config);

      onSuccess?.(response);
    } catch (err) {
      onError?.(err);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {title && { title }}
      {fields.map(
        (name, label, type, placeholder = `Enter ${label}`, required = false, options, className) => (
            <div key={name} className={className}>
                {type!=='radio' || type!=='checkbox' &&<label htmlFor={name}>{label}</label>}
                {type === "select"? (
                    <select
                        name={name}
                        value={formData[name]}
                        onChange={(e) => handleChnage(name, e.target.value)}
                        required={required}
                    >
                        <option value="">{placeholder}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>

                ):
                type === "textarea" ? (
                    <textarea
                        name={name}
                        value={formData[name]}
                        onChange={(e) => handleChnage(name, e.target.value)}
                        required={required}
                        placeholder={placeholder}
                    />
                )
                :type === "radio" ? (
                    <div>
                        {options.map((option, index) => (
                            <label key={index}>
                                <input type="radio" name={name} value={option.value} onChange={(e) => handleChnage(name, e.target.value)} required={required} />
                                {option.label}
                            </label>
                        ))}
                    </div>
                ):type==="checkbox" ? (
                    <div>
                        {options.map((option, index) => (
                            <label key={index}>
                                <input type="checkbox" name={name} value={option.value} onChange={(e) => handleChnage(name, e.target.value)} required={required} />
                                {option.label}
                            </label>
                        ))}
                    </div>
                )
                : (
                    <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={(e) => handleChnage(name, e.target.value)}
                        required={required}
                        placeholder={placeholder}
                    />
                )}
            </div>
      ))};
      <button type="submit">{submitText}</button>
    </form>
  );
};

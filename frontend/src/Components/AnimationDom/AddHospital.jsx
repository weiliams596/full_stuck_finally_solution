import React from "react";
import AutoForm, { defaultInputClasses } from "../Form/AutoForm";

/**
 * AddHospital component
 * @param {boolean} haveTitle - if true, title will be shown
 * @param {async function} onSuccess - function to be called on success(@param {object} response.data)
 * @param {async function} onError - function to be called on error(@param {object} error)
 */

export default function AddHospital({ haveTitle = false,onSuccess=null, onError=null }) {
  const fields = [
    {
      name: "name",
      label: "Аурухана атауы",
      type: "text",
      required: true,
      placeholder: "Аурухана атауын енгізіңіз",
      inputClasses: defaultInputClasses(),
    },
    {
      name: "code",
      label: "Код",
      type: "text",
      required: true,
      placeholder: "Аурухана кодын енгізіңіз",
      inputClasses: defaultInputClasses(),
    },
    {
      name: "address",
      label: "Мекенжай",
      type: "text",
      required: true,
      placeholder: "Аурухана мекенжайын енгізіңіз",
      inputClasses: defaultInputClasses(),
    },
    {
      name: "city",
      label: "Қала",
      type: "text",
      required: true,
      placeholder: "Қаланы енгізіңіз",
      inputClasses: defaultInputClasses(),
    },
    {
      name: "description",
      label: "Сипаттама",
      type: "textarea",
      required: true,
      placeholder: "Аурухана туралы сипаттама енгізіңіз",
      inputClasses: defaultInputClasses(),
    },
  ];

  const handleSuccess = async (response) => {
    await onSuccess?.(response.data);
    console.log("Created hospital:", response.data?.hospital);
  };

  const handleError = async (err) => {
    await onError?.(err);
    console.error("Hospital creation failed:", err);
    alert(
      "Қате орын алды: " + (err.response?.data?.message || "Белгісіз қате")
    );
  };

  return (
    <div className="flex w-full h-full justify-center items-center p-4">
      <AutoForm
        action="/admin/add-hospital"
        className="w-full grid grid-cols-2 gap-4 rounded-4xl p-4"
        methon="POST"
        title={haveTitle ? "Аурухана қосу" : null}
        fields={fields}
        onSuccess={handleSuccess}
        onError={handleError}
        submitText="Қосу"
      />
    </div>
  );
}

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AutoForm from "../../Components/Form/AutoForm";

import SetContext from "../../Components/Contexts/SetContexts/SetContext";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const { axiosInstance } = useContext(SetContext);
  const [fields, setFields] = useState([
    {
      name: "username",
      label: "аты-жөні",
      type: "text",
      placeholder: "Қолданушынің аты-жөні",
      required: true,
    },
    {
      name: "email",
      label: "электрондық поштасы",
      type: "email",
      placeholder: "Қолданушың электрондық поштасы",
      required: true,
    },
    {
      name: "password",
      label: "Құпия сөз",
      type: "password",
      placeholder: "Қолданушың құпия сөзі",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Құпия сөзді қайталау",
      type: "password",
      placeholder: "Қолданушың құпия сөзін ернәнді қалдыру",
      required: true,
    },
    {
      name: "role",
      type: "select",
      options: [
        { value: "doctor", label: "Емдеушы" },
        { value: "iller", label: "Наухас" },
        { value: "admin", label: "Администратор" },
      ],
      required: true,
      onChange: async (value) => {
        console.log(value);
        if (value.toLowerCase() == "admin") {
          const test = await axiosInstance.post("/admincode", {
            userInsert: "test",
          });
          if (test.status === 200 || test.status === 201) {
            const userInsert = prompt("Серверден келген кодын енгізіңіз");
            const response = await axiosInstance.post("/admincode", {
              userInsert,
            });
            console.log(response.data);
            return response.data;
          }
        }
      },
    },
    {
      name: "other",
      type: "other",
      options: (
        <p>
          Тіркелу бар ?{" "}
          <Link
            to="/login"
            className="text-quaternary-blue hover:text-secondary-blue">
            Кіру
          </Link>
        </p>
      ),
    },
  ]);

  const handleOnSuccess = async (response) => {
    navigate("/login");
  };

  const handleOnError = async (error) => {
    if (error.response.status === 400) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white">
      <AutoForm
        title="Тіркелу"
        className="flex flex-col items-center justify-center w-full max-w-md bg-tertiary-blue rounded-4xl p-3 shadow-md "
        action="/register"
        onError={handleOnError}
        onSuccess={handleOnSuccess}
        fields={fields}
        submitText="Тыркелу"
        submitAndReset={true}
      />
    </div>
  );
}

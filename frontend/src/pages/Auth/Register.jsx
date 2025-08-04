import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AutoForm from "../../Components/Form/AutoForm";

import SetContext from "../../Components/Contexts/SetContexts/SetContext";
import axios from "axios";

/**
 * This is the register page component.
 * @returns {JSX.Element}
 */

export default function Register() {
  const navigate = useNavigate();
  const { axiosInstance, setHeaderDom, setFooterDom } = useContext(SetContext);
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
      defaultValue: "iller",
      options: [
        { value: "doctor", label: "Емдеушы" },
        { value: "iller", label: "Наухас" },
        { value: "admin", label: "Администратор" },
      ],
      required: true,
      onChange: async (value) => {
        console.log("Input value:", value);
        if (value.toLowerCase() === "admin") {
          try {
            const initResponse = await axiosInstance.post("/admincode", {
              userInsert: "init",
            });

            if (initResponse.status === 200 || initResponse.status === 201) {
              const userInsert =
                prompt("Серверден келген кодын енгізіңіз").trim() ?? null;
              if (!userInsert) throw new Error("Код енгізілмеді");

              const verifyResponse = await axiosInstance.post("/admincode", {
                userInsert,
              });

              if (
                verifyResponse.status === 200 ||
                verifyResponse.status === 201
              ) {
                return "admin";
              } else {
                throw new Error(verifyResponse?.data?.message || "Код қате");
              }
            }
          } catch (err) {
            throw err;
          }
        }
        return value;
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
    console.log(error);
  };

  useEffect(() => {
    setHeaderDom(null);
    setFooterDom(null);
  }, []);
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

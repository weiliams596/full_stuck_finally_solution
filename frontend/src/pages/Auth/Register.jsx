import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AutoForm from "../../Components/Form/AutoForm";

import SetContext from "../../Components/Contexts/SetContexts/SetContext";

import Prompt from "../../Components/Frame/Prompt/Prompt";

/**
 * This is the register page component.
 * @returns {JSX.Element}
 */

export default function Register() {
  const navigate = useNavigate();
  const { axiosInstance, setHeader, setFooterDom } = useContext(SetContext);
  const [fields, setFields] = useState([]);
  const isValidAdminCode = useRef(false);

  const [prompt, setPrompt] = useState(false);

  const handleOnSuccess = async (response) => {
    navigate("/login");
  };

  const handleOnError = async (error) => {
    console.log(error);
  };

  useEffect(() => {
    setHeader('Register',null);
    setFooterDom(null);
    setFields([
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
          if (isValidAdminCode.current) return value;
          else if (value.toLowerCase() === "admin") {
            console.log("Admin code required");
            console.log("Admin code is valided ? ", isValidAdminCode.current);
            const initResponse = await axiosInstance.post("/admincode", {
              userInsert: "init",
            });

            if (initResponse.status === 200 || initResponse.status === 201) {
              setPrompt(true);
            }
          }
          return value;
        },
        onError: async (error) => {
          setPrompt(false);
          return error;
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
              className="text-white-blue hover:text-secondary-blue">
              Кіру
            </Link>
          </p>
        ),
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white">
      {!isValidAdminCode.current && prompt ? (
        <Prompt
          message="Администратор дың кодын енгізіңіз:"
          OnClick={async (value) => {
            setPrompt(false);
          }}
          OnClosed={async (value) => {
            if (value) {
              if (value.length < 1)
                throw new Error("Администратор сод : Код енгізілмеді");
              console.log("User insert:", value);
              const verifyResponse = await axiosInstance.post("/admincode", {
                userInsert: value,
              });

              if (
                verifyResponse.status === 200 ||
                verifyResponse.status === 201
              ) {
                setPrompt(false);
                isValidAdminCode.current = true;
                console.log("Admin code verified");
                return "admin";
              } else {
                isValidAdminCode.current = false;
                throw new Error("Администратор сод : Код қате");
              }
            }
            return value;}}
        />
      ) : null}
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

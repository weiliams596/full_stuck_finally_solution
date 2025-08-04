import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AutoForm from "../../Components/Form/AutoForm";

import SetContext from "../../Components/Contexts/SetContexts/SetContext";
import axios from "axios";

import Prompt from "../../Components/Frame/Prompt/Prompt";

/**
 * This is the register page component.
 * @returns {JSX.Element}
 */

export default function Register() {
  const navigate = useNavigate();
  const { axiosInstance, setHeaderDom, setFooterDom } = useContext(SetContext);
  const [myUserInsert, setMyUserInsert] = useState(null);
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
        if (value.toLowerCase() === "admin") {
          const initResponse = await axiosInstance.post("/admincode", {
            userInsert: "init",
          });

          if (initResponse.status === 200 || initResponse.status === 201) {
            setPrompt(
              <Prompt
                message="Администратор дың кодын енгізіңіз:"
                OnClick={(value) => {
                  setMyUserInsert(value);
                }}
                OnClosed={async (value) => {
                  setPrompt(null);
                  if (!myUserInsert) throw new Error("Код енгізілмеді");
                  console.log("User insert:", myUserInsert);
                  const verifyResponse = await axiosInstance.post(
                    "/admincode",
                    {
                      userInsert: myUserInsert,
                    }
                  );

                  if (
                    verifyResponse.status === 200 ||
                    verifyResponse.status === 201
                  ) {
                    return "admin";
                  } else {
                    throw new Error(
                      verifyResponse?.data?.message || "Код қате"
                    );
                  }
                }}
              />
            );
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
            className="text-white-blue hover:text-secondary-blue">
            Кіру
          </Link>
        </p>
      ),
    },
  ]);

  const [prompt, setPrompt] = useState(null);

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
      {prompt && prompt}
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

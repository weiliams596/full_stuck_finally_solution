import React, { useContext } from "react";

import AutoForm from "../../Components/Form/AutoForm";
import AuthContext from "../../Components/Contexts/Auth/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { auth, setAuth, token, setToken } = useContext(AuthContext);
  const handleOnSuccess = async (response) => {
    console.log(response);
    setAuth(await response.data.user);
    console.log(auth);
    setToken(response.headers.authorization.split(" ")[1]);
    console.log(token);
  };

  const handleOnError = async (error) => {
    console.log(error);
  };

  const fields = [
    {
      name: "email",
      label: "Электрондық пошта",
      type: "email",
      placeholder: "Пошта",
      required: true,
    },
    {
      name: "password",
      label: "Құпия сөз",
      type: "password",
      placeholder: "Құпия сөз",
      required: true,
    },
    {
      name:'other',
      type:'other',
      options:(
        <p>Тіркелу жоқ ? <Link to="/register" className="text-quaternary-blue hover:text-secondary-blue">Тіркелу</Link></p>
      )
    }
  ];

  return (
    <div className="flex justify-center items-center h-full w-full bg-white">
      <AutoForm
        title="Тіркелу"
        className="flex flex-col items-center justify-center w-full max-w-md bg-tertiary-blue rounded-4xl p-8 shadow-md"
        action="/login"
        onError={handleOnError}
        onSuccess={handleOnSuccess}
        fields={fields}
        submitText="Тыркелу"
        submitAndReset={true}
      />
    </div>
  );
}

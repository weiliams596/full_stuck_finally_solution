import React, { useContext, useState } from "react";
import AuthContext from "../../Contexts/Auth/AuthContext";
import SetContext from "../../Contexts/SetContexts/SetContext";
import { useNavigate } from "react-router-dom";

export default function AuthLoguout() {
  const { setToken, setAuth } = useContext(AuthContext);
  const { setHeaderDom, setFooterDom, axiosInstance } = useContext(SetContext);

  const navigate = useNavigate();

  const cleanState = () => {
    setToken(null);
    setAuth(null);
    setHeaderDom(null);
    setFooterDom(null);
  };

  const handleLogout = async () => {
    cleanState();
    try {
      await axiosInstance.post("/logout", { message: "logout" });
      navigate("/");
      axiosInstance.defaults.headers.common["Authorization"] = null;
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={handleLogout} className="p-2 bg-quaternary-blue hover:bg-primary-blue text-white">Шығу</button>;
}

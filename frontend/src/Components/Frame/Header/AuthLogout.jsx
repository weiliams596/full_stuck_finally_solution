import React, { useContext } from "react";
import AuthContext from "../../Contexts/Auth/AuthContext";
import SetContext from "../../Contexts/SetContexts/SetContext";
import { useNavigate } from "react-router-dom";

export default function AuthLogout() {
  const { setAuthLogin } = useContext(AuthContext);
  const { setHeader, setFooterDom, axiosInstance} = useContext(SetContext);

  const navigate = useNavigate();

  const cleanState = () => {
    setHeader('AuthLogout',null);
    setFooterDom(null);
    setAuthLogin('logout');
  };

  const handleLogout = async () => {
    cleanState();
    try {
      await axiosInstance.post("/logout", { message: "logout" });
      navigate("/home");
      axiosInstance.defaults.headers.common["Authorization"] = null;
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={handleLogout} className="p-2 bg-quaternary-blue hover:bg-primary-blue hover:underline text-white rounded-3xl">Шығу</button>;
}

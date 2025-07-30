import React from "react";
import axios from "axios";
import SetContext from "./SetContext";
import AuthContext from "../Auth/AuthContext";

axios.defaults.withCredentials = true;

export default function AutherProvider({ children }) {
  const [headerDom, setHeaderDom] = React.useState(null);
  const [footerDom, setFooterDom] = React.useState(null);
  const { token } = React.useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}:${
      import.meta.env.VITE_SERVER_PORT
    }${import.meta.env.VITE_BASE_API_PATH}`,
    timeout: 10000,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return (
    <SetContext.Provider
      value={{
        axiosInstance,
        setHeaderDom,
        headerDom,
        setFooterDom,
        footerDom,
      }}>
      {children}
    </SetContext.Provider>
  );
}

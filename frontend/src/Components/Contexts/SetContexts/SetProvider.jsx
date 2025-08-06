import React from "react";
import axios from "axios";
import SetContext from "./SetContext";
import AuthContext from "../Auth/AuthContext";

axios.defaults.withCredentials = true;

export default function AutherProvider({ children }) {
  const [headerDom, setHeaderDom] = React.useState(null);
  const [headerFrom, setHeaderFrom] = React.useState("");
  const [footerDom, setFooterDom] = React.useState(null);
  const [otherData, setOtherData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { token, auth } = React.useContext(AuthContext);
  console.log(import.meta.env.VITE_BASE_API_PATH);
  const axiosInstance = React.useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_BASE_API_PATH,
      timeout: 10000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  axiosInstance.interceptors.request.use((config) => {
    setIsLoading(true);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      if (response.data) {
        setOtherData({ ...otherData, ...response.data });
      }
      return response;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

  const setHeader = (from, dom) => {
    if (from !== headerFrom) {
      setHeaderFrom(from);
      setHeaderDom(dom);
    }
    if (from === headerFrom && dom !== headerDom) {
      setHeaderFrom(from);
      setHeaderDom(dom);
    }
  };

  React.useEffect(() => {
    const other = JSON.parse(localStorage.getItem("other"));
    if (other) setOtherData(other);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("other", JSON.stringify(otherData));
  }, [otherData]);

  return (
    <SetContext.Provider
      value={{
        axiosInstance,
        setHeader,
        headerDom,
        setFooterDom,
        footerDom,
        otherData,
        setOtherData,
        axiosLoading: isLoading,
        error,
        setError,
      }}>
      {children}
    </SetContext.Provider>
  );
}

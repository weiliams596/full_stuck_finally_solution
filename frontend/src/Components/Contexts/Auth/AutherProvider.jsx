import React, { useEffect } from "react";
import AuthContext from "./AuthContext";

/**
 *
 * @param {*} -React component
 * @returns
 */
export default function AutherProvider({ children }) {
  const [auth, setAuth] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [authLogin, setAuthLogin] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth");
    const logined = localStorage.getItem("login");
    if (token && auth) {
      setAuth(JSON.parse(auth));
      setAuthLogin(logined === "true" ? true : false);
      setToken(token);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [token, auth]);

  useEffect(() => {
    localStorage.setItem("login", authLogin);
    if (authLogin === true) {
    }
    if (authLogin === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("other");
      localStorage.removeItem("auth");
      localStorage.removeItem("login");
    }
  }, [authLogin]);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, token, setToken, authLogin, setAuthLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

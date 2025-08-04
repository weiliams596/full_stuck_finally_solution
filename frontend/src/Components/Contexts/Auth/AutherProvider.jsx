import React, { useEffect } from "react";
import AuthContext from "./AuthContext";
import { useHeartBeat } from "../../Hooks/useHeartBeat";

/**
 *
 * @param {*} -React component
 * @returns
 */
export default function AutherProvider({ children }) {
  const [auth, setAuth] = React.useState(null);
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("auth");
    if (token && auth) {
      setAuth(JSON.parse(auth));
      setToken(token);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [token, auth]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

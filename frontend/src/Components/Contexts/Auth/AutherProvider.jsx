import React, { useEffect } from "react";
import AuthContext from "./AuthContext";

export default function AutherProvider({ children }) {
  const [auth, setAuth] = React.useState(null);
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [token, auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

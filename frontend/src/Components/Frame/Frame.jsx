import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AuthContext from "../Contexts/Auth/AuthContext";
import SetContext from "../Contexts/SetContexts/SetContext";
import AnimationDom from "../AnimationDom/AnimationDom";

import { useHeartBeat } from "../Hooks/useHeartBeat";

export default function Frame({
  headerDom = null,
  footerDom = null,
  children,
}) {
  const { auth, authLogin } = useContext(AuthContext);
  const { axiosLoading } = useContext(SetContext);
  const heartBeat = useHeartBeat();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (authLogin === true)
      if (auth) {
        if (auth.role === "admin") {
          if (location.pathname.includes("/admin")) return;
          navigate("/admin");
        } else if (auth.role === "doctor" && auth?.status === "active") {
          if (location.pathname.includes("/doctor-home")) return;
          navigate("/doctor-home");
        } else {
          if (location.pathname.includes("/home")) return;
          navigate("/home");
        }
      }
  }, [auth, authLogin]);

  useEffect(() => {
    if (authLogin !== true) {
      if (location.pathname === "/login" || location.pathname === "/register")
        return;
      navigate("/login");
    }
    if (auth?.status === "inactive") {
      navigate("/invaliduser");
    }
    const pathName = location.pathname;
    if (pathName === "/login" || pathName === "/register") {
      return;
    }
  }, [location.pathname, auth, authLogin]);

  return (
    <div className="relative w-screen h-screen bg-tertiary-blue ">
      {headerDom && headerDom}
      <div className="absolute top-[130px] left-[20px] z-3 rounded-4xl bg-white  overflow-y-scroll hide-scrollbar content-show-style shadow-md">
        {axiosLoading && <AnimationDom />}
        <div className="object-cover p-[20px] h-full w-full text-center rounded-4xl justify-center items-center child-show-style">
          {children}
        </div>
      </div>
      {footerDom && footerDom}
    </div>
  );
}

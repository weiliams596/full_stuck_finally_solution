import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../Contexts/Auth/AuthContext";

export default function Frame({
  headerDom = null,
  footerDom = null,
  children,
}) {
  const { auth ,dataAlrady} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(auth);
    if (auth?.role === "admin") {
      navigate("/admin");
    }
    if(auth?.role === "doctor" && auth?.registed){
      navigate("/doctor-home");
    }
  }, [dataAlrady]);

  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName === "/login" || pathName === "/register") {
      return;
    }
    if (!auth) {
      navigate("/login");
    }
    if(!auth?.registed && auth?.role === "doctor"){
      navigate("/doctor-register");
    }
    if(auth?.status === "inactive"){
      navigate("/invaliduser");
    }
  }, [window.location.pathname,dataAlrady]);

  return (
    <div className="relative w-screen h-screen bg-tertiary-blue ">
      {headerDom && headerDom}
      <div className="absolute top-[130px] left-[20px] z-3 rounded-4xl bg-white  overflow-y-scroll hide-scrollbar content-show-style shadow-md h-max-full w-max-full">
        <div className="object-cover p-[20px] h-full w-full text-center">
          {children}
        </div>
      </div>
      {footerDom && footerDom}
    </div>
  );
}

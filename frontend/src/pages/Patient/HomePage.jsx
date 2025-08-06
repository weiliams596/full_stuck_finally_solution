import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import AuthContext from "../../Components/Contexts/Auth/AuthContext";
import SetContext from "../../Components/Contexts/SetContexts/SetContext";
import AutoHeader from "../../Components/Frame/Header/AutoHeader";
import HomeLogo from "../../Components/Frame/Header/HomeLogo";
import AuthLogout from "../../Components/Frame/Header/AuthLogout";

export default function HomePage() {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const { setHeader, setFooterDom, axiosInstance } = useContext(SetContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      if (auth.status === "invalid") {
        if (auth.role === "doctor") {
          navigate("/doctor-register");
          return;
        }
        navigate("/invaliduser");
        return;
      }
      if (auth.role === "admin") {
        navigate("/admin");
        return;
      }
      if (auth.role === "admin") {
        setHeader("HomePage", null);
        navigate("/admin");
        return;
      }
    } else {
      return;
    }
    if (location.pathname !== "/home/real-time-queue")
      setHeader(
        "HomePage",
        <AutoHeader
          fields={[
            {
              to: "/home",
              component: <HomeLogo />,
            },
            { to: "/home/about", component: "Бізге қатысты" },
            { to: "/home/real-time-queue", component: <p>Кезек көрсету</p> },
            {
              to: "",
              component: <AuthLogout />,
            },
          ]}
        />
      );
  }, [location.pathname, auth]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Outlet />
    </div>
  );
}

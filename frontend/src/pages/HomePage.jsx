import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import AuthContext from "../Components/Contexts/Auth/AuthContext";
import SetContext from "../Components/Contexts/SetContexts/SetContext";
import AutoHeader from "../Components/Frame/Header/AutoHeader";
import HomeLogo from "../Components/Frame/Header/HomeLogo";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const { auth } = useContext(AuthContext);
  const { setHeaderDom, setFooterDom, axiosInstance } = useContext(SetContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axiosInstance.post("/logout", { meesage: "logout" });
    if (response.status === 200 || response.status === 201) {
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/real-time-queue") return;
    if (auth) {
      setUser(auth);
    }
    if (user?.status === "invalid") {
      if (user.role === "doctor") {
        navigate("/doctor-register");
      }
      navigate("/invaliduser");
    }
    setHeaderDom(
      <AutoHeader
        fields={[
          {
            to: "/",
            component: (
              <HomeLogo />
            ),
          },
          { to: "/about", component: "Бізге қатысты" },
          { to: "/real-time-queue", component: <p>Кезек көрсету</p> },
          {
            to: "/login",
            component: (
              <div
                onClick={handleLogout}
                className="text-center bg-quaternary-blue pl-2 pr-2 pt-1 pb-1 rounded-3xl hover:bg-secondary-blue">
                Шығу
              </div>
            ),
          },
        ]}
      />
    );
  }, [window.location.pathname]);
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Outlet />
    </div>
  );
}

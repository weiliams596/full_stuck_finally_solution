import React from "react";
import { Outlet } from "react-router-dom";

import AuthContext from "../../Components/Contexts/Auth/AuthContext";
import SetContext from "../../Components/Contexts/SetContexts/SetContext";
import AutoHeader from "../../Components/Frame/Header/AutoHeader";
import AuthLogout from "../../Components/Frame/Header/AuthLogout";
import HomeLogo from "../../Components/Frame/Header/HomeLogo";

export default function AdminHome() {
  const { auth } = React.useContext(AuthContext);
  const { setHeader, headerDom } = React.useContext(SetContext);

  React.useEffect(() => {
    return () => {
      setHeader("AdminHome", null);
    };
  }, []);
  React.useEffect(() => {
    if (headerDom === null) {
      setHeader(
        "AdminHome",
        <AutoHeader
          fields={[
            { to: "/admin", component: <HomeLogo /> },
            {
              to: "/admin",
              component: (
                <div className="flex flex-row">
                  <p className="text-[12px]">Қош келдіңіз : {auth?.username}</p>
                </div>
              ),
            },
            {to:'/admin/hospital-control' ,component:<p className="text-[12px]">Емханаларды Басқару</p>},
            {to:'/admin/user-control',component:<p className="text-[12px]">Пайдаланушыларды Басқару</p>},
            { to: "", component: <AuthLogout /> },
          ]}
        />
      );
    }
  }, [headerDom, auth]);
  return (
    <div className="flex flex-col w-full  bg-tertiary-blue justify-center items-center">
      <Outlet />
    </div>
  );
}

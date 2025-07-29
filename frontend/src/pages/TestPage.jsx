import React, { useContext, useEffect } from "react";

import logo from "../assets/react.svg";

import SetContext from "../Components/Contexts/SetContexts/SetContext";

import AutoHeader from "../Components/Frame/Header/AutoHeader";

export default function TestPage({ children }) {
  const { setHder } = useContext(SetContext);
  const headerFields = [
    {
      to: "/",
      component: <img src={logo} />,
    },
    {
      to: "/doctors",
      component: "Докторлар",
    },
    {
      to: "/about",
      component: "Бізге қатысты",
    },
  ];

  useEffect(() => {
    setHder(<AutoHeader fields={headerFields} />);
    return setHder(null);
  }, []);
  return <div></div>;
}

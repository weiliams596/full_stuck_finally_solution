import React, { useContext, useEffect } from "react";

import logo from "../assets/react.svg";

import SetContext from "../Components/Contexts/SetContexts/SetContext";

import AutoHeader from "../Components/Frame/Header/AutoHeader";
import AutoFooter from "../Components/Frame/Footer/AutoFooter";
import GridDom from "../Components/GridDom/GridDom";

export default function TestPage({ children }) {
  const { setHeaderDom, setFooterDom } = useContext(SetContext);
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
    setHeaderDom(<AutoHeader fields={headerFields} />);
    setFooterDom(<AutoFooter>footer</AutoFooter>);
    return () => {
      setHeaderDom(null);
      setFooterDom(null);
    };
  }, []);
  return <GridDom col={3} row={1} gap="20px">
    <div>a</div>
    <div>b</div>
    <div>c</div>
  </GridDom>;
}

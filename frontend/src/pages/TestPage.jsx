import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/react.svg";

import SetContext from "../Components/Contexts/SetContexts/SetContext";

import AutoHeader from "../Components/Frame/Header/AutoHeader";
import AutoFooter from "../Components/Frame/Footer/AutoFooter";
import AnimationDom from "../Components/AnimationDom/AnimationDom";

import AutoListShower from "../Components/InformationList/AutoListShower";

/**
 *
 * @param {children:any} - children component
 * @returns
 */

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

  const templateObj = {
    name: "Емдеушы",
    to: "/doctors/1",
    builder: (obj, index) => {
      return (
        <div key={index}>
          <Link to={obj.to}></Link>
        </div>
      );
    },
  };
  useEffect(() => {
    setHeaderDom(<AutoHeader fields={headerFields} />);
    setFooterDom(<AutoFooter>footer</AutoFooter>);
    return () => {
      setHeaderDom(null);
      setFooterDom(null);
    };
  }, []);
  return (
    <div>
      <AutoListShower className="flex flex-col mt-2 mb-2 h-full w-full" />
      <AnimationDom></AnimationDom>
    </div>
  );
}

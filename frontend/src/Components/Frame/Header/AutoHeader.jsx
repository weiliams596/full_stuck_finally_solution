import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import listIcon from "../../../assets/list.svg";

/**
 * @param {Object} props - props object
 * @param {String} props.className - className of header
 * @param {Array} props.fields - array of fields to display in header
 * @param {String} props.fields.to - path to navigate to
 * @param {String} props.fields.className - className of field
 * @param {String} props.fields.component - text to display in field
 * @returns {JSX.Element} - header component
 */

export default function Header({
  className = defaultHeaderClassName,
  fields = [],
}) {
  const [windowWith, setWindowWith] = useState(window.innerWidth);
  const [shower, setShower] = useState(false);
  const [headerContent, setHeaderContent] = useState(null);
  const location = useLocation();

  const makeMobile = () => {
    if (fields && windowWith < 769) {
      return (
        <div className="flex flex-row justify-around items-center w-full h-full shadow-2xs">
          {fields.length > 0 &&
            fields
              .filter((field) => field.to === "/home" || field.to === "/admin")
              .map((field, index) => (
                <Link
                  key={"mobile_" + index}
                  to={field.to}
                  className={
                    field.className
                      ? field.className
                      : defaultFiledTextCalssName
                  }>
                  {field.component}
                </Link>
              ))}
          {!shower && (
            <div className="flex" onClick={() => setShower(true)}>
              <img src={listIcon} alt="menu" className="w-6 h-6" />
            </div>
          )}
        </div>
      );
    }
  };

  const makeDesktop = () => {
    return (
      fields &&
      fields.map((field, index) => (
        <Link
          key={"a_" + index}
          to={field.to}
          className={
            field.className ? field.className : defaultFiledTextCalssName
          }>
          {field.component}
        </Link>
      ))
    );
  };
  useEffect(() => {
    if (windowWith < 768) {
      setShower(false);
      setHeaderContent(makeMobile());
    } else {
      setHeaderContent(makeDesktop());
    }
  }, [windowWith, location.pathname]);

  useEffect(() => {
    const handleResize = () => setWindowWith(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
  <header className={className + " relative"}>
    {!shower && (
      windowWith < 768 ? makeMobile() : makeDesktop()
    )}
    {shower && (
      <div className="flex flex-col justify-around h-[80vh] absolute top-0 right-[-20px] w-[125px] z-100 m-6 bg-primary-blue rounded-4xl">
        <button className="" onClick={() => setShower(false)}>X</button>
        {fields.map((field, index) => (
          <Link
            key={"a_" + index}
            to={field.to}
            className={
              (field.className || defaultFiledTextCalssName) + " mt-2 ml-[15px]"
            }>
            {field.to === "/home" ? "Басты бет" : field.component}
          </Link>
        ))}
      </div>
    )}
  </header>
);

}

export const defaultHeaderClassName =
  "flex pt-8 justify-around items-center text-white";

export const defaultFiledTextCalssName =
  "text-white hover:text-quaternary-blue hover:underline";

export const defaultFiledDomClassName = `${defaultFiledTextCalssName} flex items-center justify-center`;

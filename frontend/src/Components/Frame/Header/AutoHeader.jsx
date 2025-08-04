import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  window.addEventListener("resize", () => {
    setWindowWith(window.innerWidth);
  });
  const makeMobile = () => {
    if (fields && windowWith < 769) {
      return (
        <div className="flex flex-row justify-around items-center w-full h-full">
          {() => {
            if (typeof fields === "array" && fields.length > 0) {
              fields.forEach((field) => {
                if (field.to == "/") {
                  return (
                    <Link
                      to={field.to}
                      className={
                        field.className
                          ? field.className
                          : defaultFiledTextCalssName
                      }>
                      {field.component}
                    </Link>
                  );
                }
              });
            }
          }}
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
  }, [window]);
  return (
    <header className={className + " relative"}>
      {!shower && headerContent && headerContent}
      {shower && (
        <div className="flex flex-col justify-around h-[80vh] absolute top-0 right-[-20px] w-[25%] z-100 m-6 bg-tertiary-blue">
          <button className="" onClick={() => setShower(false)}>
            {" "}
            X{" "}
          </button>
          {fields &&
            fields.map((field, index) => {
              return field.to !== "/" ? (
                <Link
                  key={"a_" + index}
                  to={field.to}
                  className={
                    field.className
                      ? field.className + " mt-2 "
                      : defaultFiledTextCalssName + " mt-2 "
                  }>
                  {field.component}
                </Link>
              ) : (
                <Link
                  key={"a_" + index}
                  to={field.to}
                  className={
                    field.className
                      ? field.className + " mt-2 "
                      : defaultFiledTextCalssName + " mt-2 "
                  }>
                  Басты бет
                </Link>
              );
            })}
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

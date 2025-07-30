import React from "react";

export default function Frame({ headerDom = null, footerDom = null, children }) {
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

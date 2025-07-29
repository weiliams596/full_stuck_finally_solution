import React from "react";

export default function Frame({ hder = null, children }) {
  return (
    <div className="relative w-screen h-screen bg-[#324580] ">
      {hder && hder}
      <div className="absolute top-[128px] left-[20px] z-3 rounded-4xl bg-white  overflow-y-scroll hide-scrollbar content-show-style shadow-md h-max-full w-max-full">
        <div className="object-cover p-[20px] h-full w-full text-center">
          {children}
        </div>
      </div>
    </div>
  );
}

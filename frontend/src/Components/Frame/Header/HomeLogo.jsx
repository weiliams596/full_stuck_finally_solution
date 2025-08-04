import React from "react";

import logo from "../../../assets/Logo.png";

export default function HomeLogo() {
  return (
    <div className="flex flex-row items-center text-center text-[0.8rem]">
      <img src={logo} alt="logo" className="w-16 h-16" />
      <span>
        Аурухана
        <br />
        кезек
      </span>
    </div>
  );
}

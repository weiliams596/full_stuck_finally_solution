import React, { useState, useEffect, useContext, use } from "react";

import SetContext from "../Contexts/SetContexts/SetContext";
import AutoHeader from "../Frame/Header/AutoHeader";
import HomeLogo from "../Frame/Header/HomeLogo";

export default function ShowNowQueue() {
  const { setHeader, setFooterDom } = useContext(SetContext);

  useEffect(() => {
    setHeader('ShowNowQueue',
          <AutoHeader
            fields={[
              {
                to: "/home",
                component: (
                  <HomeLogo/>
                ),
              },]}
              />);
    setFooterDom(null);
  }, []);

  const handleChacking = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col w-full">
        <h1>S001</h1>
      </div>
    </div>
  );
}

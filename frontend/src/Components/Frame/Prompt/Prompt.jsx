import React, { useEffect, useState } from "react";

export default function Prompt({ inputClassName, message, OnClick, OnClosed }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className=" absolute flex w-full h-full justify-center items-center z-30 text-white">
      <div
        className=" absolute top-0 left-0 w-full h-full bg-black opacity-20 z-22"
        onClick={() => OnClosed(inputValue)}></div>
      <div className="flex flex-col justify-center items-center bg-secondary-blue z-26 w-full">
        <label htmlFor="input">{message}</label>
        <input
          className={
            inputClassName ??
            "pl-3 pr-3 pt-1 pb-1 bg-primary-blue rounded-3xl focus:outline-none w-full"
          }
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex flex-row justify-around items-center w-full">
        <button
          onClick={() => {
            const value = inputValue;
            OnClick(value);
            OnClosed(value);
          }}
          className="bg-primary-blue text-white rounded-3xl p-2">
          Жақсы
        </button>
        <button
          onClick={() => {
            setInputValue("");
            OnClosed(inputValue);
          }}
          className="bg-primary-blue text-white rounded-3xl p-2">
          Бастарту
        </button>
        </div>
      </div>
    </div>
  );
}

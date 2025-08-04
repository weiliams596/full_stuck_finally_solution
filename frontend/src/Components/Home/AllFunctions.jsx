import React from "react";
import { Link } from "react-router-dom";

import QueueLogo from "../../assets/QueueLogo.png";
import DoctorsLogo from "../../assets/MedicalLogo.png";

export default function AllFunctions() {
  return (
    <div className="flex flex-col w-full h-full md:flex-row">
      <Link
        to="/queue/make-online-queue"
        className="flex flex-col hover:scale-75">
        <img
          src={QueueLogo}
          alt="queue logo"
          className="aspect-square h-[250px]"
        />
        <p>Кезкекке туру</p>
      </Link>
      <Link
        to="/queue/make-online-queue"
        className="flex flex-col hover:scale-75">
        <img
          src={DoctorsLogo}
          alt="queue logo"
          className="aspect-square h-[250px]"
        />
        <p>Дәрігерлер тізімі</p>
      </Link>
      <Link
        to="/queue/make-online-queue"
        className="flex flex-col hover:scale-75">
        <img
          src={QueueLogo}
          alt="queue logo"
          className="aspect-square h-[250px]"
        />
        <p>Емханалар тізімі</p>
      </Link>
    </div>
  );
}

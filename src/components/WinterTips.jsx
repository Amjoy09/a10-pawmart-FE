import React from "react";
import petImg from "../assets/feed-pets-in-winter.jpg";

const WinterTips = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-around px-6 md:px-20 md:py-25 py-10 md:bg-yellow-300 bg-lime-300 rounded-lg gap-8">
      <div className="md:px-15 px-6">
        <h1 className="md:text-[30px] text-[20px] font-bold mb-7 md:text-green-600 text-red-900">
          Winter Care Tips for Pets
        </h1>
        <ul class="md:text-xl text-md list-disc space-y-3 font-semibold">
          <li>Keep them warm and dry</li>
          <li>Protect their paws</li>
          <li>Avoid winter toxins </li>
          <li>Maintain health and well-being </li>
          <li>Ensure visibility and identification </li>
          <li>Provide indoor exercise </li>
          <li>Keep Them Mentally & Physically Active</li>
          <li>Maintain Grooming and Skin Care</li>
        </ul>
      </div>
      <figure className="md:w-180 w-full ">
        <img
          className="md:rounded-full rounded-lg border-4 border-emerald-900"
          src={petImg}
          alt=""
        />
      </figure>
    </div>
  );
};

export default WinterTips;
